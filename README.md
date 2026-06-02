# Startup-Advisor

> 基于失败案例分析的创业决策辅助系统

## 核心价值

**"我们研究失败，是为了不再重蹈覆辙。"**

Startup-Advisor 通过系统性分析真实的创业失败案例，帮助创业者：

- 🔍 识别早期危险信号
- ⚠️ 评估潜在风险
- 📊 匹配成功/失败模式
- 🎯 优化决策质量

## 核心优势

- 🎯 **案例驱动**: 基于真实失败案例的风险量化（非理论推断）
- 📚 **模式库**: 24种失败模式，覆盖市场/产品/团队/运营/融资
- 🔄 **完整链路**: 模式匹配 → 具体建议 → 案例映射
- 📊 **可视化**: 交互式风险矩阵和决策树
- 🧭 **轮次适配**: 种子/A/B轮差异化问答

---

## 安装与使用

### 环境要求

- Node.js >= 18.0.0（可选）
- npm 或 yarn（可选）

### 一键安装

#### Claude Desktop（推荐）

```bash
# macOS/Linux
mkdir -p ~/Library/Application\ Support/Claude/
git clone https://github.com/Cap-bit-mint/Startup-Advisor.git ~/Startup-Advisor

# 添加到 claude_desktop_config.json
cat >> ~/Library/Application\ Support/Claude/claude_desktop_config.json << 'EOF'
,
  "skills": {
    "startup-advisor": {
      "path": "~/Startup-Advisor/startup-advisor"
    },
    "advisor-failure": {
      "path": "~/Startup-Advisor/advisor-failure"
    },
    "advisor-pitch": {
      "path": "~/Startup-Advisor/advisor-pitch"
    }
  }
EOF
```

#### OpenClaw

```bash
# 安装 OpenClaw（如未安装）
curl -fsSL https://openclaw.io/install.sh | sh

# 一键导入所有 Skills
openclaw skill import https://github.com/Cap-bit-mint/Startup-Advisor/raw/main/startup-advisor/SKILL.md
openclaw skill import https://github.com/Cap-bit-mint/Startup-Advisor/raw/main/advisor-failure/SKILL.md
openclaw skill import https://github.com/Cap-bit-mint/Startup-Advisor/raw/main/advisor-pitch/SKILL.md
```

#### Codex

直接在 Codex 中导入 Skill 路径即可使用。

### 手动安装

```bash
# 克隆仓库
git clone https://github.com/Cap-bit-mint/Startup-Advisor.git

# 进入目录
cd Startup-Advisor

# 安装依赖（如果需要）
npm install
```

---

## 使用用例

### 用例1：分析创业想法

```
用户: "我打算做一个 AI 写作助手，面向内容创作者，你觉得靠谱吗？"

→ @startup-advisor

分析报告:
{
  "risk_level": 3,
  "matched_patterns": [
    {"pattern": "伪需求", "relevance": "medium"},
    {"pattern": "竞争认知偏差", "relevance": "high"}
  ],
  "warning_signs": [
    {"sign": "AI赛道竞争激烈", "severity": "high"},
    {"sign": "差异化不明确", "severity": "medium"}
  ],
  "recommendations": [
    {"priority": "high", "action": "验证内容创作者的真实痛点"},
    {"priority": "medium", "action": "明确与ChatGPT/Jasper的差异化"}
  ]
}
```

### 用例2：��究失败案例

```
用户: "Juicero 为什么会失败？有什么教训？"

→ @advisor-failure

分析报告:
{
  "case_summary": {
    "name": "Juicero",
    "failure_year": 2017,
    "funding": "$118.5M"
  },
  "root_causes": [
    {"cause": "伪需求", "severity": "极高"},
    {"cause": "技术傲慢", "severity": "高"},
    {"cause": "成本结构失控", "severity": "高"}
  ],
  "lessons": [
    {"lesson": "永远从用户真实需求出发", "actionable": "用塑料袋测试替代�案"},
    {"lesson": "避免过度工程化", "actionable": "简单方案优先"}
  ]
}
```

