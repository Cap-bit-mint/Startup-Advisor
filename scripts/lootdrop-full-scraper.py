#!/usr/bin/env python3
"""
Loot-Drop.io 失败创业公司案例爬虫 (优化版)
用于 Startup-Advisor 数据源

依赖: pip install requests beautifulsoup4
运行: python scripts/lootdrop-full-scraper.py
"""

import json
import time
import re
from datetime import datetime
from pathlib import Path
from typing import Optional, Dict, List

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("缺少依赖，请先安装: pip install requests beautifulsoup4")
    exit(1)


class LootDropFullScraper:
    """Loot-Drop.io 完整爬虫"""
    
    BASE_URL = "https://www.loot-drop.io"
    OUTPUT_FILE = "./docs/data/cases.json"
    REQUEST_DELAY = 1.0
    REQUEST_TIMEOUT = 15
    MAX_ID = 3000  # 有效范围 1000-3000  # 测试范围
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
        })
        self.cases = []
        self.stats = {'total_checked': 0, 'successful': 0, 'failed': 0, 'not_found': 0}
        
    def fetch_page(self, url: str) -> Optional[str]:
        """获取页面"""
        try:
            resp = self.session.get(url, timeout=self.REQUEST_TIMEOUT)
            return resp.text if resp.status_code == 200 else None
        except:
            return None
    
    def parse_case(self, html: str, case_id: int, slug: str, url: str) -> Optional[Dict]:
        """解析案例页面"""
        soup = BeautifulSoup(html, 'html.parser')
        
        # 提取基本信息
        name = soup.find('span', id='startup-name')
        name = name.get_text(strip=True) if name else slug.replace('-', ' ').title()
        
        # 提取统计数据
        data = {
            'id': f"{case_id}-{slug}",
            'loot_id': case_id,
            'slug': slug,
            'url': url,
            'name': name,
            'sector': None,
            'product_type': None,
            'total_cash_burned': None,
            'funding_raised': None,
            'founding_year': None,
            'end_year': None,
            'failure_analysis': None,
            'market_analysis': None,
            'startup_learnings': None,
            'scalability': None,
            'pivot_concept': None,
            'description': None,
            'related_patterns': [],
            'relevance_tags': [],
        }
        
        # 解析 stat-value 字段
        stat_labels = soup.find_all('span', class_='stat-label')
        stat_values = soup.find_all('span', class_='stat-value')
        
        for label, value in zip(stat_labels, stat_values):
            label_text = label.get_text(strip=True).upper()
            value_text = value.get_text(strip=True)
            
            if 'SECTOR' in label_text:
                data['sector'] = value_text
            elif 'PRODUCT TYPE' in label_text:
                data['product_type'] = value_text
            elif 'TOTAL CASH BURNED' in label_text:
                data['total_cash_burned'] = value_text
            elif 'FUNDING RAISED' in label_text:
                data['funding_raised'] = value_text
            elif 'FOUNDING YEAR' in label_text:
                try:
                    data['founding_year'] = int(value_text)
                except:
                    pass
            elif 'END YEAR' in label_text:
                try:
                    data['end_year'] = int(value_text)
                except:
                    pass
        
        # 解析 hero-story
        hero_story = soup.find('p', class_='hero-story')
        if hero_story:
            data['description'] = hero_story.get_text(strip=True)
        
        # 解析 grid-card 内容
        cards = soup.find_all('article', class_='grid-card')
        for card in cards:
            title_elem = card.find('h3', class_='card-title')
            if title_elem:
                title = title_elem.get_text(strip=True).upper()
                
                # 获取 data-full-text 属性或内容
                content = card.get('data-full-text', '')
                if not content:
                    content_elem = card.find('p')
                    content = content_elem.get_text(strip=True) if content_elem else ''
                
                if 'FAILURE' in title and content:
                    data['failure_analysis'] = content
                elif 'MARKET' in title and content:
                    data['market_analysis'] = content
                elif 'LEARNING' in title and content:
                    data['startup_learnings'] = content
                elif 'SCALABILITY' in title and content:
                    data['scalability'] = content
                elif 'PIVOT' in title and content:
                    data['pivot_concept'] = content
        
        # 验证是否成功获取数据
        has_content = any([
            data.get('failure_analysis'),
            data.get('market_analysis'),
            data.get('total_cash_burned'),
            data.get('sector'),
        ])
        
        return data if has_content else None
    
    def scrape_by_id(self, case_id: int) -> Optional[Dict]:
        """按 ID 爬取"""
        url = f"{self.BASE_URL}/startup/{case_id}"
        html = self.fetch_page(url)
        
        if not html:
            return None
        
        # 从页面提取 slug
        soup = BeautifulSoup(html, 'html.parser')
        name_elem = soup.find('span', id='startup-name')
        if name_elem:
            name = name_elem.get_text(strip=True)
            slug = name.lower().replace(' ', '-').replace("'", '')
            url = f"{self.BASE_URL}/startup/{case_id}-{slug}"
            return self.parse_case(html, case_id, slug, url)
        
        return None
    
    def discover_and_scrape(self, start_id: int = 1, max_id: int = 3000,
                            consecutive_limit: int = 100) -> List[Dict]:
        """发现并爬取"""
        print("=" * 60)
        print("Loot-Drop.io 案例爬虫")
        print("=" * 60)
        print(f"扫描范围: {start_id} - {max_id}")
        print(f"请求延迟: {self.REQUEST_DELAY}s")
        print()
        
        consecutive_404 = 0
        
        for case_id in range(start_id, max_id + 1):
            self.stats['total_checked'] += 1
            
            try:
                case = self.scrape_by_id(case_id)
                
                if case:
                    self.cases.append(case)
                    self.stats['successful'] += 1
                    consecutive_404 = 0
                    
                    # 提取 sector 用于标签
                    if case.get('sector'):
                        sector_tag = case['sector'].lower().replace(' ', '-')
                        if sector_tag not in case['relevance_tags']:
                            case['relevance_tags'].append(sector_tag)
                    
                    print(f"  ✓ [{case_id}] {case['name']}")
                else:
                    self.stats['not_found'] += 1
                    consecutive_404 += 1
                    
            except Exception as e:
                print(f"  ! [{case_id}] Error: {e}")
                self.stats['failed'] += 1
            
            # 进度
            if case_id % 50 == 0:
                print(f"\n  进度: {case_id}/{max_id} | 成功: {self.stats['successful']} | 404: {self.stats['not_found']}")
            
            # 连续 404 过多则停止
            if consecutive_404 >= consecutive_limit:
                print(f"\n  [!] 连续 {consecutive_limit} 个 404，停止扫描")
                break
            
            time.sleep(self.REQUEST_DELAY)
        
        return self.cases
    
    def save(self):
        """保存结果"""
        Path(self.OUTPUT_FILE).parent.mkdir(parents=True, exist_ok=True)
        
        output = {
            'metadata': {
                'scraped_at': datetime.now().isoformat(),
                'total_cases': len(self.cases),
                'source': 'loot-drop.io',
                'version': '1.0',
            },
            'cases': self.cases
        }
        
        with open(self.OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(output, f, ensure_ascii=False, indent=2)
        
        print(f"\n已保存到: {self.OUTPUT_FILE}")


def main():
    scraper = LootDropFullScraper()
    
    # 扫描 ID 范围
    cases = scraper.discover_and_scrape(start_id=1, max_id=3000)
    
    # 保存
    scraper.save()
    
    # 统计
    print("\n" + "=" * 60)
    print("爬取完成!")
    print(f"成功: {scraper.stats['successful']}")
    print(f"未找到: {scraper.stats['not_found']}")
    print(f"错误: {scraper.stats['failed']}")
    print("=" * 60)


if __name__ == "__main__":
    main()
