# Startup-Advisor 数据采集工具

## 目录结构

```
scripts/
├── case-scraper.py     # 案例数据爬虫
└── README.md           # 本文件
```

## case-scraper.py

从 loot-drop.io 爬取失败案例数据。

### 使用方法

```bash
# 安装依赖
pip install requests beautifulsoup4

# 运行爬虫
python scripts/case-scraper.py
```

### 配置

修改脚本中的 `known_cases` 列表，添加更多案例 ID：

```python
known_cases = [
    (2035, 'wework'),
    (1891, 'quibi'),
    # 添加更多...
]
```

## 数据输出

爬取的数据会保存到 `data/startup-cases.json`，格式如下：

```json
{
  "id": "2035-wework",
  "name": "WeWork",
  "sector": "Real Estate",
  "failure_analysis": "...",
  "market_analysis": "...",
  "startup_learnings": [...],
  ...
}
```

## 注意事项

- 爬虫需要遵守目标网站的 robots.txt
- 添加适当延时避免被封禁
- 仅用于学习研究目的
