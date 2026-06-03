/**
 * Startup-Advisor 可复用组件库
 * 版本: 1.0.0
 * 更新: 2026-06-03
 */

const Components = {
    // ============================================
    // 统计卡片组件
    // ============================================
    StatCard: (config) => {
        const { value, label, variant = 'default', icon = '' } = config;
        return `
            <div class="card stat-card card-${variant}">
                ${icon ? `<div class="stat-icon">${icon}</div>` : ''}
                <div class="stat-value">${value}</div>
                <div class="stat-label">${label}</div>
            </div>
        `;
    },
    
    // ============================================
    // 模式卡片组件
    // ============================================
    PatternCard: (pattern) => {
        const riskClass = pattern.risk === 'critical' ? 'card-critical' : 
                          pattern.risk === 'high' ? 'card-high' : 'card-medium';
        const riskBadge = Components.RiskBadge(pattern.risk);
        const casesHtml = pattern.cases.length > 0 
            ? `<div class="pattern-cases">${pattern.cases.map(c => c.name).join(', ')}</div>`
            : '';
        
        return `
            <div class="card card-clickable pattern-card ${riskClass}" 
                 onclick="Components.showPatternDetail('${pattern.id}')">
                <div class="pattern-header">
                    <h4 class="pattern-title">${pattern.title}</h4>
                    ${riskBadge}
                </div>
                <p class="pattern-desc">${pattern.description}</p>
                ${casesHtml}
                <div class="pattern-footer">
                    <span class="badge badge-primary">${StartupAdvisorData.failureMatrix.categories[pattern.category]?.name || pattern.category}</span>
                </div>
            </div>
        `;
    },
    
    // ============================================
    // 风险徽章组件
    // ============================================
    RiskBadge: (level) => {
        const riskInfo = StartupAdvisorData.riskAssessment.scoreRanges.find(r => {
            const score = StartupAdvisorData.failureMatrix.riskLevels[level]?.score || 3;
            return score <= r.max;
        });
        const color = StartupAdvisorData.failureMatrix.riskLevels[level]?.color || '#3498db';
        const name = StartupAdvisorData.failureMatrix.riskLevels[level]?.name || '中';
        
        return `<span class="badge" style="background: ${color}20; color: ${color};">${name}</span>`;
    },
    
    // ============================================
    // 筛选按钮组件
    // ============================================
    FilterButton: (label, value, active = false) => {
        return `<button class="filter-btn ${active ? 'active' : ''}" 
                        data-filter="${value}"
                        onclick="Components.toggleFilter(this, '${value}')">
                    ${label}
                </button>`;
    },
    
    // ============================================
    // 决策树节点组件
    // ============================================
    DecisionNode: (node, type = 'question') => {
        if (type === 'question') {
            return `
                <div class="tree-branch">
                    <div class="node-content" onclick="DecisionTree.selectNode('${node.id}')">
                        <div class="node-question">${node.question}</div>
                        <div class="node-hint">${node.hint}</div>
                    </div>
                    <div class="node-options">
                        <button class="branch-label yes" onclick="DecisionTree.answer('${node.id}', 'yes')">是 ✓</button>
                        <button class="branch-label no" onclick="DecisionTree.answer('${node.id}', 'no')">否 ✗</button>
                    </div>
                </div>
            `;
        } else if (type === 'failure') {
            return `
                <div class="tree-branch">
                    <div class="node-content no">
                        <div class="node-question">${node.title}</div>
                        <div class="node-hint">${node.description}</div>
                    </div>
                </div>
            `;
        } else if (type === 'success') {
            return `
                <div class="tree-branch">
                    <div class="node-content yes">
                        <div class="node-question">${node.title}</div>
                        <div class="node-hint">${node.description}</div>
                    </div>
                </div>
            `;
        }
    },
    
    // ============================================
    // 评估问题组件
    // ============================================
    AssessmentQuestion: (question, category) => {
        const options = StartupAdvisorData.riskAssessment.ratingOptions.map(opt => `
            <div class="rating-option risk-${opt.value}" 
                 onclick="RiskAssessment.selectOption(this, '${category}-${question.id}', ${opt.value})">
                <div class="rating-label">${opt.label}</div>
                <div class="rating-desc">${opt.desc}</div>
            </div>
        `).join('');
        
        return `
            <div class="question-group">
                <div class="question-label">${question.text}</div>
                <div class="rating-options">
                    ${options}
                </div>
            </div>
        `;
    },
    
    // ============================================
    // 结果卡片组件
    // ============================================
    ResultCard: (category, score) => {
        const info = StartupAdvisorData.riskAssessment.categories.find(c => c.id === category);
        const scoreClass = score <= 2 ? 'low' : score <= 3.5 ? 'medium' : 'high';
        const color = score <= 2 ? '#2ecc71' : score <= 3.5 ? '#f39c12' : '#e74c3c';
        
        return `
            <div class="category-card">
                <div class="category-header">
                    <span class="category-name">${info?.icon || ''} ${info?.name || category}</span>
                    <span class="category-score" style="color: ${color}">${score.toFixed(1)}</span>
                </div>
                <div class="category-bar">
                    <div class="category-bar-fill ${scoreClass}" style="width: ${(score / 5) * 100}%"></div>
                </div>
            </div>
        `;
    },
    
    // ============================================
    // 建议项组件
    // ============================================
    RecommendationItem: (rec) => {
        const priorityClass = rec.priority === 'high' ? 'priority-high' : 'priority-medium';
        const priorityIcon = rec.priority === 'high' ? '🚨' : '⚠️';
        
        return `
            <div class="recommendation-item">
                <div class="recommendation-priority ${priorityClass}">${priorityIcon}</div>
                <div class="recommendation-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.desc}</p>
                </div>
            </div>
        `;
    },
    
    // ============================================
    // 案例列表组件
    // ============================================
    CaseList: (cases) => {
        if (!cases || cases.length === 0) return '<p class="text-muted">暂无相关案例</p>';
        
        return cases.map(c => `
            <div class="case-item">
                <span class="case-name">${c.name}</span>
                <span class="case-year">${c.year}</span>
                ${c.lesson ? `<div class="case-lesson">${c.lesson}</div>` : ''}
            </div>
        `).join('');
    },
    
    // ============================================
    // 模态框组件
    // ============================================
    Modal: {
        show: (title, content, onClose = null) => {
            const modal = document.getElementById('modal');
            const modalTitle = document.getElementById('modalTitle');
            const modalBody = document.getElementById('modalBody');
            
            modalTitle.textContent = title;
            modalBody.innerHTML = content;
            modal.classList.add('show');
            
            if (onClose) {
                modal.dataset.onClose = onClose;
            }
        },
        
        close: () => {
            const modal = document.getElementById('modal');
            modal.classList.remove('show');
        }
    },
    
    // ============================================
    // 模式详情弹窗
    // ============================================
    showPatternDetail: (patternId) => {
        const pattern = StartupAdvisorData.failureMatrix.patterns.find(p => p.id === patternId);
        if (!pattern) return;
        
        const categoryInfo = StartupAdvisorData.failureMatrix.categories[pattern.category];
        const stageInfo = StartupAdvisorData.failureMatrix.stages[pattern.stage];
        const riskInfo = StartupAdvisorData.failureMatrix.riskLevels[pattern.risk];
        
        const content = `
            <div class="modal-detail">
                <div class="detail-header">
                    <span class="badge" style="background: ${categoryInfo?.color}20; color: ${categoryInfo?.color}">
                        ${categoryInfo?.icon || ''} ${categoryInfo?.name}
                    </span>
                    <span class="badge" style="background: ${riskInfo?.color}20; color: ${riskInfo?.color}">
                        风险: ${riskInfo?.name}
                    </span>
                </div>
                
                <h3 style="margin: 15px 0 10px;">${pattern.title}</h3>
                <p class="text-muted">${pattern.description}</p>
                
                <div class="detail-section">
                    <h4>📋 基础信息</h4>
                    <ul>
                        <li><strong>阶段:</strong> ${stageInfo?.name || pattern.stage}</li>
                        <li><strong>发生频率:</strong> ${pattern.frequency}</li>
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h4>🛡️ 预防措施</h4>
                    <p>${pattern.prevention}</p>
                </div>
                
                <div class="detail-section">
                    <h4>📚 相关案例 (${pattern.cases.length})</h4>
                    ${Components.CaseList(pattern.cases)}
                </div>
            </div>
        `;
        
        Components.Modal.show(pattern.title, content);
    },
    
    // ============================================
    // 筛选切换
    // ============================================
    toggleFilter: (btn, value) => {
        btn.classList.toggle('active');
        // 触发自定义事件，供具体页面处理
        window.dispatchEvent(new CustomEvent('filterChange', { detail: { value, active: btn.classList.contains('active') } }));
    },
    
    // ============================================
    // 标签页切换
    // ============================================
    switchTab: (tabId, triggerEl = null) => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        if (triggerEl) {
            triggerEl.classList.add('active');
        } else {
            const tab = document.querySelector(`.tab[onclick*="${tabId}"]`);
            if (tab) tab.classList.add('active');
        }
        
        const content = document.getElementById(tabId);
        if (content) content.classList.add('active');
    }
};

