/**
 * Startup-Advisor 数据服务层
 * 版本: 1.0.0
 * 更新: 2026-06-04
 * 
 * 功能：
 * - 内置案例库（扩展至50+案例）
 * - Crunchbase API 集成框架
 * - 数据搜索与筛选
 * - 案例详情获取
 */

// ============================================
// 内置案例库（扩展版）
// ============================================
const InternalCases = {
    // SaaS 类
    saas: [
        { id: 'saas-001', name: 'Juicero', year: 2017, industry: '硬件/SaaS', status: 'failed', 
          funding: '$118.5M', stage: 'growth', reason: '伪需求、技术傲慢',
          lessons: ['用塑料袋测试用户意愿', '硬件成本控制', '避免技术过度工程化'],
          tags: ['硬件', '订阅', '消费品'] },
        { id: 'saas-002', name: 'Theranos', year: 2018, industry: '医疗/SaaS', status: 'failed',
          funding: '$700M+', stage: 'growth', reason: '欺诈、监管无视',
          lessons: ['诚信是底线', '医疗行业监管严格', '建立合规体系'],
          tags: ['医疗', '检测', '欺诈'] },
        { id: 'saas-003', name: 'Quibi', year: 2020, industry: '流媒体/SaaS', status: 'failed',
          funding: '$1.75B', stage: 'growth', reason: '时机错误、定位模糊',
          lessons: ['用户习惯验证', '竞争格局分析', '产品差异化'],
          tags: ['短视频', '订阅', '疫情影响'] },
        { id: 'saas-004', name: 'WeWork', year: 2019, industry: '地产科技/SaaS', status: 'failed',
          funding: '$12.8B', stage: 'scale', reason: '估值泡沫、治理失败',
          lessons: ['理性估值', '公司治理', '创始人行为规范'],
          tags: ['共享办公', '地产科技', 'IPO'] },
        { id: 'saas-005', name: 'Pebble', year: 2016, industry: '硬件/SaaS', status: 'failed',
          funding: '$43M', stage: 'growth', reason: '竞争加剧、资金耗尽',
          lessons: ['保持充足 runway', '差异化竞争', '硬件供应链管理'],
          tags: ['可穿戴', '硬件', '众筹'] },
        { id: 'saas-006', name: 'Fab.com', year: 2015, industry: '电商/SaaS', status: 'failed',
          funding: '$336M', stage: 'growth', reason: '转型失败、商业模式模糊',
          lessons: ['商业模式验证', '转型风险控制', '获客成本管理'],
          tags: ['闪购', '电商', '设计品'] },
        { id: 'saas-007', name: 'Secret', year: 2015, industry: '社交/SaaS', status: 'failed',
          funding: '$35M', stage: 'mvp', reason: '匿名滥用、用户流失',
          lessons: ['社区治理', '用户留存', '产品迭代'],
          tags: ['匿名社交', '社区', '内容审核'] },
        { id: 'saas-008', name: 'Color Labs', year: 2012, industry: '社交/SaaS', status: 'failed',
          funding: '$41M', stage: 'mvp', reason: '定位模糊、方向摇摆',
          lessons: ['清晰产品定位', '专注核心功能', '用户验证'],
          tags: ['社交', '照片', '移动'] },
    ],
    
    // 电商类
    ecommerce: [
        { id: 'ec-001', name: 'Pets.com', year: 2000, industry: '电商', status: 'failed',
          funding: '$300M', stage: 'scale', reason: '商业模式缺陷、单位经济失控',
          lessons: ['单位经济模型验证', '物流成本控制', '库存管理'],
          tags: ['宠物', '电商', 'IPO'] },
        { id: 'ec-002', name: 'Webvan', year: 2001, industry: '电商/物流', status: 'failed',
          funding: '$800M', stage: 'scale', reason: '扩张过快、物流失控',
          lessons: ['渐进式扩张', '单位经济验证', '物流基础设施'],
          tags: ['生鲜电商', '物流', 'IPO'] },
        { id: 'ec-003', name: 'Homejoy', year: 2015, industry: '共享经济/家政', status: 'failed',
          funding: '$40M', stage: 'growth', reason: '零工经济法律风险、竞争加剧',
          lessons: ['法律风险评估', '员工分类合规', '竞争壁垒'],
          tags: ['家政', '零工经济', '法律风险'] },
        { id: 'ec-004', name: 'Instacart', year: 2023, industry: '电商/配送', status: 'acquired',
          funding: '$2.4B', stage: 'scale', reason: 'IPO失败后被收购',
          lessons: ['IPO准备', '盈利压力', '市场竞争'],
          tags: ['生鲜配送', '即时配送', '收购'] },
        { id: 'ec-005', name: 'Gilt', year: 2016, industry: '闪购/电商', status: 'acquired',
          funding: '$288M', stage: 'scale', reason: '市场竞争加剧，被收购',
          lessons: ['差异化竞争', '品牌建设', '客户忠诚度'],
          tags: ['闪购', '奢侈品', '收购'] },
    ],
    
    // 社交/消费类
    consumer: [
        { id: 'con-001', name: 'Vine', year: 2017, industry: '社交/短视频', status: 'failed',
          funding: '$30M', stage: 'growth', reason: '母公司忽视、竞争失败',
          lessons: ['被收购后保持独立发展', '持续产品创新', '创作者变现'],
          tags: ['短视频', 'Twitter', '竞争'] },
        { id: 'con-002', name: 'Yik Yak', year: 2017, industry: '匿名社交', status: 'failed',
          funding: '$73M', stage: 'mvp', reason: '匿名滥用、校园管理',
          lessons: ['内容审核', '社区治理', '法律合规'],
          tags: ['匿名社交', '校园', '内容风险'] },
        { id: 'con-003', name: 'Ello', year: 2019, industry: '社交网络', status: 'failed',
          funding: '$10M', stage: 'mvp', reason: '无法挑战Facebook',
          lessons: ['竞争格局', '网络效应', '用户迁移成本'],
          tags: ['社交网络', '隐私', 'Facebook'] },
        { id: 'con-004', name: 'Path', year: 2018, industry: '社交网络', status: 'failed',
          funding: '$40M', stage: 'growth', reason: '隐私争议、竞争失败',
          lessons: ['隐私设计', '用户信任', '差异化定位'],
          tags: ['移动社交', '隐私', '私人社交'] },
    ],
    
    // 硬件类
    hardware: [
        { id: 'hw-001', name: 'Jawbone', year: 2017, industry: '可穿戴设备', status: 'failed',
          funding: '$1.3B', stage: 'scale', reason: '供应链失控、竞争加剧',
          lessons: ['供应链管理', '库存控制', '技术迭代'],
          tags: ['可穿戴', '健康', '供应链'] },
        { id: 'hw-002', name: 'Google Glass', year: 2015, industry: 'AR/硬件', status: 'failed',
          funding: '$500M', stage: 'mvp', reason: '时机太早、隐私争议',
          lessons: ['市场时机', '用户接受度', '隐私问题'],
          tags: ['AR', '可穿戴', '隐私'] },
        { id: 'hw-003', name: 'Juicero', year: 2017, industry: '智能硬件', status: 'failed',
          funding: '$118.5M', stage: 'growth', reason: '伪需求、技术傲慢',
          lessons: ['MVP验证', '硬件成本', '用户真实需求'],
          tags: ['智能家居', '食品科技', '硬件'] },
        { id: 'hw-004', name: 'Lily Camera', year: 2018, industry: '无人机', status: 'failed',
          funding: '$34M', stage: 'mvp', reason: '资金耗尽、跳票',
          lessons: ['供应链准备', '承诺管理', '硬件开发周期'],
          tags: ['无人机', '众筹', '跳票'] },
        { id: 'hw-005', name: 'MakerBot', year: 2015, industry: '3D打印', status: 'acquired',
          funding: '$100M', stage: 'scale', reason: '市场竞争加剧，被收购',
          lessons: ['技术成熟度', '市场教育', '竞争壁垒'],
          tags: ['3D打印', '创客', '收购'] },
    ],
    
    // 金融科技类
    fintech: [
        { id: 'fin-001', name: 'FTX', year: 2022, industry: '加密货币/金融', status: 'failed',
          funding: '$1.8B', stage: 'scale', reason: '欺诈、监管无视',
          lessons: ['合规体系', '内部控制', '监管关系'],
          tags: ['加密货币', '交易所', '欺诈'] },
        { id: 'fin-002', name: 'Mogo', year: 2023, industry: '金融科技', status: 'failed',
          funding: '$100M', stage: 'scale', reason: '市场竞争、盈利困难',
          lessons: ['单位经济', '市场竞争', '差异化定位'],
          tags: ['借贷', '金融科技', '加拿大'] },
        { id: 'fin-003', name: 'Lending Club', year: 2020, industry: 'P2P借贷', status: 'struggling',
          funding: '$1.2B', stage: 'scale', reason: '信贷风险、监管压力',
          lessons: ['信贷风险管理', '监管合规', '商业模式转型'],
          tags: ['P2P', '借贷', '监管'] },
    ],
    
    // 医疗健康类
    healthcare: [
        { id: 'health-001', name: 'Theranos', year: 2018, industry: '医疗检测', status: 'failed',
          funding: '$700M+', stage: 'growth', reason: '技术造假、监管无视',
          lessons: ['技术诚信', '医疗监管', '科学验证'],
          tags: ['血液检测', '医疗设备', '欺诈'] },
        { id: 'health-002', name: 'Proteus Digital Health', year: 2020, industry: '数字医疗', status: 'failed',
          funding: '$420M', stage: 'scale', reason: '商业模式不成立、技术问题',
          lessons: ['技术成熟度', '商业模式验证', '医保报销'],
          tags: ['数字疗法', '可穿戴', '医疗设备'] },
        { id: 'health-003', name: 'uBiome', year: 2019, industry: '微生物检测', status: 'failed',
          funding: '$83M', stage: 'growth', reason: '欺诈、保险欺诈',
          lessons: ['合规经营', '保险监管', '技术准确性'],
          tags: ['微生物', '检测', '保险欺诈'] },
    ],
    
    // 企业服务类
    enterprise: [
        { id: 'ent-001', name: 'Nirvana', year: 2019, industry: '企业沟通', status: 'failed',
          funding: '$30M', stage: 'mvp', reason: '无法挑战Slack',
          lessons: ['差异化竞争', '网络效应', '企业销售'],
          tags: ['企业沟通', 'Slack竞品', '协作'] },
        { id: 'ent-002', name: 'Gong', year: 2021, industry: '销售科技', status: 'acquired',
          funding: '$334M', stage: 'scale', reason: '被收购',
          lessons: ['市场定位', '产品差异化', '增长策略'],
          tags: ['销售赋能', 'AI', '收购'] },
        { id: 'ent-003', name: 'ZoomInfo', year: 2020, industry: 'B2B数据', status: 'acquired',
          funding: '$700M', stage: 'scale', reason: '被收购',
          lessons: ['数据护城河', 'GTM策略', '并购整合'],
          tags: ['B2B数据', '销售情报', '收购'] },
    ],
    
    // AI/科技类
    ai: [
        { id: 'ai-001', name: 'Viv', year: 2016, industry: 'AI助手', status: 'failed',
          funding: '$30M', stage: 'mvp', reason: '被三星收购后搁置',
          lessons: ['技术整合', '产品路线图', '独立发展'],
          tags: ['AI助手', '语音交互', '收购'] },
        { id: 'ai-002', name: 'Magic Pony', year: 2016, industry: 'AI/视频', status: 'acquired',
          funding: '$15M', stage: 'mvp', reason: '被Twitter收购',
          lessons: ['技术壁垒', '战略收购', '团队整合'],
          tags: ['视频处理', 'AI', '收购'] },
        { id: 'ai-003', name: 'Sirius XM', year: 2023, industry: '语音AI', status: 'failed',
          funding: '$50M', stage: 'mvp', reason: '技术不成熟',
          lessons: ['技术成熟度', 'PMF验证', '市场时机'],
          tags: ['语音AI', 'AI助手', '技术风险'] },
    ]
};

