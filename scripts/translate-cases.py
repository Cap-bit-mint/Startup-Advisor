#!/usr/bin/env python3
"""
生成双语案例 JSON
使用 googletrans 库进行翻译
"""

import json
import time
import sys

try:
    from googletrans import Translator
    translator = Translator()
except ImportError:
    print("需要安装: pip install googletrans")
    print("或者使用替代方案...")
    sys.exit(1)

INPUT_FILE = './docs/data/cases.json'
OUTPUT_FILE = './docs/data/cases-bilingual.json'

def translate(text, dest='zh-cn', src='en'):
    """翻译文本"""
    if not text or not isinstance(text, str):
        return text
    
    try:
        # 分段翻译，每段限制
        if len(text) > 5000:
            text = text[:5000]
        
        result = translator.translate(text, dest=dest, src=src)
        return result.text if result else text
    except Exception as e:
        print(f"  翻译失败: {e}")
        return text

def translate_case(case):
    """翻译单个案例"""
    translated = case.copy()
    
    # 翻译主要字段
    fields = ['name', 'sector', 'product_type', 'description']
    for field in fields:
        if case.get(field):
            print(f"  翻译 {field}...")
            translated[field] = translate(case[field])
            time.sleep(0.3)  # 避免请求过快
    
    # 翻译分析内容
    analysis_fields = [
        'failure_analysis', 'market_analysis', 'startup_learnings',
        'scalability', 'pivot_concept'
    ]
    
    for field in analysis_fields:
        if case.get(field):
            print(f"  翻译 {field}...")
            # 如果是列表
            if isinstance(case[field], list):
                translated[field] = [translate(item) for item in case[field]]
            else:
                translated[field] = translate(case[field])
            time.sleep(0.5)
    
    # 保留原文（添加 _en 后缀）
    for field in fields + analysis_fields:
        if case.get(field):
            en_field = field + '_en'
            translated[en_field] = case[field]
    
    return translated

def main():
    print("读取案例数据...")
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    cases = data.get('cases', [])
    print(f"共 {len(cases)} 个案例\n")
    
    translated_cases = []
    for i, case in enumerate(cases):
        print(f"[{i+1}/{len(cases)}] {case.get('name', 'Unknown')}...")
        try:
            translated = translate_case(case)
            translated_cases.append(translated)
        except Exception as e:
            print(f"  失败: {e}")
            translated_cases.append(case)
        
        # 每50个保存一次
        if (i + 1) % 50 == 0:
            print(f"\n  进度: {i+1}/{len(cases)}")
    
    # 保存结果
    output = {
        'metadata': {
            **data.get('metadata', {}),
            'bilingual': True,
            'languages': ['zh', 'en']
        },
        'cases': translated_cases
    }
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"\n完成! 保存到 {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
