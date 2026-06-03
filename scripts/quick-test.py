import requests
from bs4 import BeautifulSoup
import json

BASE_URL = "https://www.loot-drop.io"

def test_ids():
    test_ids = [2035, 1891, 2171, 2189, 2563, 100, 500, 1000, 1500, 2000]
    
    results = []
    for case_id in test_ids:
        url = f"{BASE_URL}/startup/{case_id}"
        try:
            resp = requests.get(url, timeout=5)
            if resp.status_code == 200:
                soup = BeautifulSoup(resp.text, 'html.parser')
                name = soup.find('span', id='startup-name')
                name = name.get_text(strip=True) if name else "N/A"
                print(f"✓ [{case_id}] {name}")
                results.append((case_id, name, True))
            else:
                print(f"✗ [{case_id}] 404")
                results.append((case_id, None, False))
        except Exception as e:
            print(f"! [{case_id}] Error: {e}")
            results.append((case_id, None, False))
    
    print("\n有效 ID 范围分析:")
    valid_ids = [r[0] for r in results if r[2]]
    if valid_ids:
        print(f"  最小有效 ID: {min(valid_ids)}")
        print(f"  最大有效 ID: {max(valid_ids)}")
        gaps = []
        for i in range(len(valid_ids) - 1):
            if valid_ids[i+1] - valid_ids[i] > 10:
                gaps.append((valid_ids[i], valid_ids[i+1]))
        if gaps:
            print(f"  发现的间隙: {gaps}")

test_ids()