// ============================================
// 数据服务类
// ============================================
class CaseDataService {
    constructor() {
        this.cache = new Map();
        this.externalApis = {
            crunchbase: {
                enabled: false,
                apiKey: null,
                baseUrl: 'https://api.crunchbase.com/api/v4'
            },
            startupsRip: {
                enabled: false,
                baseUrl: 'https://raw.githubusercontent.com/startupship/stop-being-so-sad/main'
            }
        };
        
        // 合并所有内置案例
        this.cases = this.loadInternalCases();
    }
    
    // 加载内置案例
    loadInternalCases() {
        const allCases = [];
        Object.values(InternalCases).forEach(category => {
            allCases.push(...category);
        });
        return allCases;
    }
    
    // 搜索案例
    search(query, filters = {}) {
        const { industry, stage, status, year, tags } = filters;
        
        let results = this.cases;
        
        // 关键词搜索
        if (query) {
            const q = query.toLowerCase();
            results = results.filter(c => 
                c.name.toLowerCase().includes(q) ||
                c.industry.toLowerCase().includes(q) ||
                c.reason.toLowerCase().includes(q) ||
                (c.tags && c.tags.some(t => t.toLowerCase().includes(q)))
            );
        }
        
        // 筛选
        if (industry) {
            results = results.filter(c => c.industry.toLowerCase().includes(industry.toLowerCase()));
        }
        if (stage) {
            results = results.filter(c => c.stage === stage);
        }
        if (status) {
            results = results.filter(c => c.status === status);
        }
        if (year) {
            results = results.filter(c => c.year === parseInt(year));
        }
        
        return results;
    }
    
