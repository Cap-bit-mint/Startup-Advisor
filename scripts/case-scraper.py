#!/usr/bin/env python3
"""
Startup-Advisor 案例数据爬虫
用于从 loot-drop.io 获取失败案例数据

依赖: pip install requests beautifulsoup4
运行: python scripts/case-scraper.py
"""

import json
import time
import requests
from bs4 import BeautifulSoup
from pathlib import Path

# 配置
BASE_URL = "https://www.loot-drop.io"
STARTUP_LIST_URL = f"{BASE_URL}/startups"
OUTPUT_FILE = "./data/startup-cases.json"

# 案例 ID 范围（根据 loot-drop 格式）
# 格式: /startup/{id}-{name}

class CaseScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        })
        self.cases = []
    
    def get_case_detail(self, case_id, name):
        """获取单个案例详情"""
        url = f"{BASE_URL}/startup/{case_id}-{name}"
        try:
            response = self.session.get(url, timeout=10)
            if response.status_code == 200:
                return self.parse_case_page(response.text, case_id, name)
        except Exception as e:
            print(f"Error fetching {url}: {e}")
        return None
    
    def parse_case_page(self, html, case_id, name):
        """解析案例页面"""
        soup = BeautifulSoup(html, 'html.parser')
        
        # 提取结构化数据
        data = {
            'id': case_id,
            'slug': name,
            'url': f"{BASE_URL}/startup/{case_id}-{name}"
        }
        
        # 尝试提取各字段
        # 注意：需要根据实际页面结构调整选择器
        
        # 行业/领域
        sector_elem = soup.select_one('[class*="sector"], [class*="industry"], h2:contains("SECTOR")')
        if sector_elem:
            data['sector'] = sector_elem.get_text(strip=True)
        
        # 产品类型
        product_elem = soup.select_one('[class*="product"], [class*="type"]')
        if product_elem:
            data['product_type'] = product_elem.get_text(strip=True)
        
        # 失败时间
        end_elem = soup.select_one('[class*="end"], [class*="closed"]')
        if end_elem:
            data['end_year'] = end_elem.get_text(strip=True)
        
        # 失败分析
        analysis_elem = soup.select_one('[class*="failure"], [class*="analysis"]')
        if analysis_elem:
            data['failure_analysis'] = analysis_elem.get_text(strip=True)
        
        # 市场分析
        market_elem = soup.select_one('[class*="market"]')
        if market_elem:
            data['market_analysis'] = market_elem.get_text(strip=True)
        
        # 创业教训
        learnings_elem = soup.select_one('[class*="learnings"], [class*="lessons"]')
        if learnings_elem:
            data['startup_learnings'] = learnings_elem.get_text(strip=True)
        
        # 可扩展性
        scalability_elem = soup.select_one('[class*="scalability"], [class*="scale"]')
        if scalability_elem:
            data['scalability'] = scalability_elem.get_text(strip=True)
        
        # 融资信息
        funding_elem = soup.select_one('[class*="funding"], [class*="raised"]')
        if funding_elem:
            data['funding'] = funding_elem.get_text(strip=True)
        
        # 烧钱总额
        burn_elem = soup.select_one('[class*="burn"], [class*="cash-burned"]')
        if burn_elem:
            data['total_cash_burned'] = burn_elem.get_text(strip=True)
        
        return data if len(data) > 3 else None
    
    def scrape_known_cases(self):
        """爬取已知案例"""
        # 已知的高价值案例列表
        known_cases = [
            (2035, 'wework'),
            (1891, 'quibi'),
            (2171, 'fabcom'),
            (2189, 'homejoy'),
            (2563, 'plenty-unlimited'),
            # 可继续添加...
        ]
        
        for case_id, name in known_cases:
            print(f"Scraping {name}...")
            case = self.get_case_detail(case_id, name)
            if case:
                self.cases.append(case)
                print(f"  ✓ {name}")
            else:
                print(f"  ✗ {name}")
            time.sleep(1)  # 避免请求过快
        
        return self.cases
    
    def save_to_json(self, filepath=OUTPUT_FILE):
        """保存为 JSON 文件"""
        Path(filepath).parent.mkdir(parents=True, exist_ok=True)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(self.cases, f, ensure_ascii=False, indent=2)
        print(f"\nSaved {len(self.cases)} cases to {filepath}")
        return filepath


def main():
    scraper = CaseScraper()
    cases = scraper.scrape_known_cases()
    if cases:
        scraper.save_to_json()
    else:
        print("No cases scraped. Check your network connection.")


if __name__ == "__main__":
    main()
