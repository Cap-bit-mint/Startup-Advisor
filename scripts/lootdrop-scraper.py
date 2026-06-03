#!/usr/bin/env python3
"""
Loot-Drop.io 失败创业公司案例爬虫
用于 Startup-Advisor 数据源

依赖: pip install requests beautifulsoup4
运行: python scripts/lootdrop-scraper.py

注意: 请遵守网站规则，合理设置请求频率
"""

import json
import time
import re
import os
from datetime import datetime
from pathlib import Path
from typing import Optional, Dict, List, Any
from urllib.parse import urljoin

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("缺少依赖，请先安装: pip install requests beautifulsoup4")
    exit(1)


class LootDropScraper:
    """Loot-Drop.io 爬虫"""
    
    BASE_URL = "https://www.loot-drop.io"
    OUTPUT_FILE = "./data/lootdrop_cases.json"
    
    # 请求配置
    REQUEST_DELAY = 1.0  # 秒
    REQUEST_TIMEOUT = 15   # 秒
    MAX_ID = 5000        # 最大 ID 范围
    BATCH_SIZE = 100     # 批量保存间隔
    
    # 字段选择器配置
    FIELD_SELECTORS = {
        'sector': ['sector', 'industry', 'category'],
        'product_type': ['product type', 'product-type', 'producttype', 'type'],
        'founding_year': ['founding year', 'founding-year', 'founded', 'start year'],
        'end_year': ['end year', 'end-year', 'ended', 'closed', 'failure year'],
        'total_cash_burned': ['total cash burned', 'total-cash-burned', 'cash burned', 'burned'],
        'funding_raised': ['funding raised', 'total funding', 'raised', 'total raised'],
        'valuation': ['valuation', 'peak valuation', 'highest valuation'],
    }
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'max-age=0',
        })
        self.cases = []
        self.stats = {
            'total_checked': 0,
            'successful': 0,
            'failed': 0,
            'skipped': 0,
            'start_time': None,
            'end_time': None,
        }
        
    def _make_request(self, url: str) -> Optional[str]:
        """发起 HTTP 请求"""
        try:
            response = self.session.get(url, timeout=self.REQUEST_TIMEOUT)
            if response.status_code == 200:
                return response.text
            elif response.status_code == 404:
                return None
            else:
                print(f"  [!] HTTP {response.status_code}: {url}")
                return None
        except requests.exceptions.Timeout:
            print(f"  [!] 超时: {url}")
            return None
        except requests.exceptions.RequestException as e:
            print(f"  [!] 请求错误: {e}")
            return None
    
    def _parse_text_content(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """解析文本内容"""
        data = {}
        text = soup.get_text(separator=' ', strip=True)
        
        # 提取年份
        year_pattern = r'(?:founding|founded|started|established)\s*(?:in| year)?\s*[:\-]?\s*(\d{4})'
        match = re.search(year_pattern, text, re.IGNORECASE)
        if match:
            data['founding_year'] = int(match.group(1))
            
        end_year_pattern = r'(?:ended|closed|failed|stopped)\s*(?:in| year)?\s*[:\-]?\s*(\d{4})'
        match = re.search(end_year_pattern, text, re.IGNORECASE)
        if match:
            data['end_year'] = int(match.group(1))
            
        # 提取金额
        amount_pattern = r'\$?([\d.]+)\s*(million|billion|thousand)?\s*(?:USD|\$)'
        amounts = re.findall(amount_pattern, text, re.IGNORECASE)
        if amounts:
            for amount, scale, _ in amounts:
                num = float(amount)
                if scale and scale.lower() in ['billion', 'b']:
                    num *= 1_000_000_000
                elif scale and scale.lower() in ['million', 'm']:
                    num *= 1_000_000
                elif scale and scale.lower() in ['thousand', 'k']:
                    num *= 1_000
                    
                # 识别是融资还是烧钱
                if 'raised' in text.lower() and 'burned' not in text.lower():
                    if 'funding_raised' not in data or num > data.get('funding_raised', 0):
                        data['funding_raised'] = num
                else:
                    if 'total_cash_burned' not in data or num > data.get('total_cash_burned', 0):
                        data['total_cash_burned'] = num
        
        return data
    
    def _parse_structured_fields(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """解析结构化字段"""
        data = {}
        
        # 查找所有标题和内容对
        headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'strong', 'b'])
        
        for heading in headings:
            heading_text = heading.get_text(strip=True).lower()
            
            # 匹配字段
            if 'sector' in heading_text or 'industry' in heading_text or 'category' in heading_text:
                next_elem = heading.find_next_sibling()
                if next_elem:
                    data['sector'] = next_elem.get_text(strip=True)
                    
            elif 'product' in heading_text and 'type' in heading_text:
                next_elem = heading.find_next_sibling()
                if next_elem:
                    data['product_type'] = next_elem.get_text(strip=True)
                    
            elif 'cash burned' in heading_text or 'burned' in heading_text:
                next_elem = heading.find_next_sibling()
                if next_elem:
                    data['total_cash_burned'] = next_elem.get_text(strip=True)
                    
            elif 'funding' in heading_text or 'raised' in heading_text:
                next_elem = heading.find_next_sibling()
                if next_elem:
                    data['funding_raised'] = next_elem.get_text(strip=True)
                    
            elif 'valuation' in heading_text:
                next_elem = heading.find_next_sibling()
                if next_elem:
                    data['valuation'] = next_elem.get_text(strip=True)
        
        # 查找特定区域
        analysis_sections = []
        
        # 失败分析
        for keyword in ['failure analysis', 'why it failed', 'failure reason']:
            section = soup.find(string=re.compile(keyword, re.IGNORECASE))
            if section:
                parent = section.find_parent(['div', 'section', 'article'])
                if parent:
                    analysis_sections.append(parent.get_text(strip=True))
                    
        if analysis_sections:
            data['failure_analysis'] = analysis_sections[0]
        
        # 市场分析
        for keyword in ['market analysis', 'market opportunity', 'market size']:
            section = soup.find(string=re.compile(keyword, re.IGNORECASE))
            if section:
                parent = section.find_parent(['div', 'section', 'article'])
                if parent:
                    data['market_analysis'] = parent.get_text(strip=True)
        
        # 创业教训
        for keyword in ['startup learnings', 'lessons learned', 'key takeaways', 'takeaways']:
            section = soup.find(string=re.compile(keyword, re.IGNORECASE))
            if section:
                parent = section.find_parent(['div', 'section', 'article'])
                if parent:
                    data['startup_learnings'] = parent.get_text(strip=True)
        
        # 可扩展性
        for keyword in ['scalability', 'scale', 'expansion']:
            section = soup.find(string=re.compile(keyword, re.IGNORECASE))
            if section:
                parent = section.find_parent(['div', 'section', 'article'])
                if parent:
                    data['scalability'] = parent.get_text(strip=True)
        
        # 转型建议
        for keyword in ['pivot', 'what could have been done', 'alternative']:
            section = soup.find(string=re.compile(keyword, re.IGNORECASE))
            if section:
                parent = section.find_parent(['div', 'section', 'article'])
                if parent:
                    data['pivot_concept'] = parent.get_text(strip=True)
        
        return data
    
    def _extract_name(self, soup: BeautifulSoup, url: str) -> str:
        """提取公司名称"""
        # 从 h1 提取
        h1 = soup.find('h1')
        if h1:
            name = h1.get_text(strip=True)
            if name:
                return name
        
        # 从 title 提取
        title = soup.find('title')
        if title:
            name = title.get_text(strip=True).split('|')[0].strip()
            if name:
                return name
                
        # 从 URL 提取
        slug = url.split('/')[-1]
        if '-' in slug:
            # 移除 ID
            parts = slug.split('-')
            if parts[0].isdigit():
                parts = parts[1:]
            name = ' '.join(word.capitalize() for word in parts)
            return name
            
        return slug
    
    def scrape_case(self, case_id: int, name: str) -> Optional[Dict]:
        """爬取单个案例"""
        url = f"{self.BASE_URL}/startup/{case_id}-{name}"
        html = self._make_request(url)
        
        if not html:
            return None
            
        soup = BeautifulSoup(html, 'html.parser')
        
        # 构建案例数据
        case_data = {
            'id': f"{case_id}-{name}",
            'loot_id': case_id,
            'slug': name,
            'url': url,
            'name': self._extract_name(soup, url),
            'scraped_at': datetime.now().isoformat(),
        }
        
        # 解析结构化字段
        case_data.update(self._parse_structured_fields(soup))
        
        # 解析文本内容
        case_data.update(self._parse_text_content(soup))
        
        # 添加描述性段落
        paragraphs = soup.find_all('p')
        descriptions = []
        for p in paragraphs:
            text = p.get_text(strip=True)
            if len(text) > 100:  # 过滤短文本
                descriptions.append(text)
                
        if descriptions:
            case_data['description'] = ' '.join(descriptions[:3])  # 取前3段
        
        # 判断是否成功获取有效数据
        has_content = any([
            case_data.get('failure_analysis'),
            case_data.get('market_analysis'),
            case_data.get('total_cash_burned'),
            case_data.get('funding_raised'),
        ])
        
        if not has_content:
            # 尝试从 meta description 获取
            meta_desc = soup.find('meta', attrs={'name': 'description'})
            if meta_desc:
                case_data['description'] = meta_desc.get('content', '')
        
        return case_data
    
    def check_robots_txt(self) -> bool:
        """检查 robots.txt"""
        robots_url = f"{self.BASE_URL}/robots.txt"
        try:
            response = self.session.get(robots_url, timeout=5)
            if response.status_code == 200:
                print(f"[i] robots.txt 存在: {robots_url}")
                return True
        except:
            pass
        return False
    
    def discover_cases_from_sitemap(self) -> List[tuple]:
        """从 sitemap 发现案例"""
        sitemap_url = f"{self.BASE_URL}/sitemap.xml"
        cases = []
        
        html = self._make_request(sitemap_url)
        if not html:
            return cases
            
        # 解析 sitemap
        urls = re.findall(r'<loc>([^<]+)</loc>', html)
        for url in urls:
            if '/startup/' in url:
                match = re.search(r'/startup/(\d+)-(.+)', url)
                if match:
                    case_id = int(match.group(1))
                    name = match.group(2).replace('/', '')
                    cases.append((case_id, name))
                    
        print(f"[i] 从 sitemap 发现 {len(cases)} 个案例")
        return cases
    
    def discover_cases_by_id(self, start_id: int = 1, max_id: int = 5000, 
                             consecutive_404_limit: int = 50) -> List[tuple]:
        """通过 ID 遍历发现案例"""
        cases = []
        consecutive_404 = 0
        
        for case_id in range(start_id, max_id + 1):
            self.stats['total_checked'] += 1
            
            # 测试几个常见名称
            for name_suffix in ['', '-startup', '-company', '-inc']:
                url = f"{self.BASE_URL}/startup/{case_id}{name_suffix}"
                html = self._make_request(url)
                
                if html:
                    # 从 URL 或页面提取名称
                    if name_suffix:
                        name = name_suffix.lstrip('-')
                    else:
                        # 尝试从页面获取
                        soup = BeautifulSoup(html, 'html.parser')
                        name = self._extract_name(soup, url).lower().replace(' ', '-')
                        
                    cases.append((case_id, name))
                    consecutive_404 = 0
                    break
            else:
                consecutive_404 += 1
                
            # 进度显示
            if case_id % 50 == 0:
                print(f"  进度: {case_id}/{max_id} ({len(cases)} 个有效案例)")
                
            # 连续 404 过多则停止
            if consecutive_404 >= consecutive_404_limit:
                print(f"[i] 连续 {consecutive_404_limit} 个 404，停止扫描")
                break
                
            # 延迟
            time.sleep(self.REQUEST_DELAY)
            
        return cases
    
    def scrape_all(self, start_id: int = 1, max_id: int = 5000,
                   use_sitemap: bool = True) -> List[Dict]:
        """爬取所有案例"""
        self.stats['start_time'] = datetime.now().isoformat()
        
        print("=" * 60)
        print("Loot-Drop.io 失败创业公司案例爬虫")
        print("=" * 60)
        
        # 检查 robots.txt
        self.check_robots_txt()
        
        # 发现案例
        if use_sitemap:
            cases_to_scrape = self.discover_cases_from_sitemap()
            if not cases_to_scrape:
                print("[!] sitemap 未发现案例，使用 ID 遍历...")
                cases_to_scrape = self.discover_cases_by_id(start_id, max_id)
        else:
            cases_to_scrape = self.discover_cases_by_id(start_id, max_id)
        
        print(f"\n[i] 开始爬取 {len(cases_to_scrape)} 个案例...\n")
        
        # 爬取每个案例
        for i, (case_id, name) in enumerate(cases_to_scrape):
            try:
                case = self.scrape_case(case_id, name)
                
                if case:
                    self.cases.append(case)
                    self.stats['successful'] += 1
                    print(f"  ✓ [{case['loot_id']}] {case['name']}")
                else:
                    self.stats['skipped'] += 1
                    
            except Exception as e:
                print(f"  [!] [{case_id}] {name}: {e}")
                self.stats['failed'] += 1
                
            # 延迟
            time.sleep(self.REQUEST_DELAY)
            
            # 批量保存
            if (i + 1) % self.BATCH_SIZE == 0:
                self.save_results()
                print(f"  [i] 已保存 {len(self.cases)} 个案例")
                
            # 进度
            if (i + 1) % 20 == 0:
                print(f"  进度: {i + 1}/{len(cases_to_scrape)}")
        
        self.stats['end_time'] = datetime.now().isoformat()
        
        # 最终保存
        self.save_results()
        
        return self.cases
    
    def save_results(self):
        """保存结果"""
        Path(self.OUTPUT_FILE).parent.mkdir(parents=True, exist_ok=True)
        
        output_data = {
            'metadata': {
                'scraped_at': datetime.now().isoformat(),
                'total_cases': len(self.cases),
                'stats': self.stats,
            },
            'cases': self.cases
        }
        
        with open(self.OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, ensure_ascii=False, indent=2)
            
    def generate_known_cases_list(self) -> List[tuple]:
        """生成已知的高价值案例列表"""
        return [
            (2035, 'wework'),
            (1891, 'quibi'),
            (2171, 'fabcom'),
            (2189, 'homejoy'),
            (2563, 'plenty-unlimited'),
            (1813, 'yik-yak'),
            (2156, 'gotv'),
            (2572, 'techspace'),
            (2001, 'pets'),
            (2201, 'webvan'),
            (2099, 'gilt'),
            (2099, 'handy'),
            (2101, 'taskrabbit'),
            (2201, 'instacart'),
        ]
    
    def scrape_known_cases(self) -> List[Dict]:
        """爬取已知的高价值案例"""
        known_cases = self.generate_known_cases_list()
        self.stats['start_time'] = datetime.now().isoformat()
        
        print("=" * 60)
        print("爬取已知高价值案例")
        print("=" * 60)
        
        for case_id, name in known_cases:
            try:
                case = self.scrape_case(case_id, name)
                if case:
                    self.cases.append(case)
                    self.stats['successful'] += 1
                    print(f"  ✓ [{case_id}] {case['name']}")
                else:
                    self.stats['skipped'] += 1
                    print(f"  ✗ [{case_id}] {name}")
            except Exception as e:
                print(f"  [!] [{case_id}] {name}: {e}")
                self.stats['failed'] += 1
                
            time.sleep(self.REQUEST_DELAY)
        
        self.stats['end_time'] = datetime.now().isoformat()
        self.save_results()
        
        return self.cases