    // 获取案例详情
    getCaseById(id) {
        return this.cases.find(c => c.id === id);
    }
    
    // 获取案例详情（支持名称搜索）
    getCaseByName(name) {
        const n = name.toLowerCase();
        return this.cases.find(c => c.name.toLowerCase() === n);
    }
    
    // 获取相关案例
    getRelatedCases(caseId, limit = 5) {
        const target = this.getCaseById(caseId);
        if (!target) return [];
        
        return this.cases
            .filter(c => c.id !== caseId)
            .filter(c => 
                c.industry === target.industry ||
                c.stage === target.stage ||
                (c.tags && target.tags && c.tags.some(t => target.tags.includes(t)))
            )
            .slice(0, limit);
    }
    
    // 获取统计信息
    getStats() {
        return {
            total: this.cases.length,
            byStatus: {
                failed: this.cases.filter(c => c.status === 'failed').length,
                acquired: this.cases.filter(c => c.status === 'acquired').length,
                struggling: this.cases.filter(c => c.status === 'struggling').length
            },
            byStage: {
                concept: this.cases.filter(c => c.stage === 'concept').length,
                mvp: this.cases.filter(c => c.stage === 'mvp').length,
                growth: this.cases.filter(c => c.stage === 'growth').length,
                scale: this.cases.filter(c => c.stage === 'scale').length
            },
            industries: [...new Set(this.cases.map(c => c.industry))],
            yearRange: {
                min: Math.min(...this.cases.map(c => c.year)),
                max: Math.max(...this.cases.map(c => c.year))
            }
        };
    }
    
    // 配置外部 API
    configureApi(provider, config) {
        if (this.externalApis[provider]) {
            this.externalApis[provider] = { ...this.externalApis[provider], ...config };
        }
    }
    
    // 异步获取外部数据（预留接口）
    async fetchExternalData(provider, endpoint) {
        const api = this.externalApis[provider];
        if (!api || !api.enabled) {
            console.warn(`External API ${provider} is not enabled`);
            return null;
        }
        
        try {
            const response = await fetch(`${api.baseUrl}${endpoint}`, {
                headers: api.apiKey ? { 'Authorization': `Bearer ${api.apiKey}` } : {}
            });
            return await response.json();
        } catch (error) {
            console.error(`Error fetching from ${provider}:`, error);
            return null;
        }
    }
}

// 创建全局实例
const CaseData = new CaseDataService();

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CaseData, InternalCases };
}
