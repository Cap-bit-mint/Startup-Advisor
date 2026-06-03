/**
 * Startup-Advisor 完整案例数据库
 * 版本: 1.0.0
 * 更新: 2026-06-04
 * 
 * 包含 loot-drop.io 风格的完整案例分析
 */

const FullCaseDatabase = {
    VERSION: '1.0.0',
    UPDATED: '2026-06-04',
    
    // 完整案例列表
    cases: [
        {
            id: '2035-wework',
            name: 'WeWork',
            sector: 'Real Estate / PropTech',
            product_type: 'Marketplace',
            founding_year: 2010,
            end_year: 2019,
            total_cash_burned: '$22.0B',
            funding_raised: '$12.8B',
            valuation_peak: '$47B',
            status: 'failed',
            
            failure_analysis: 'WeWork died from a combination of unsustainable business model, governance failures, and market timing. The core issue was that WeWork burned cash at an unsustainable rate while claiming to be a tech company to justify sky-high valuations. Founder Adam Neumann\'s erratic behavior and self-dealing eroded investor confidence. The failed IPO attempt in 2019 exposed the truth: WeWork was a real estate company, not a tech disruptor.',
            
            market_analysis: 'The flexible workspace market was real but not revolutionary. WeWork\'s model required massive capital deployment for leasehold improvements while charging customers monthly. The unit economics worked in theory but failed in practice due to high turnover, long lease commitments, and the need for constant expansion.',
            
            startup_learnings: [
                'Unit economics must work without constant growth assumptions',
                'Tech valuations require tech-level margins',
                'Founder governance and checks-and-balances are essential',
                'IPO readiness should be validated before claiming unicorn status',
                'Corporate governance isn\'t optional for high-growth companies'
            ],
            
            scalability: 'Coworking is inherently capital-intensive and asset-heavy. Unlike software businesses with near-zero marginal costs, WeWork needed billions to grow.',
            
            pivot_concept: 'A sustainable version of WeWork would focus on profitability over growth, operate in select high-demand markets, and be transparent about being a real estate technology company.',
            
            related_patterns: ['financing-1', 'team-3', 'operation-1'],
            relevance_tags: ['real-estate', 'marketplace', 'unicorn', 'ipo-failure']
        },
        {
            id: '1891-quibi',
            name: 'Quibi',
            sector: 'Entertainment / Streaming',
            product_type: 'Mobile Video Platform',
            founding_year: 2018,
            end_year: 2020,
            total_cash_burned: '$1.75B',
            funding_raised: '$1.75B',
            valuation_peak: '$4.4B',
            status: 'failed',
            
            failure_analysis: 'Quibi failed due to timing, positioning, and product design errors. The premise of \'quick bites\' for mobile viewing was flawed: users already had YouTube for free, and the content wasn\'t compelling enough to justify a subscription. The pandemic eliminated the only valid use case: watching on-the-go.',
            
            market_analysis: 'The mobile video market was dominated by free alternatives (YouTube, TikTok, Instagram). Quibi\'s paid model required content quality that took years to produce while the platform needed immediate engagement.',
            
            startup_learnings: [
                'Product differentiation must be demonstrable and defensible',
                'Free alternatives can kill paid models',
                'Pandemic-era assumptions should be stress-tested',
                'Content investment requires long runway before platform launch',
                'User acquisition without retention is worthless'
            ],
            
            scalability: 'High-quality content production requires significant time and capital. Quibi\'s $1.75B was spent mostly on content before validating user demand.',
            
            pivot_concept: 'A successful mobile video platform would need either viral free content, a unique format, or a proven content library before launch.',
            
            related_patterns: ['market-2', 'product-1', 'financing-2'],
            relevance_tags: ['streaming', 'mobile', 'content', 'pandemic']
        },
        {
            id: '2171-fabcom',
            name: 'Fab.com',
            sector: 'E-commerce / Design',
            product_type: 'Flash Sales Platform',
            founding_year: 2011,
            end_year: 2015,
            total_cash_burned: '$336M',
            funding_raised: '$336M',
            valuation_peak: '$1.0B',
            status: 'failed',
            
            failure_analysis: 'Fab.com pivoted too many times and lost focus. Started as a social network for designers, pivoted to flash sales, then to e-commerce, then to home goods. Each pivot burned more cash and alienated existing users.',
            
            market_analysis: 'The flash sales model had inherent issues: low margins, inventory risk, and no loyalty. As competitors emerged, differentiation vanished.',
            
            startup_learnings: [
                'Pivots should be strategic, not desperate',
                'Inventory-based businesses have thin margins',
                'Acquisition attempts can destroy company culture',
                'User loyalty requires consistent value proposition',
                'Cash preservation is critical for e-commerce'
            ],
            
            scalability: 'E-commerce flash sales scale with inventory and marketing spend. Fab\'s high marketing costs (40% of revenue) meant scale didn\'t improve unit economics.',
            
            pivot_concept: 'A sustainable flash sales model would need exclusive products, better margins, and a loyal customer base built before aggressive expansion.',
            
            related_patterns: ['operation-1', 'market-1', 'financing-2'],
            relevance_tags: ['ecommerce', 'flash-sales', 'pivot']
        },
        {
            id: '2189-homejoy',
            name: 'Homejoy',
            sector: 'On-Demand Services',
            product_type: 'Home Services Marketplace',
            founding_year: 2012,
            end_year: 2015,
            total_cash_burned: '$40M',
            funding_raised: '$40M',
            valuation_peak: '$500M',
            status: 'failed',
            
            failure_analysis: 'Homejoy faced \'gig economy\' legal challenges. California labor regulators sued over worker classification. The core business model—relying on contractors—was legally vulnerable. Combined with competition from Handy, Homejoy couldn\'t survive.',
            
            market_analysis: 'The home cleaning market was fragmented and price-sensitive. Homejoy\'s model required high volume and low prices, creating razor-thin margins.',
            
            startup_learnings: [
                'Legal and regulatory risks must be assessed early',
                'Business models dependent on contractor classification are risky',
                'Market leadership requires either scale or niche focus',
                'Capital-intensive service businesses need significant runway'
            ],
            
            scalability: 'Home services require local operations, quality control, and supply-side management. Each city requires significant investment before profitability.',
            
            pivot_concept: 'A successful version might focus on premium services, employ workers directly, or target markets with clearer regulatory frameworks.',
            
            related_patterns: ['team-1', 'financing-1', 'operation-2'],
            relevance_tags: ['gig-economy', 'home-services', 'legal-risk']
        },
        {
            id: '1-juicero',
            name: 'Juicero',
            sector: 'Consumer / Hardware',
            product_type: 'Smart Appliance',
            founding_year: 2013,
            end_year: 2017,
            total_cash_burned: '$118.5M',
            funding_raised: '$118.5M',
            valuation_peak: '$420M',
            status: 'failed',
            
            failure_analysis: 'Juicero built a $699 machine to squeeze juice packs when users could squeeze them by hand. The technology was solving a non-problem. Bloomberg exposed that the product was unnecessary, and users abandoned it immediately.',
            
            market_analysis: 'The cold-press juice market existed but didn\'t need expensive hardware. Users were content with cheaper alternatives like手工挤压或简单的榨汁机.',
            
            startup_learnings: [
                'Build an MVP before a $699 product—test with bags first',
                'Technology should solve real problems, not create new ones',
                'Hardware margins require massive scale or premium pricing',
                'Media can kill a product with one investigation'
            ],
            
            scalability: 'Hardware businesses require supply chain, manufacturing, and inventory management. The $699 price point limited the addressable market.',
            
            pivot_concept: 'A successful juice business would focus on the product (juice quality) rather than unnecessary technology.',
            
            related_patterns: ['market-1', 'product-1', 'financing-1'],
            relevance_tags: ['hardware', 'consumer', 'pseudo-demand']
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
                c.failure_analysis.toLowerCase().includes(q) ||
                c.tags?.some(t => t.includes(q))
            );
        }
        
        if (sector) results = results.filter(c => c.sector.toLowerCase().includes(sector.toLowerCase()));
        if (status) results = results.filter(c => c.status === status);
        
        return results;
    },
    
    // 获取详情
    getById(id) {
        return this.cases.find(c => c.id === id || c.name.toLowerCase() === id.toLowerCase());
    },
    
    // 获取统计
    getStats() {
        return {
            total: this.cases.length,
            failed: this.cases.filter(c => c.status === 'failed').length,
            sectors: [...new Set(this.cases.map(c => c.sector))],
            totalBurned: this.cases.reduce((sum, c) => sum + parseFloat(c.total_cash_burned?.replace(/[$B]/g, '') || 0), 0)
        };
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FullCaseDatabase;
}
