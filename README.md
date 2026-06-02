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

## 安装与使用

### 环境要求

- Node.js >= 18.0.0
- npm 或 yarn

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/Cap-bit-mint/Startup-Advisor.git

# 进入目录
cd Startup-Advisor

# 安装依赖（如果需要）
npm install
```

### 在 Codex 中使用

本项目为 Codex Skill 集合，在 Codex 中直接调用：

```
@startup-advisor    # 主分析入口
@advisor-failure    # 深度失败分析
@advisor-pitch      # 路演优化
```

### 在 OpenClaw 中使用

```bash
# 导入 Skill
openclaw skill import ./startup-advisor/SKILL.md

# 调用
openclaw run @startup-advisor
```

### 在 Claude Desktop 中使用

1. 将项目路径添加到 `claude_desktop_config.json`：
```json
{
  "skills": {
    "startup-advisor": {
      "path": "/path/to/Startup-Advisor/startup-advisor"
    }
  }
}
```

2. 重启 Claude Desktop 后直接调用：

```
@startup-advisor
```

## 项目结构

```
Startup-Advisor/
├── startup-advisor/          # 主入口 Skill
├── advisor-failure/          # 失败案例分析模块
├── advisor-pitch/            # 路演优化模块
├── assets/                   # 可视化资源
└── [配置文件]
```

## Skills

### startup-advisor

主入口，协调各子模块，提供综合分析。

**触发词**: 分析创业风险、评估项目可行性、创业决策支持、避免陷阱

### advisor-failure

专注失败案例的深度分析，提取反模式和风险评估。

**触发词**: 失败案例研究、反模式、公司倒闭原因、创业雷区

### advisor-pitch

帮助优化路演材料和应对投资者问答。

**触发词**: 优化路演、pitch deck、投资人问答、融资准备

## 案例分析维度

| 维度 | 说明 |
|------|------|
| 赛道分析 | 行业特定失败模式 |
| 阶段分析 | 种子/A/B轮风险差异 |
| 模式识别 | 常见失败/成功路径 |
| 信号检测 | 早期危险信号识别 |

## 数据来源

| 来源 | 用途 |
|------|------|
| loot-drop.io Startup Graveyard | 失败案例统计基础数据 |
| 公开新闻报道 | 案例细节与时间线 |
| Crunchbase | 融资数据与公司信息 |
| YC/TechCrunch | post-mortem 与行业分析 |
| CB Insights | 统计数据与行业报告 |

## 可视化工具

| 工具 | 功能 |
|------|------|
| failure-matrix.html | 交互式风险矩阵，支持筛选和案例展开 |
| decision-tree.html | 关键决策流程引导 |
| risk-assessment.html | 风险评估问卷工具 |

## 质量承诺

- 📚 基于真实案例数据（所有案例标注时间戳）
- 🎯 结构化风险评估（1-5分量化）
- ⚡ 可操作建议输出（基于案例映射）
- 🔄 持续迭代更新

## 数据来源声明

> **统计来源**: 失败案例统计综合自 loot-drop.io Startup Graveyard 公开数据
>
> **案例来源**: 案例分析来自公开新闻报道、创始人声明、Crunchbase 等公开信息
>
> **框架来源**: 核心框架基于行业统计规律提炼

## 免责声明

> ⚠️ **重要提示**
>
> 本分析基于历史数据统计和公开案例，仅供学习参考，不构成投资建议。创业存在固有风险，决策需结合实际情况，咨询专业人士。

## 贡献

参见 [CONTRIBUTING.md](./CONTRIBUTING.md)

## 许可

MIT License
