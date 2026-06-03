/**
 * Startup-Advisor 共享数据结构
 * 版本: 1.0.0
 * 更新: 2026-06-03
 * 
 * 包含: 失败模式矩阵、决策树数据、风险评估配置
 */

const StartupAdvisorData = {
    // ============================================
    // 版本信息
    // ============================================
    VERSION: '1.0.0',
    UPDATED: '2026-06-03',
    
    // ============================================
    // 失败模式矩阵数据
    // ============================================
    failureMatrix: {
        // 类别定义
        categories: {
            market: { name: '市场', nameEn: 'Market', icon: '📊', color: '#e94560' },
            product: { name: '产品', nameEn: 'Product', icon: '💡', color: '#3498db' },
            team: { name: '团队', nameEn: 'Team', icon: '👥', color: '#2ecc71' },
            operation: { name: '运营', nameEn: 'Operation', icon: '⚙️', color: '#f39c12' },
            financing: { name: '融资', nameEn: 'Financing', icon: '💰', color: '#9b59b6' }
        },
        
        // 阶段定义
        stages: {
            concept: { name: '概念期', nameEn: 'Concept', order: 1 },
            mvp: { name: 'MVP期', nameEn: 'MVP', order: 2 },
            growth: { name: '成长期', nameEn: 'Growth', order: 3 },
            scale: { name: '规模化期', nameEn: 'Scale', order: 4 }
        },
        
        // 风险等级
        riskLevels: {
            critical: { name: '极高', score: 5, color: '#e94560' },
            high: { name: '高', score: 4, color: '#f39c12' },
            medium: { name: '中', score: 3, color: '#3498db' },
            low: { name: '低', score: 2, color: '#2ecc71' }
        },
        
        // 矩阵数据 (24种失败模式)
        patterns: [
            // 市场类
            {
                id: 'market-1',
                category: 'market',
                stage: 'concept',
                risk: 'critical',
                title: '伪需求',
                titleEn: 'False Demand',
                description: '产品解决的问题并非用户真实痛点',
                frequency: '高发',
                prevention: '100+用户访谈后再开发MVP',
                cases: [
                    { name: 'Juicero', year: 2017, lesson: '用塑料袋测试用户意愿' }
                ]
            },
            {
                id: 'market-2',
                category: 'market',
                stage: 'concept',
                risk: 'high',
                title: '市场时机错误',
                titleEn: 'Wrong Timing',
                description: '进入市场太早或太晚',
                frequency: '高发',
                prevention: '监控技术成熟度和市场接受度',
                cases: [
                    { name: 'Quibi', year: 2020, lesson: '疫情改变了用户习惯' }
                ]
            },
            {
                id: 'market-3',
                category: 'market',
                stage: 'mvp',
                risk: 'high',
                title: '竞争认知偏差',
                titleEn: 'Competitive Blindness',
                description: '低估竞争对手或进入红海市场',
                frequency: '常见',
                prevention: '差异化分析，SWOT分析',
                cases: [
                    { name: 'Vine', year: 2017, lesson: '忽视Instagram竞争' }
                ]
            },
            {
                id: 'market-4',
                category: 'market',
                stage: 'growth',
                risk: 'critical',
                title: '市场容量误判',
                titleEn: 'TAM Overestimation',
                description: '目标市场比预期小得多',
                frequency: '高发',
                prevention: 'Bottom-up市场分析',
                cases: [
                    { name: 'Color Labs', year: 2012, lesson: '照片社交市场细分错误' }
                ]
            },
            // 产品类
            {
                id: 'product-1',
                category: 'product',
                stage: 'mvp',
                risk: 'critical',
                title: '产品市场不匹配',
                titleEn: 'Poor PMF',
                description: '产品无法满足市场需求',
                frequency: '极高',
                prevention: '持续用户反馈迭代',
                cases: [
                    { name: 'Yik Yak', year: 2017, lesson: '匿名性导致滥用' }
                ]
            },
            {
                id: 'product-2',
                category: 'product',
                stage: 'growth',
                risk: 'high',
                title: '技术债务累积',
                titleEn: 'Technical Debt',
                description: '代码质量差，迭代速度下降',
                frequency: '常见',
                prevention: '定期重构，架构评审',
                cases: [
                    { name: 'Secret', year: 2015, lesson: '技术债拖累产品迭代' }
                ]
            },
            {
                id: 'product-3',
                category: 'product',
                stage: 'scale',
                risk: 'medium',
                title: '规模化体验下降',
                titleEn: 'Quality Decay',
                description: '用户增长导致体验变差',
                frequency: '中等',
                prevention: '自动化测试，灰度发布',
                cases: []
            },
            // 团队类
            {
                id: 'team-1',
                category: 'team',
                stage: 'concept',
                risk: 'critical',
                title: '创始人冲突',
                titleEn: 'Founder Conflict',
                description: '联合创始人之间的严重分歧',
                frequency: '常见',
                prevention: '早期明确股权和决策机制',
                cases: [
                    { name: 'Vine', year: 2017, lesson: '创始人被迫离开' }
                ]
            },
            {
                id: 'team-2',
                category: 'team',
                stage: 'growth',
                risk: 'high',
                title: '关键人员�失',
                titleEn: 'Key Person Risk',
                description: '核心员工或高管离职',
                frequency: '常见',
                prevention: '股权激励，文化建设',
                cases: []
            },
            {
                id: 'team-3',
                category: 'team',
                stage: 'scale',
                risk: 'medium',
                title: '过度招聘',
                titleEn: 'Over-hiring',
                description: '快速扩张导致效率下降',
                frequency: '常见',
                prevention: '渐进式招聘，控制比例',
                cases: [
                    { name: 'WeWork', year: 2019, lesson: '人员增长超过业务' }
                ]
            },
            // 运营类
            {
                id: 'operation-1',
                category: 'operation',
                stage: 'growth',
                risk: 'critical',
                title: '单位经济失控',
                titleEn: 'Unit Economics Failure',
                description: 'CAC > LTV或回收期过长',
                frequency: '高发',
                prevention: '严控获客成本',
                cases: [
                    { name: 'Pets.com', year: 2000, lesson: '物流成本吃掉利润' }
                ]
            },
            {
                id: 'operation-2',
                category: 'operation',
                stage: 'scale',
                risk: 'critical',
                title: '供应链失控',
                titleEn: 'Supply Chain Failure',
                description: '供应链断裂或成本激增',
                frequency: '常见',
                prevention: '供应商多元化',
                cases: [
                    { name: 'Jawbone', year: 2017, lesson: '单一供应商风险' }
                ]
            },
            {
                id: 'operation-3',
                category: 'operation',
                stage: 'growth',
                risk: 'high',
                title: '扩张过快',
                titleEn: 'Premature Scaling',
                description: '在验证前大规模扩张',
                frequency: '高发',
                prevention: '先在小市场验证',
                cases: [
                    { name: 'Webvan', year: 2001, lesson: '未验证模式就全国扩张' }
                ]
            },
            // 融资类
            {
                id: 'financing-1',
                category: 'financing',
                stage: 'concept',
                risk: 'high',
                title: '估值泡沫',
                titleEn: 'Valuation Bubble',
                description: '估值远超业务价值',
                frequency: '常见',
                prevention: '理性估值，合适条款',
                cases: [
                    { name: 'WeWork', year: 2019, lesson: '$47B估值无支撑' }
                ]
            },
            {
                id: 'financing-2',
                category: 'financing',
                stage: 'growth',
                risk: 'critical',
                title: '资金耗尽',
                titleEn: 'Runway Exhausted',
                description: '资金耗尽前未融到下一轮',
                frequency: '极高',
                prevention: '保持18+个月runway',
                cases: [
                    { name: 'Pebble', year: 2016, lesson: 'Kickstarter后资金断裂' }
                ]
            },
            {
                id: 'financing-3',
                category: 'financing',
                stage: 'scale',
                risk: 'medium',
                title: '投资人关系管理失败',
                titleEn: 'Investor Mismanagement',
                description: '与投资人关系恶化',
                frequency: '中等',
                prevention: '定期沟通，透明汇报',
                cases: []
            }
        ]
    },
    
    // ============================================
    // 决策树数据
    // ============================================
    decisionTree: {
        // 决策节点
        nodes: [
            {
                id: 'q1',
                question: '是否解决了真实问题？',
                hint: '用户是否真的需要这个解决方案？',
                yes: 'q2',
                no: 'fail-pseudo',
                type: 'critical'
            },
            {
                id: 'q2',
                question: '市场规模是否足够？',
                hint: 'TAM/SAM/SOM分析完成了吗？',
                yes: 'q3',
                no: 'fail-tam',
                type: 'high'
            },
            {
                id: 'q3',
                question: '是否找到了 PMF？',
                hint: '用户留存和NPS是否达标？',
                yes: 'q4',
                no: 'fail-pmf',
                type: 'critical'
            },
            {
                id: 'q4',
                question: '单位经济模型是否健康？',
                hint: 'LTV/CAC > 3，回收期 < 12个月',
                yes: 'q5',
                no: 'fail-unit',
                type: 'high'
            },
            {
                id: 'q5',
                question: '团队能力是否互补？',
                hint: '技术+商业+运营是否兼备？',
                yes: 'q6',
                no: 'fail-team',
                type: 'high'
            },
            {
                id: 'q6',
                question: '是否保持足够 runway？',
                hint: '资金能支撑18+个月吗？',
                yes: 'success',
                no: 'fail-runway',
                type: 'critical'
            }
        ],
        
        // 失败节点
        failureNodes: {
            'fail-pseudo': {
                title: '伪需求风险',
                icon: '⚠️',
                description: '你的项目可能解决了不存在的问题',
                recommendations: [
                    '进行100+用户访谈',
                    '用MVP验证核心假设',
                    '寻找付费用户信号'
                ],
                relatedPatterns: ['market-1', 'product-1']
            },
            'fail-tam': {
                title: '市场容量风险',
                icon: '📉',
                description: '目标市场可能比预期小',
                recommendations: [
                    'Bottom-up市场分析',
                    '验证细分市场可触达性',
                    '考虑市场扩张路径'
                ],
                relatedPatterns: ['market-4']
            },
            'fail-pmf': {
                title: '产品市场不匹配',
                icon: '💔',
                description: '产品尚未达到PMF',
                recommendations: [
                    '聚焦核心用户群体',
                    '加速产品迭代',
                    '提升激活率和留存'
                ],
                relatedPatterns: ['product-1']
            },
            'fail-unit': {
                title: '单位经济风险',
                icon: '💸',
                description: '单位经济模型不健康',
                recommendations: [
                    '降低CAC',
                    '提升LTV',
                    '优化产品定价'
                ],
                relatedPatterns: ['operation-1']
            },
            'fail-team': {
                title: '团队能力风险',
                icon: '👥',
                description: '团队能力存在短板',
                recommendations: [
                    '识别能力缺口',
                    '招聘关键人才',
                    '考虑创始人能力提升'
                ],
                relatedPatterns: ['team-1', 'team-2']
            },
            'fail-runway': {
                title: '资金风险',
                icon: '⏰',
                description: 'Runway 不足',
                recommendations: [
                    '立即启动融资',
                    '控制burn rate',
                    '考虑战略融资'
                ],
                relatedPatterns: ['financing-2']
            }
        },
        
        // 成功节点
        successNode: {
            title: '✅ 项目健康',
            icon: '🎉',
            description: '你的项目在核心维度表现良好',
            nextSteps: [
                '关注规模化挑战',
                '建立竞争壁垒',
                '持续监控关键指标'
            ]
        }
    },
    
    // ============================================
    // 风险评估配置
    // ============================================
    riskAssessment: {
        // 风险维度
        categories: [
            {
                id: 'market',
                name: '市场风险',
                icon: '📊',
                weight: 1.2,
                questions: [
                    { id: 'market-1', text: '目标市场规模(TAM)是否明确？', threshold: 3 },
                    { id: 'market-2', text: '是否进行了用户验证？', threshold: 3 },
                    { id: 'market-3', text: '竞争格局是否清晰？', threshold: 3 }
                ]
            },
            {
                id: 'product',
                name: '产品风险',
                icon: '💡',
                weight: 1.0,
                questions: [
                    { id: 'product-1', text: '是否达到PMF？', threshold: 3 },
                    { id: 'product-2', text: '产品差异化是否明显？', threshold: 3 },
                    { id: 'product-3', text: '技术债务是否可控？', threshold: 2 }
                ]
            },
            {
                id: 'team',
                name: '团队风险',
                icon: '👥',
                weight: 1.1,
                questions: [
                    { id: 'team-1', text: '创始团队是否互补？', threshold: 3 },
                    { id: 'team-2', text: '关键岗位是否有备份？', threshold: 2 },
                    { id: 'team-3', text: '股权分配是否合理？', threshold: 3 }
                ]
            },
            {
                id: 'operation',
                name: '运营风险',
                icon: '⚙️',
                weight: 1.0,
                questions: [
                    { id: 'operation-1', text: '单位经济模型是否健康？', threshold: 3 },
                    { id: 'operation-2', text: '获客渠道是否稳定？', threshold: 2 },
                    { id: 'operation-3', text: '运营效率如何？', threshold: 2 }
                ]
            },
            {
                id: 'financing',
                name: '融资风险',
                icon: '💰',
                weight: 1.3,
                questions: [
                    { id: 'financing-1', text: 'Runway是否超过18个月？', threshold: 3 },
                    { id: 'financing-2', text: '投资人关系是否良好？', threshold: 2 },
                    { id: 'financing-3', text: '估值是否合理？', threshold: 2 }
                ]
            }
        ],
        
        // 评分选项
        ratingOptions: [
            { value: 1, label: '极低', desc: '完全没有', color: '#2ecc71' },
            { value: 2, label: '较低', desc: '有一些', color: '#27ae60' },
            { value: 3, label: '中等', desc: '基本具备', color: '#f1c40f' },
            { value: 4, label: '较高', desc: '大部分具备', color: '#e67e22' },
            { value: 5, label: '极高', desc: '完全具备/非常严重', color: '#e74c3c' }
        ],
        
        // 建议规则 (基于评分阈值)
        recommendations: {
            market: [
                { threshold: 3, priority: 'high', title: '市场验证优先', desc: '立即进行用户访谈和市场调研' },
                { threshold: 2, priority: 'medium', title: '关注竞争动态', desc: '建立竞品监控系统' }
            ],
            product: [
                { threshold: 3, priority: 'high', title: '加速PMF验证', desc: '聚焦核心功能，提升用户留存' },
                { threshold: 2, priority: 'medium', title: '技术债务清理', desc: '安排专门时间重构关键模块' }
            ],
            team: [
                { threshold: 3, priority: 'high', title: '补齐能力短板', desc: '招聘或顾问弥补团队缺口' },
                { threshold: 2, priority: 'medium', title: '股权结构优化', desc: '确保长期激励到位' }
            ],
            operation: [
                { threshold: 3, priority: 'high', title: '单位经济优化', desc: '降低CAC，提升LTV' },
                { threshold: 2, priority: 'medium', title: '运营效率提升', desc: '自动化重复工作' }
            ],
            financing: [
                { threshold: 3, priority: 'high', title: '融资准备', desc: '立即启动下轮融资' },
                { threshold: 2, priority: 'medium', title: '成本控制', desc: '延长runway' }
            ]
        },
        
        // 评分区间定义
        scoreRanges: [
            { max: 2, label: '低风险', status: 'success', color: '#2ecc71' },
            { max: 3.5, label: '中等风险', status: 'warning', color: '#f39c12' },
            { max: 5, label: '高风险', status: 'danger', color: '#e74c3c' }
        ]
    },
    
    // ============================================
    // 行业映射配置
    // ============================================
    industryMapping: {
        saas: { categories: ['market', 'product'], keywords: ['订阅', 'SaaS', 'B2B'] },
        ecommerce: { categories: ['market', 'operation'], keywords: ['电商', '零售', ' marketplace'] },
        consumer: { categories: ['product', 'operation'], keywords: ['消费', 'C端', '社交'] },
        hardware: { categories: ['market', 'team'], keywords: ['硬件', 'IoT', '设备'] },
        healthcare: { categories: ['market', 'team'], keywords: ['医疗', '健康', ' biotech'] },
        fintech: { categories: ['market', 'team'], keywords: ['金融', '支付', '保险'] },
        sharing: { categories: ['market', 'operation'], keywords: ['共享', '平台', '零工'] }
    },
    
    // ============================================
    // 轮次映射配置
    // ============================================
    stageMapping: {
        concept: ['pre-seed', 'concept'],
        mvp: ['seed', 'angel'],
        growth: ['series-a', 'series-b'],
        scale: ['series-c', 'pre-ipo']
    }
};

// 导出供模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StartupAdvisorData;
}
