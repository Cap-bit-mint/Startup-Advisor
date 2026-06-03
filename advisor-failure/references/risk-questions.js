/**
 * 量化风险评估问题库
 * 版本: 1.0.0
 * 更新: 2026-06-04
 * 
 * 每个问题都包含详细的量化选项描述
 */

const RiskQuestions = {
    // 版本信息
    VERSION: '1.0.0',
    UPDATED: '2026-06-04',
    
    // 评分选项模板（通用）
    ratingOptions: [
        { value: 1, label: '极低', color: '#2ecc71', description: '几乎无风险，指标优秀' },
        { value: 2, label: '较低', color: '#27ae60', description: '风险可控，指标良好' },
        { value: 3, label: '中等', color: '#f1c40f', description: '存在风险，需要关注' },
        { value: 4, label: '较高', color: '#e67e22', description: '风险较高，需立即行动' },
        { value: 5, label: '极高', color: '#e74c3c', description: '风险严重，止损优先' }
    ],
    
    // 维度定义
    categories: [
        {
            id: 'market',
            name: '市场风险',
            icon: '📊',
            weight: 1.2,
            questions: []
        },
        {
            id: 'product',
            name: '产品风险',
            icon: '💡',
            weight: 1.0,
            questions: []
        },
        {
            id: 'team',
            name: '团队风险',
            icon: '👥',
            weight: 1.1,
            questions: []
        },
        {
            id: 'operation',
            name: '运营风险',
            icon: '⚙️',
            weight: 1.0,
            questions: []
        },
        {
            id: 'financing',
            name: '资金风险',
            icon: '💰',
            weight: 1.3,
            questions: []
        }
    ],
    
    // 问题库（带详细量化选项）
    questions: [
        // ==================== 市场风险 ====================
        {
            id: 'market-1',
            category: 'market',
            text: '目标市场规模(TAM)是否明确？',
            hint: '评估你对目标市场的了解和量化程度',
            options: [
                { value: 1, label: 'TAM已验证', description: 'TAM > $1B，且SAM > $100M，有明确的客户画像和可触达渠道' },
                { value: 2, label: 'TAM已估算', description: 'TAM $100M-$1B，SAM $10M-$100M，估算有数据支撑' },
                { value: 3, label: 'TAM待验证', description: 'TAM存在但未量化，或估算基于假设需要验证' },
                { value: 4, label: 'TAM模糊', description: '仅知道大概方向，缺乏具体数据支撑' },
                { value: 5, label: 'TAM未定义', description: '完全未考虑市场规模，或目标市场不清晰' }
            ]
        },
        {
            id: 'market-2',
            category: 'market',
            text: '是否进行了用户验证？',
            hint: '评估用户验证的深度和广度',
            options: [
                { value: 1, label: '充分验证', description: '已对≥100名目标用户完成深度访谈，70%以上表示愿意付费' },
                { value: 2, label: '基本验证', description: '已验证20-99名用户，反馈基本积极，有付费意向数据' },
                { value: 3, label: '部分验证', description: '已验证5-19名用户，反馈存在分歧，需要进一步确认' },
                { value: 4, label: '初步验证', description: '仅验证2-4名用户，�仅为内部测试反馈' },
                { value: 5, label: '未验证', description: '未做任何用户验证，仅凭假设或直觉' }
            ]
        },
        {
            id: 'market-3',
            category: 'market',
            text: '竞争格局是否清晰？',
            hint: '评估对市场竞争的了解程度',
            options: [
                { value: 1, label: '完全了解', description: '已完成竞品分析，了解所有主要玩家，能清晰描述差异化' },
                { value: 2, label: '基本了解', description: '知道3-5个主要竞品，了解其优劣势' },
                { value: 3, label: '部分了解', description: '知道主要竞品，但了解不深入，差异化不明确' },
                { value: 4, label: '了解有限', description: '仅知道1-2个竞品，或对市场玩家了解不全' },
                { value: 5, label: '不了解', description: '不知道主要竞争对手，或认为"没有竞品"' }
            ]
        },
        {
            id: 'market-4',
            category: 'market',
            text: '市场时机是否合适？',
            hint: '评估进入市场的时机',
            options: [
                { value: 1, label: '时机成熟', description: '目标用户已有明确需求，技术成熟，监管明确' },
                { value: 2, label: '时机合适', description: '基本条件具备，仅需轻度市场教育' },
                { value: 3, label: '时机一般', description: '需要一定市场教育，但用户已有认知' },
                { value: 4, label: '时机较早', description: '市场尚未成熟，需要大量教育投入' },
                { value: 5, label: '时机错误', description: '市场未形成，或已过最佳窗口期' }
            ]
        },
        
        // ==================== 产品风险 ====================
        {
            id: 'product-1',
            category: 'product',
            text: '是否达到PMF（产品市场契合）？',
            hint: '评估产品与市场的匹配程度',
            options: [
                { value: 1, label: 'PMF已达成', description: 'NPS ≥ 50，40%以上用户表示"如果没有产品会很失望"，自然增长 > 30%' },
                { value: 2, label: 'PMF基本达成', description: 'NPS 30-50，20-40%用户表示失望，自然增长 > 15%' },
                { value: 3, label: 'PMF待确认', description: 'NPS 10-30，部分用户认可但不够强烈，需继续迭代' },
                { value: 4, label: 'PMF不明显', description: 'NPS < 10，用户反馈一般，留存不稳定' },
                { value: 5, label: '无PMF', description: '用户留存差，反馈负面，未解决核心问题' }
            ]
        },
        {
            id: 'product-2',
            category: 'product',
            text: '产品差异化是否明显？',
            hint: '评估产品的独特价值',
            options: [
                { value: 1, label: '差异化强', description: '用户能清晰说出"不同于X，我们的特点是Y"，竞品难以复制' },
                { value: 2, label: '差异化明确', description: '有清晰的价值主张，用户能感知差异化' },
                { value: 3, label: '差异化一般', description: '有差异化但不明显，或难以被用户感知' },
                { value: 4, label: '差异化弱', description: '与竞品高度相似，用户难以区分' },
                { value: 5, label: '无差异化', description: '"Copy to China"或直接复制竞品，无独特价值' }
            ]
        },
        {
            id: 'product-3',
            category: 'product',
            text: '技术债务是否可控？',
            hint: '评估技术负债水平',
            options: [
                { value: 1, label: '债务极低', description: '代码规范，有自动化测试，技术文档完整' },
                { value: 2, label: '债务可控', description: '少量技术债务，不影响迭代速度' },
                { value: 3, label: '债务中等', description: '存在技术债务，需要专门时间处理' },
                { value: 4, label: '债务较高', description: '技术债务影响开发效率，需要紧急处理' },
                { value: 5, label: '债务严重', description: '代码难以维护，Bug频发，严重阻碍产品迭代' }
            ]
        },
        {
            id: 'product-4',
            category: 'product',
            text: '产品用户体验是否良好？',
            hint: '评估用户使用产品的难易程度',
            options: [
                { value: 1, label: '体验优秀', description: '用户能轻松完成任务，新用户激活率 > 70%' },
                { value: 2, label: '体验良好', description: '核心流程顺畅，激活率 50-70%' },
                { value: 3, label: '体验一般', description: '能完成任务但有卡点，激活率 30-50%' },
                { value: 4, label: '体验较差', description: '需要帮助文档或指导，激活率 10-30%' },
                { value: 5, label: '体验很差', description: '用户难以完成基本操作，激活率 < 10%' }
            ]
        },
        
        // ==================== 团队风险 ====================
        {
            id: 'team-1',
            category: 'team',
            text: '创始团队是否互补？',
            hint: '评估团队能力的多样性',
            options: [
                { value: 1, label: '能力互补', description: '技术+商业+运营能力兼备，职责清晰，无明显短板' },
                { value: 2, label: '基本互补', description: '主要能力具备，有1-2个薄弱环节但可弥补' },
                { value: 3, label: '部分互补', description: '能力有一定互补但不够完整' },
                { value: 4, label: '互补不足', description: '能力有重叠但关键能力缺失' },
                { value: 5, label: '能力单一', description: '团队能力单一，如全是技术背景无商业能力' }
            ]
        },
        {
            id: 'team-2',
            category: 'team',
            text: '关键岗位是否有备份？',
            hint: '评估团队的人才储备',
            options: [
                { value: 1, label: '有完整备份', description: '所有关键岗位有备份人员，知识已文档化' },
                { value: 2, label: '有基本备份', description: '核心岗位有备份，关键知识有记录' },
                { value: 3, label: '部分备份', description: '部分岗位有备份，但知识集中在少数人' },
                { value: 4, label: '备份不足', description: '仅1-2个岗位有备份' },
                { value: 5, label: '无备份', description: '关键岗位无任何备份，任何人离职都是危机' }
            ]
        },
        {
            id: 'team-3',
            category: 'team',
            text: '股权分配是否合理？',
            hint: '评估股权分配的公平性和稳定性',
            options: [
                { value: 1, label: '分配清晰', description: '有明确协议，股权与贡献匹配，有4年vesting' },
                { value: 2, label: '基本合理', description: '分配方案基本合理，协议明确' },
                { value: 3, label: '存在隐患', description: '分配不够均衡，或存在未解决的争议点' },
                { value: 4, label: '分配不均', description: '明显不公，�能导致未来纠纷' },
                { value: 5, label: '严重问题', description: '无协议，或分配方案埋下严重隐患' }
            ]
        },
        {
            id: 'team-4',
            category: 'team',
            text: '团队稳定性如何？',
            hint: '评估团队成员的留存情况',
            options: [
                { value: 1, label: '高度稳定', description: '核心成员稳定，平均司龄 > 2年' },
                { value: 2, label: '基本稳定', description: '核心成�稳定，仅有个别流动' },
                { value: 3, label: '稳定性一般', description: '有一定流动，但不影响业务' },
                { value: 4, label: '稳定性较差', description: '频繁有人离职，或有核心成员不稳定' },
                { value: 5, label: '严重不稳', description: '核心成员有离职意向，或已有离职' }
            ]
        },
        
        // ==================== 运营风险 ====================
        {
            id: 'operation-1',
            category: 'operation',
            text: '单位经济模型(LTV/CAC)是否健康？',
            hint: '评估客户获取和留存的经济效益',
            options: [
                { value: 1, label: '模型健康', description: 'LTV/CAC > 5，回收期 < 6个月' },
                { value: 2, label: '模型良好', description: 'LTV/CAC 3-5，回收期 6-12个月' },
                { value: 3, label: '模型一般', description: 'LTV/CAC 1.5-3，回收期 12-18个月' },
                { value: 4, label: '模型较差', description: 'LTV/CAC 1-1.5，回收期 18-24个月' },
                { value: 5, label: '模型不可行', description: 'LTV/CAC < 1，回收期 > 24个月' }
            ]
        },
        {
            id: 'operation-2',
            category: 'operation',
            text: '获客渠道是否稳定？',
            hint: '评估获取新客户的渠道可靠性',
            options: [
                { value: 1, label: '渠道稳定', description: '有3+条稳定获客渠道，可持续规模化' },
                { value: 2, label: '渠道良好', description: '有2条稳定渠道，可小规模复制' },
                { value: 3, label: '渠道一般', description: '有1条验证渠道，但规模化受限' },
                { value: 4, label: '渠道不稳定', description: '获客依赖单一渠道，且不稳定' },
                { value: 5, label: '无稳定渠道', description: '不知道用户从哪来，或获客完全靠烧钱' }
            ]
        },
        {
            id: 'operation-3',
            category: 'operation',
            text: '运营效率如何？',
            hint: '评估团队和资源的利用效率',
            options: [
                { value: 1, label: '效率极高', description: '人效 > $100K/年，毛利率 > 70%，流程自动化程度高' },
                { value: 2, label: '效率良好', description: '人效 $50K-$100K，毛利率 50-70%' },
                { value: 3, label: '效率一般', description: '人效 $20K-$50K，毛利率 30-50%' },
                { value: 4, label: '效率较低', description: '人效 $10K-$20K，毛利率 < 30%' },
                { value: 5, label: '效率极低', description: '人效 < $10K，严重亏损，流程混乱' }
            ]
        },
        {
            id: 'operation-4',
            category: 'operation',
            text: '用户留存率如何？',
            hint: '评估用户粘性和产品价值',
            options: [
                { value: 1, label: '留存优秀', description: '月流失率 < 3%，核心用户流失率 < 1%/月' },
                { value: 2, label: '留存良好', description: '月流失率 3-5%，核心用户留存稳定' },
                { value: 3, label: '留存一般', description: '月流失率 5-10%，需要改进' },
                { value: 4, label: '留存较差', description: '月流失率 10-20%，用户流失严重' },
                { value: 5, label: '留存极差', description: '月流失率 > 20%，产品难以留住用户' }
            ]
        },
        
        // ==================== 资金风险 ====================
        {
            id: 'financing-1',
            category: 'financing',
            text: 'Runway是否超过18个月？',
            hint: '评估资金能支撑的时间',
            options: [
                { value: 1, label: 'Runway充足', description: 'Runway > 24个月，资金充裕' },
                { value: 2, label: 'Runway良好', description: 'Runway 18-24个月，财务稳健' },
                { value: 3, label: 'Runway一般', description: 'Runway 12-18个月，需要开始准备融资' },
                { value: 4, label: 'Runway紧张', description: 'Runway 6-12个月，需紧急启动融资' },
                { value: 5, label: 'Runway不足', description: 'Runway < 6个月，资金链紧张' }
            ]
        },
        {
            id: 'financing-2',
            category: 'financing',
            text: '投资人关系是否良好？',
            hint: '评估与投资人的沟通和信任',
            options: [
                { value: 1, label: '关系优秀', description: '投资人力挺，主动介绍资源，沟通顺畅' },
                { value: 2, label: '关系良好', description: '投资人认可，能获得基本支持' },
                { value: 3, label: '关系一般', description: '定期汇报，无重大分歧' },
                { value: 4, label: '关系紧张', description: '沟通不畅，或投资人有异议' },
                { value: 5, label: '关系恶化', description: '投资人要求撤资，或存在法律纠纷' }
            ]
        },
        {
            id: 'financing-3',
            category: 'financing',
            text: '估值是否合理？',
            hint: '评估当前估值的健康程度',
            options: [
                { value: 1, label: '估值合理', description: '估值与业务指标匹配，下轮可溢价' },
                { value: 2, label: '估值偏优', description: '估值略高于业务，但可接受' },
                { value: 3, label: '估值一般', description: '估值基本反映业务价值' },
                { value: 4, label: '估值偏高', description: '估值虚高，面临估值回调压力' },
                { value: 5, label: '估值泡沫', description: '估值远超业务，需要故事支撑' }
            ]
        },
        {
            id: 'financing-4',
            category: 'financing',
            text: 'Burn Rate是否可控？',
            hint: '评估资金消耗速度',
            options: [
                { value: 1, label: 'Burn极低', description: 'Burn/收入 < 50%，有清晰盈利路径' },
                { value: 2, label: 'Burn可控', description: 'Burn/收入 50-100%，但有增长潜力' },
                { value: 3, label: 'Burn较高', description: 'Burn/收入 100-200%，依赖融资' },
                { value: 4, label: 'Burn很高', description: 'Burn/收入 200-500%，效率较低' },
                { value: 5, label: 'Burn失控', description: 'Burn/收入 > 500%，资金快速消耗' }
            ]
        }
    ],
    
    // 建议生成规则
    recommendations: {
        market: [
            { threshold: 3, priority: 'high', title: '市场验证优先', desc: '立即进行用户访谈和市场调研，确保产品有真实需求' },
            { threshold: 2, priority: 'medium', title: '关注竞争动态', desc: '建立竞品监控系统，持续跟踪市场变化' }
        ],
        product: [
            { threshold: 3, priority: 'high', title: '加速PMF验证', desc: '聚焦核心用户群体，提升产品留存和NPS' },
            { threshold: 2, priority: 'medium', title: '技术债务清理', desc: '安排专门时间重构关键模块，��低技术风险' }
        ],
        team: [
            { threshold: 3, priority: 'high', title: '补齐能力短板', desc: '招聘或顾问弥补团队缺口，提升综合能力' },
            { threshold: 2, priority: 'medium', title: '股权结构优化', desc: '确保长期激励到位，减少核心人员流失风险' }
        ],
        operation: [
            { threshold: 3, priority: 'high', title: '单位经济优化', desc: '降低CAC，提升LTV，优化回收期' },
            { threshold: 2, priority: 'medium', title: '运营效率提升', desc: '自动化重复工作，提升人效' }
        ],
        financing: [
            { threshold: 3, priority: 'high', title: '融资准备', desc: '立即启动下轮融资，准备融资材料' },
            { threshold: 2, priority: 'medium', title: '成本控制', desc: '延长runway，优化burn rate' }
        ]
    },
    
    // 评分区间定义
    scoreRanges: [
        { max: 1.5, label: '🟢 极低风险', status: 'success', color: '#2ecc71', message: '你的项目风险极低，继续保持！' },
        { max: 2.5, label: '🟡 较低风险', status: 'success', color: '#f1c40f', message: '你的项目风险较低，关注潜在问题即可。' },
        { max: 3.5, label: '🟠 中等风险', status: 'warning', color: '#e67e22', message: '你的项目存在中等风险，建议制定改进计划。' },
        { max: 5.0, label: '🔴 较高风险', status: 'danger', color: '#e74c3c', message: '你的项目面临较高风险，需要立即采取行动！' }
    ]
};

// 按类别分组问题
RiskQuestions.categories.forEach(cat => {
    cat.questions = RiskQuestions.questions.filter(q => q.category === cat.id);
});

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RiskQuestions;
}
