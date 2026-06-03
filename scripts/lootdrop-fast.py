#!/usr/bin/env python3
import requests
from bs4 import BeautifulSoup
import json
import time
import sys

BASE_URL = "https://www.loot-drop.io"
OUTPUT_FILE = "./docs/data/cases.json"

def scrape(case_id):
    url = f"{BASE_URL}/startup/{case_id}"
    try:
        resp = requests.get(url, timeout=10)
        if resp.status_code != 200:
            return None
        
        soup = BeautifulSoup(resp.text, 'html.parser')
        name = soup.find('span', id='startup-name')
        if not name:
            return None
        name = name.get_text(strip=True)
        
        data = {'id': case_id, 'name': name, 'url': url}
        
        # 提取字段
        for label, value in zip(
            soup.find_all('span', class_='stat-label'),
            soup.find_all('span', class_='stat-value')
        ):
            key = label.get_text(strip=True).lower().replace(' ', '_')
            data[key] = value.get_text(strip=True)
        
        # 提取分析内容
        for card in soup.find_all('article', class_='grid-card'):
            title = card.find('h3', class_='card-title')
            if title:
                key = title.get_text(strip=True).lower().replace(' ', '_')
                content = card.get('data-full-text', '')
                if content:
                    data[key] = content[:2000]
        
        return data if data.get('sector') or data.get('failure_analysis') else None
    except:
        return None

def main():
    cases = []
    start, end = 1000, 3000
    
    print(f"扫描 {start}-{end}...", flush=True)
    for i in range(start, end + 1):
        case = scrape(i)
        if case:
            cases.append(case)
            print(f"✓ [{i}] {case['name']}", flush=True)
        elif i % 50 == 0:
            print(f"进度: {i}/{end} | 已获取: {len(cases)}", flush=True)
        time.sleep(0.5)
    
    # 保存
    output = {'metadata': {'total': len(cases), 'source': 'loot-drop.io'}, 'cases': cases}
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"\n完成! 已保存 {len(cases)} 个案例到 {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
