/**
 * Startup-Advisor 完整案例数据库
 * 版本: 1.1.0
 * 更新: 2026-06-04
 * 
 * 包含 loot-drop.io 风格的完整案例分析
 * 数据来源: loot-drop.io, TechCrunch, Bloomberg, SEC filings
 */

const FullCaseDatabase = {
    VERSION: '1.1.0',
    UPDATED: '2026-06-04',
    
    // 案例列表（从 startup-cases.json 加载）
    // 完整数据请参考 data/startup-cases.json
    
    // 简化索引用于快速查找
    cases: [
        {
            id: '2035-wework',
            name: 'WeWork',
            sector: 'Real Estate / PropTech',
            product_type: 'Marketplace',
            founding_year: 2010,
            end_year: 2019,
            total_cash_burned: '$22.0B',
            valuation_peak: '$47B',
            status: 'failed',
            loot_url: 'https://www.loot-drop.io/startup/2035-wework',
            summary: '因商业模式不可持续、治理失败和市场时机错误而失败',
            related_patterns: ['financing-1', 'team-3', 'operation-1'],
            relevance_tags: ['real-estate', 'unicorn', 'ipo-failure', 'governance']
        },
        {
            id: '1891-quibi',
            name: 'Quibi',
            sector: 'Entertainment / Streaming',
            product_type: 'Mobile App',
            founding_year: 2018,
            end_year: 2020,
            total_cash_burned: '$1.75B',
            valuation_peak: '$4.4B',
            status: 'failed',
            loot_url: 'https://www.loot-drop.io/startup/1891-quibi',
            summary: '因时机错误、产品定位模糊和疫情影响而失败',
            related_patterns: ['market-2', 'product-1', 'financing-2'],
            relevance_tags: ['streaming', 'mobile', 'content', 'pandemic']
        },
        {
            id: '1-juicero',
            name: 'Juicero',
            sector: 'Consumer / Hardware',
            product_type: 'Smart Appliance',
            founding_year: 2013,
            end_year: 2017,
            total_cash_burned: '$118.5M',
            valuation_peak: '$420M',
            status: 'failed',
            loot_url: null,
            summary: '伪需求问题，可用简单方案替代复杂技术',
            related_patterns: ['market-1', 'product-1', 'financing-1'],
            relevance_tags: ['hardware', 'consumer', 'pseudo-demand']
        },
        {
            id: '2-theranos',
            name: 'Theranos',
            sector: 'Healthcare / Biotech',
            product_type: 'Medical Device',
            founding_year: 2003,
            end_year: 2018,
            total_cash_burned: '$700M+',
            valuation_peak: '$9B',
            status: 'failed',
            loot_url: null,
            summary: '技术造假和欺诈导致公司倒闭',
            related_patterns: ['market-1', 'product-1', 'team-3'],
            relevance_tags: ['healthcare', 'fraud', 'regulation']
        },
        {
            id: '3-pets',
            name: 'Pets.com',
            sector: 'E-commerce',
            product_type: 'Online Retail',
            founding_year: 1999,
            end_year: 2000,
            total_cash_burned: '$300M',
            valuation_peak: '$268M',
            status: 'failed',
            loot_url: null,
            summary: '单位经济崩溃，重物电商物流成本过高',
            related_patterns: ['operation-1', 'market-1', 'financing-1'],
            relevance_tags: ['ecommerce', 'pets', 'dot-com', 'unit-economics']
        },
        {
            id: '4-webvan',
            name: 'Webvan',
            sector: 'E-commerce / Logistics',
            product_type: 'Online Grocery',
            founding_year: 1996,
            end_year: 2001,
            total_cash_burned: '$800M',
            valuation_peak: '$1.2B',
            status: 'failed',
            loot_url: null,
            summary: '扩张过快，未验证商业模式就大规模建设基础设施',
            related_patterns: ['operation-3', 'market-2', 'financing-1'],
            relevance_tags: ['ecommerce', 'grocery', 'dot-com', 'premature-scaling']
        },
        {
            id: '5-homejoy',
            name: 'Homejoy',
            sector: 'On-Demand Services',
            product_type: 'Home Services Marketplace',
            founding_year: 2012,
            end_year: 2015,
            total_cash_burned: '$40M',
            valuation_peak: '$500M',
            status: 'failed',
            loot_url: 'https://www.loot-drop.io/startup/2189-homejoy',
            summary: '零工经济法律风险和竞争加剧导致失败',
            related_patterns: ['team-1', 'financing-1', 'operation-2'],
            relevance_tags: ['gig-economy', 'home-services', 'legal-risk']
        },
        {
            id: '6-vine',
            name: 'Vine',
            sector: 'Social Media',
            product_type: 'Short Video Platform',
            founding_year: 2012,
            end_year: 2017,
            status: 'failed',
            loot_url: null,
            summary: '被收购后缺乏投入，被竞争对手超越',
            related_patterns: ['product-2', 'market-3', 'team-2'],
            relevance_tags: ['social-media', 'video', 'acquisition']
        },
        {
            id: '7-jawbone',
            name: 'Jawbone',
            sector: 'Hardware / Wearables',
            product_type: 'Fitness Tracker',
            founding_year: 1997,
            end_year: 2017,
            total_cash_burned: '$1.3B',
            valuation_peak: '$3.3B',
            status: 'failed',
            loot_url: null,
            summary: '供应链危机和苹果竞争导致失败',
            related_patterns: ['operation-2', 'market-3', 'financing-1'],
            relevance_tags: ['hardware', 'wearables', 'supply-chain', 'apple']
        },
        {
            id: '8-secret',
            name: 'Secret',
            sector: 'Social Media',
            product_type: 'Anonymous Social',
            founding_year: 2014,
            end_year: 2015,
            total_cash_burned: '$35M',
            valuation_peak: '$100M',
            status: 'failed',
            loot_url: null,
            summary: '匿名社交导致毒性内容泛滥',
            related_patterns: ['product-1', 'team-3', 'operation-2'],
            relevance_tags: ['social-media', 'anonymous', 'community', 'toxicity']
        },
        {
            id: '9-color',
            name: 'Color Labs',
            sector: 'Social Media',
            product_type: 'Photo Sharing',
            founding_year: 2010,
            end_year: 2012,
            total_cash_burned: '$41M',
            valuation_peak: '$170M',
            status: 'failed',
            loot_url: null,
            summary: '产品定位模糊，多次转型失败',
            related_patterns: ['market-1', 'product-1', 'financing-1'],
            relevance_tags: ['social-media', 'photos', 'pivot']
        },
        {
            id: '10-yikyak',
            name: 'Yik Yak',
            sector: 'Social Media',
            product_type: 'Anonymous Campus Chat',
            founding_year: 2013,
            end_year: 2017,
            total_cash_burned: '$73M',
            valuation_peak: '$400M',
            status: 'failed',
            loot_url: null,
            summary: '匿名性导致网络霸凌，被大学禁用',
            related_patterns: ['product-1', 'team-3', 'operation-2'],
            relevance_tags: ['social-media', 'anonymous', 'campus', 'moderation']
        },
        {
            id: '11-pebble',
            name: 'Pebble',
            sector: 'Hardware / Wearables',
            product_type: 'Smartwatch',
            founding_year: 2012,
            end_year: 2016,
            total_cash_burned: '$43M',
            valuation_peak: '$740M',
            status: 'failed',
            loot_url: null,
            summary: '无法与苹果三星竞争，资金耗尽',
            related_patterns: ['financing-1', 'market-3', 'operation-1'],
            relevance_tags: ['hardware', 'wearables', 'apple', 'kickstarter']
        },
        {
            id: '12-google-glass',
            name: 'Google Glass',
            sector: 'Hardware / AR',
            product_type: 'Wearable AR',
            founding_year: 2012,
            end_year: 2015,
            status: 'failed',
            loot_url: null,
            summary: '技术过早，隐私争议和社会接受度问题',
            related_patterns: ['market-2', 'product-1', 'team-3'],
            relevance_tags: ['ar', 'wearables', 'privacy']
        },
        {
            id: '13-ftx',
            name: 'FTX',
            sector: 'Fintech / Crypto',
            product_type: 'Cryptocurrency Exchange',
            founding_year: 2019,
            end_year: 2022,
            total_cash_burned: '$1.8B',
            valuation_peak: '$32B',
            status: 'failed',
            loot_url: null,
            summary: '欺诈和管理不善导致破产',
            related_patterns: ['market-1', 'team-3', 'financing-1'],
            relevance_tags: ['fintech', 'crypto', 'fraud', 'regulation']
        }
    ],
    
    // 搜索功能
    search(query, filters = {}) {
        const { sector, status, tags } = filters;
        let results = this.cases;
        
        if (query) {
            const q = query.toLowerCase();
            results = results.filter(c => 
                c.name.toLowerCase().includes(q) ||
                c.sector.toLowerCase().includes(q) ||
                c.summary.toLowerCase().includes(q) ||
                (c.tags && c.tags.some(t => t.includes(q)))
            );
        }
        
        if (sector) {
            results = results.filter(c => 
                c.sector.toLowerCase().includes(sector.toLowerCase())
            );
        }
        if (status) {
            results = results.filter(c => c.status === status);
        }
        
        return results;
    },
    
    // 获取详情
    getById(id) {
        return this.cases.find(c => 
            c.id === id || c.name.toLowerCase() === id.toLowerCase()
        );
    },
    
    // 获取相关案例
    getRelated(patternId) {
        return this.cases.filter(c => 
            c.related_patterns && c.related_patterns.includes(patternId)
        );
    },
    
    // 获取统计
    getStats() {
        return {
            total: this.cases.length,
            failed: this.cases.filter(c => c.status === 'failed').length,
            sectors: [...new Set(this.cases.map(c => c.sector))],
            totalBurned: this.cases.reduce((sum, c) => {
                const num = parseFloat((c.total_cash_burned || '$0').replace(/[$,B]/g, ''));
                return sum + (isNaN(num) ? 0 : num);
            }, 0)
        };
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FullCaseDatabase;
}