def main():
    """主函数"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Loot-Drop.io 案例爬虫')
    parser.add_argument('--mode', choices=['known', 'sitemap', 'scan', 'all'], 
                        default='known', help='爬取模式')
    parser.add_argument('--start-id', type=int, default=1, help='起始 ID')
    parser.add_argument('--max-id', type=int, default=5000, help='最大 ID')
    parser.add_argument('--delay', type=float, default=1.0, help='请求延迟(秒)')
    parser.add_argument('--output', default='./data/lootdrop_cases.json', help='输出文件')
    
    args = parser.parse_args()
    
    scraper = LootDropScraper()
    scraper.REQUEST_DELAY = args.delay
    scraper.OUTPUT_FILE = args.output
    
    if args.mode == 'known':
        print("模式: 爬取已知高价值案例")
        scraper.scrape_known_cases()
        
    elif args.mode == 'sitemap':
        print("模式: 从 sitemap 发现并爬取")
        scraper.scrape_all(use_sitemap=True)
        
    elif args.mode == 'scan':
        print(f"模式: ID 遍历扫描 ({args.start_id} - {args.max_id})")
        cases = scraper.discover_cases_by_id(args.start_id, args.max_id)
        scraper.scrape_all(use_sitemap=False)
        
    elif args.mode == 'all':
        print("模式: 完整爬取 (sitemap + 扫描)")
        scraper.scrape_all(use_sitemap=True)
    
    # 打印统计
    print("\n" + "=" * 60)
    print("爬取完成!")
    print(f"输出文件: {scraper.OUTPUT_FILE}")
    print(f"成功: {scraper.stats['successful']}")
    print(f"跳过: {scraper.stats['skipped']}")
    print(f"失败: {scraper.stats['failed']}")
    print("=" * 60)


if __name__ == "__main__":
    main()