// ============================================
// Skill 通信 API
// ============================================
const SkillAPI = {
    // 消息类型
    MessageTypes: {
        READY: 'skill:ready',
        DATA_REQUEST: 'skill:data:request',
        DATA_RESPONSE: 'skill:data:response',
        NAVIGATE: 'skill:navigate',
        ANALYZE: 'skill:analyze',
        RESULT: 'skill:result',
        ERROR: 'skill:error'
    },
    
    // 当前工具名称
    toolName: 'visualization',
    
    // 初始化
    init: function() {
        // 监听来自父窗口的消息
        window.addEventListener('message', this.handleMessage.bind(this));
        
        // 通知父窗口已就绪
        this.sendMessage(this.MessageTypes.READY, {
            tool: this.toolName,
            version: StartupAdvisorData.VERSION,
            capabilities: ['matrix', 'decision', 'assessment', 'export']
        });
        
        console.log('[SkillAPI] 初始化完成，等待父窗口消息...');
    },
    
    // 发送消息到父窗口
    sendMessage: function(type, data = {}) {
        if (window.parent !== window) {
            window.parent.postMessage({
                source: 'startup-advisor-visualization',
                type,
                data,
                timestamp: Date.now()
            }, '*');
        }
    },
    
    // 处理收到的消息
    handleMessage: function(event) {
        const message = event.data;
        
        // 忽略非 Skill 消息
        if (!message || message.source !== 'startup-advisor-skill') {
            return;
        }
        
        const { type, data } = message;
        console.log('[SkillAPI] 收到消息:', type, data);
        
        switch (type) {
            case this.MessageTypes.DATA_REQUEST:
                this.handleDataRequest(data);
                break;
                
            case this.MessageTypes.NAVIGATE:
                this.handleNavigate(data);
                break;
                
            case this.MessageTypes.ANALYZE:
                this.handleAnalyze(data);
                break;
                
            default:
                console.warn('[SkillAPI] 未知消息类型:', type);
        }
    },
    
    // 处理数据请求
    handleDataRequest: function(data) {
        const { requestId, query } = data;
        
        try {
            let result;
            
            switch (query) {
                case 'patterns':
                    result = StartupAdvisorData.failureMatrix.patterns;
                    break;
                    
                case 'categories':
                    result = StartupAdvisorData.failureMatrix.categories;
                    break;
                    
                case 'risks':
                    result = StartupAdvisorData.riskAssessment;
                    break;
                    
                case 'all':
                    result = StartupAdvisorData;
                    break;
                    
                default:
                    result = { error: '未知查询类型' };
            }
            
            this.sendMessage(this.MessageTypes.DATA_RESPONSE, {
                requestId,
                success: true,
                data: result
            });
            
        } catch (error) {
            this.sendMessage(this.MessageTypes.DATA_RESPONSE, {
                requestId,
                success: false,
                error: error.message
            });
        }
    },
    
    // 处理导航请求
    handleNavigate: function(data) {
        const { page, params } = data;
        
        // 导航到指定页面
        if (page === 'matrix') {
            Components.switchTab('matrixTab');
        } else if (page === 'decision') {
            Components.switchTab('decisionTab');
        } else if (page === 'assessment') {
            Components.switchTab('assessmentTab');
        }
        
        this.sendMessage(this.MessageTypes.RESULT, {
            action: 'navigate',
            page,
            success: true
        });
    },
    
    // 处理分析请求
    handleAnalyze: function(data) {
        const { requestId, type, params } = data;
        
        try {
            let result;
            
            switch (type) {
                case 'match':
                    // 模�匹配分析
                    result = this.analyzePatternMatch(params);
                    break;
                    
                case 'assess':
                    // 风险评估
                    result = this.analyzeRisk(params);
                    break;
                    
                default:
                    result = { error: '未知分析类型' };
            }
            
            this.sendMessage(this.MessageTypes.RESULT, {
                requestId,
                type,
                success: true,
                data: result
            });
            
        } catch (error) {
            this.sendMessage(this.MessageTypes.ERROR, {
                requestId,
                error: error.message
            });
        }
    },
    
    // 模式匹配分析
    analyzePatternMatch: function(params) {
        const { industry, stage } = params;
        const industryMap = StartupAdvisorData.industryMapping;
        const patterns = StartupAdvisorData.failureMatrix.patterns;
        
        // 匹配逻辑
        const matches = patterns.filter(p => {
            let score = 0;
            
            // 行业匹配
            if (industry && industryMap[industry]?.categories.includes(p.category)) {
                score += 30;
            }
            
            // 阶段匹配
            if (stage && p.stage === stage) {
                score += 40;
            }
            
            // 风险权重
            if (p.risk === 'critical') score += 20;
            if (p.risk === 'high') score += 15;
            
            return score > 50;
        });
        
        return {
            matches: matches.slice(0, 5).map(p => ({
                id: p.id,
                title: p.title,
                score: Math.min(score, 100),
                risk: p.risk,
                category: p.category
            })),
            total: matches.length
        };
    },
    
    // 风险评估
    analyzeRisk: function(params) {
        const { answers, weights } = params;
        const categories = StartupAdvisorData.riskAssessment.categories;
        
        const categoryScores = {};
        let overallScore = 0;
        let count = 0;
        
        categories.forEach(cat => {
            const catAnswers = Object.keys(answers)
                .filter(k => k.startsWith(cat.id + '-'))
                .map(k => answers[k]);
            
            if (catAnswers.length > 0) {
                const avg = catAnswers.reduce((a, b) => a + b, 0) / catAnswers.length;
                categoryScores[cat.id] = avg * (weights?.[cat.id] || cat.weight || 1);
                overallScore += categoryScores[cat.id];
                count++;
            }
        });
        
        return {
            overall: count > 0 ? overallScore / count : 0,
            categories: categoryScores,
            recommendations: this.generateRecommendations(categoryScores)
        };
    },
    
    // 生成建议
    generateRecommendations: function(categoryScores) {
        const recs = [];
        
        Object.entries(categoryScores).forEach(([catId, score]) => {
            if (score > 3) {
                const rules = StartupAdvisorData.riskAssessment.recommendations[catId] || [];
                rules.forEach(rule => {
                    if (score > rule.threshold) {
                        recs.push({ ...rule, category: catId, priority: 'high' });
                    }
                });
            }
        });
        
        return recs.sort((a, b) => (a.priority === 'high' ? -1 : 1)).slice(0, 5);
    },
    
    // 导出数据
    exportData: function(format = 'json') {
        if (format === 'json') {
            return JSON.stringify(StartupAdvisorData, null, 2);
        } else if (format === 'csv') {
            // 简化的 CSV 导出
            const headers = ['ID', 'Category', 'Stage', 'Risk', 'Title', 'Description'];
            const rows = StartupAdvisorData.failureMatrix.patterns.map(p => 
                [p.id, p.category, p.stage, p.risk, p.title, p.description]
            );
            return [headers, ...rows].map(r => r.join(',')).join('\n');
        }
        return '';
    }
};

// ============================================
// 工具函数
// ============================================
const Utils = {
    // 防抖
    debounce: function(fn, delay = 300) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    },
    
    // 节流
    throttle: function(fn, delay = 300) {
        let last;
        return function(...args) {
            const now = Date.now();
            if (!last || now - last >= delay) {
                last = now;
                fn.apply(this, args);
            }
        };
    },
    
    // 深拷贝
    deepClone: function(obj) {
        return JSON.parse(JSON.stringify(obj));
    },
    
    // 格式化日期
    formatDate: function(date = new Date()) {
        return date.toISOString().split('T')[0];
    }
};
