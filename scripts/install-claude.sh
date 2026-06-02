#!/bin/bash

# Startup-Advisor Claude Desktop 安装脚本

set -e

echo "🚀 开始安装 Startup-Advisor..."

# 1. 克隆仓库
if [ -d "~/Startup-Advisor" ]; then
    echo "📁 仓库已存在，更新中..."
    cd ~/Startup-Advisor && git pull
else
    echo "📥 克隆仓库..."
    git clone https://github.com/Cap-bit-mint/Startup-Advisor.git ~/Startup-Advisor
fi

# 2. 确保目标目录存在
mkdir -p ~/Library/Application\ Support/Claude

# 3. 获取配置文件路径
CONFIG_FILE=~/Library/Application\ Support/Claude/claude_desktop_config.json

# 4. 检查配置文件是否存在
if [ ! -f "$CONFIG_FILE" ]; then
    echo "📝 创建配置文件..."
    echo '{}' > "$CONFIG_FILE"
fi

# 5. 添加 skills 配置（使用 Python 处理 JSON）
python3 << 'PYEOF'
import json
import os

config_path = os.path.expanduser("~/Library/Application Support/Claude/claude_desktop_config.json")

# 读取现有配置
try:
    with open(config_path, 'r') as f:
        config = json.load(f)
except:
    config = {}

# 添加 skills
config["skills"] = {
    "startup-advisor": {
        "path": os.path.expanduser("~/Startup-Advisor/startup-advisor")
    },
    "advisor-failure": {
        "path": os.path.expanduser("~/Startup-Advisor/advisor-failure")
    },
    "advisor-pitch": {
        "path": os.path.expanduser("~/Startup-Advisor/advisor-pitch")
    }
}

# 写回配置
with open(config_path, 'w') as f:
    json.dump(config, f, indent=2)

print("✅ 配置已更新")
PYEOF

echo ""
echo "✨ 安装完成！"
echo ""
echo "📋 下一步："
echo "   1. 重启 Claude Desktop"
echo "   2. 在对话中输入 @startup-advisor 即可使用"
echo ""