### 用例3：优化路演

```
用户: "我准备融资A轮，帮我预演投资人可能问的问题"

→ @advisor-pitch

Q&A 预演:
{
  "round": "A轮",
  "anticipated_questions": [
    {"question": "你的增长数据如何？", "difficulty": "medium", "suggested_answer": "展示MRR增长曲线..."},
    {"question": "你的单位经济模型？", "difficulty": "hard", "suggested_answer": "LTV/CAC = X, CAC回收期 = Y月..."},
    {"question": "如果大公司复制你们怎么办？", "difficulty": "hard", "suggested_answer": "我们已有X项壁垒..."}
  ]
}
```

### 用例4：风险自检

```
用户: "我的SaaS项目月流失率8%，正常吗？"

→ @startup-advisor

风险评估:
{
  "risk_level": 4,
  "confidence": "high",
  "matched_patterns": [
    {"pattern": "客户成功失败", "relevance": "high", "source_case": "多家SaaS公司"}
  ],
  "warning_signs": [
    {"sign": "月流失率8%超过健康值5%", "severity": "high", "mitigation": "建立客户健康度监控"}
  ],
  "recommendations": [
    {"priority": "high", "action": "分析流失原因", "rationale": "基于行业统计"},
    {"priority": "high", "action": "优化Onboarding流程", "rationale": "基于成功案例"}
  ]
}
```

---

## Skills

### startup-advisor

主入口，协调各子模块，提供综合分析。

**触发词**: 分析创业风险、评估项目可行性、创业决策支持、避免陷阱

### advisor-failure

专注失败案例的深度分析，提取反模�和风险评估。

**触发词**: 失败案例研究、反模式、公司倒闭原因、创业雷区

### advisor-pitch

帮助优化路演材料和应对投资者问答。

**触发词**: 优化路演、pitch deck、投资人问答、融资准备

---

## 案例分析维度

| 维度 | 说明 |
|------|------|
| 赛道分析 | 行业特定失败模式 |
| 阶段分析 | 种子/A/B轮风险差异 |
| 模式识别 | 常见失败/成功路径 |
| 信号检测 | 早期危险信号识别 |

---

## 数据来源

| 来源 | 用途 |
|------|------|
| loot-drop.io Startup Graveyard | 失败案例统计基础数据 |
| 公开新闻报道 | 案例细节与时间线 |
| Crunchbase | 融资数据与公司信息 |
| YC/TechCrunch | post-mortem 与行业分析 |
| CB Insights | 统计数据与行业报告 |

---

## 可视化工具

| 工具 | 功能 |
|------|------|
| failure-matrix.html | 交互式风险矩阵，支持筛选和案例展开 |
| decision-tree.html | 关键决策流程引导 |
| risk-assessment.html | 风险评估问卷工具 |

直接在浏览器中打开以上 HTML 文件即可使用。

---

## 质量承诺

- 📚 基于真实案例数据（所有案例标注时间戳）
- 🎯 结构化风险评估（1-5分量化）
- ⚡ 可操作建议输出（基于案例映射）
- 🔄 持续迭代更新

---

## 数据来源声明

> **统计来源**: 失败案例统计综合自 loot-drop.io Startup Graveyard 公开数据
>
> **案例来源**: 案例分析来自公开新闻报道、创始人声明、Crunchbase 等公开信息
>
> **框架来源**: 核心框架基于行业统计规律提炼

---

## 免责声明

> ⚠️ **重要提示**
>
> 本分析基于历史数据统计和公开案例，仅供学习参考，不构成投资建议。创业存在固有风险，决策需结合实际情况，咨询专业人士。

---

## 贡献

参见 [CONTRIBUTING.md](./CONTRIBUTING.md)

## 许可

MIT License
