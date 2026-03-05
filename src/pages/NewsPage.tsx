import { useState } from 'react';
import { Typography, Modal, Box, Chip } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

interface Article {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
  content: string;
}

const articles: Article[] = [
  {
    id: 1,
    category: 'Market Intelligence',
    categoryColor: 'indigo',
    title: 'B2B Trade Trends Q1 2026: Cross-Border Commerce Surges 34%',
    excerpt:
      'New data from the Feenix Marketplace reveals that cross-border B2B transactions have grown by 34% year-over-year in Q1 2026, driven by streamlined compliance tools and expanded logistics partnerships.',
    date: 'March 3, 2026',
    readTime: '6 min read',
    image: '/article-trade-trends.png',
    featured: true,
    content: `Global B2B e-commerce is accelerating at a pace few predicted. The latest quarterly report from Feenix Marketplace shows cross-border orders surged 34% year-over-year in Q1 2026 — outpacing every prior quarter since our 2021 launch.

**What's driving the growth?**

Three forces converge: first, expanded logistics partnerships with regional carriers have cut average delivery windows by 18%. Second, our AI-powered compliance engine now auto-classifies trade documentation across 47 jurisdictions, eliminating weeks of manual paperwork. Third, buyer confidence is at an all-time high as escrow protections have improved.

**Asia-Pacific leads the charge**

Vendors in the APAC region saw order volumes double, while buyers from Europe increased their average basket size by $12,000. The healthcare and industrial components categories were the fastest-growing verticals.

**What's next**

We're expanding the compliance engine to cover 15 additional markets by Q3 2026, and launching a live RFQ (Request for Quotation) feature that will connect buyers with verified vendors in under 60 seconds.`,
  },
  {
    id: 2,
    category: 'Vendor Spotlight',
    categoryColor: 'emerald',
    title: 'Vendor Spotlight: How Apex Industries Scaled from $200K to $4M in 18 Months',
    excerpt:
      'Apex Industries, a mid-size industrial components manufacturer, shares how Feenix gave them direct access to 300+ enterprise buyers — transforming their sales model entirely.',
    date: 'February 24, 2026',
    readTime: '5 min read',
    image: '/article-vendor-spotlight.png',
    content: `When Maria Chen joined Apex Industries as VP of Sales three years ago, the company relied entirely on trade shows and cold outreach to find new buyers. Margins were thin, relationships were fragile, and growth had plateaued.

"Feenix changed our entire go-to-market," Maria says. "Within 90 days of onboarding, we had active conversations with 47 qualified buyers. By month 12, our average deal size tripled."

**The turning point**

Apex's breakthrough came when they used Feenix's verified catalog to list a new product line with certified quality documentation. Two enterprise buyers from Germany placed trial orders within the first week.

**Building trust at scale**

Maria emphasises that the escrow and review system was key: "Our buyers knew their payment was protected. That removed so much friction in the first conversation."

Today, Apex does over $4M in annual GMV through the platform — with 70% of that from repeat buyers they'd never have found through traditional channels.`,
  },
  {
    id: 3,
    category: 'Platform Update',
    categoryColor: 'blue',
    title: 'Introducing Smart RFQ: Connect with Verified Vendors in Under 60 Seconds',
    excerpt:
      'Our new Smart RFQ feature uses AI matching to surface the top 5 vendors for any procurement need — with verified pricing and availability — instantly.',
    date: 'February 18, 2026',
    readTime: '4 min read',
    image: '/article-platform-update.png',
    content: `Procurement shouldn't require hours of outreach and days of waiting. Starting today, all buyers on Feenix have access to Smart RFQ — a feature we've been building (and testing internally) for over a year.

**How it works**

Describe what you need in plain language — product type, quantity, certifications, delivery region. Our AI engine scores and ranks verified vendors by compatibility, pricing history, response rate, and logistics fit. Within 60 seconds, you see a shortlist of the top 5 matches with live pricing estimates and estimated lead times.

**Early results from beta**

During our 3-month closed beta with 200 buyer accounts:
- Average time-to-quote dropped from 4.2 days to 6.3 hours
- 87% of buyers rated match quality as "excellent" or "very good"
- Conversion from RFQ to order increased by 31%

Smart RFQ is available now on all paid buyer plans. Free-tier buyers get 3 Smart RFQ requests per month.`,
  },
  {
    id: 4,
    category: 'Global Markets',
    categoryColor: 'amber',
    title: 'Southeast Asia Opens Up: Feenix Expands to Vietnam, Indonesia, and Thailand',
    excerpt:
      'With new in-country payment rails and local logistics partners, Feenix is now fully operational in three high-growth Southeast Asian markets.',
    date: 'February 10, 2026',
    readTime: '4 min read',
    image: '/article-global-market.png',
    content: `Southeast Asia is the world's fastest-growing B2B market, and we're now fully embedded in it. Starting this month, Feenix is live in Vietnam, Indonesia, and Thailand — complete with local payment rails, currency support, and vetted regional logistics partners.

**Why these three markets**

Vietnam's manufacturing sector has grown 22% annually for three consecutive years. Indonesia is the fourth-largest consumer market by population. Thailand's electronics and automotive components export industry is booming. Together, they add over 18,000 potential vendors to our network.

**What's different about our approach**

We didn't just flip a switch. We spent 8 months building relationships with local freight consolidators, establishing escrow partnerships with regional banks, and hiring in-country support teams who speak the local languages.

**For buyers**

You can now source directly from SEA vendors with the same trust guarantees, escrow protections, and delivery visibility you get from any Feenix supplier — globally.`,
  },
  {
    id: 5,
    category: 'Supply Chain',
    categoryColor: 'violet',
    title: 'The Digital-First Supply Chain: Why 72% of B2B Buyers Are Switching Platforms',
    excerpt:
      'A new industry survey reveals that buyer expectations have fundamentally shifted — and most legacy procurement platforms are failing to keep up.',
    date: 'January 29, 2026',
    readTime: '7 min read',
    image: '/article-supply-chain.png',
    content: `A commissioned survey of 1,200 B2B procurement professionals across 14 countries surfaces an unmistakable trend: digital-first expectations have become non-negotiable.

**The key findings**

72% of respondents said they'd switched or were actively evaluating alternatives to their current procurement platform in the last 12 months. The top reasons cited:
1. Lack of real-time inventory visibility (68%)
2. Slow supplier verification and onboarding (61%)
3. Poor mobile experience (55%)
4. No integrated compliance or documentation tools (49%)

**What buyers want**

Speed, transparency, and trust. In that order. They want to see live inventory counts, verified quality certificates, and real shipping timelines — before they commit a dollar.

**How Feenix addresses all four pain points**

Our platform was built around these exact constraints. Real-time inventory sync via our Vendor API, AI-assisted supplier verification in 24 hours or less, a fully responsive mobile buyer experience, and integrated HS code and compliance tooling out of the box.`,
  },
  {
    id: 6,
    category: 'Industry Report',
    categoryColor: 'rose',
    title: '2026 B2B Marketplace Outlook: $14.9T in Global Transaction Volume by 2030',
    excerpt:
      'A comprehensive annual forecast projects explosive growth in digital B2B commerce, with marketplaces capturing an increasing share of the $14.9 trillion total addressable market.',
    date: 'January 15, 2026',
    readTime: '8 min read',
    image: '/article-industry-report.png',
    content: `The B2B commerce market is undergoing its most significant structural shift in a generation. Digital-first platforms are displacing traditional distribution channels at an accelerating rate — and new research from the Global Trade Analytics Institute forecasts that online B2B marketplaces will process $14.9 trillion in annual transaction volume by 2030, up from $3.2 trillion in 2024.

**The market structure is changing**

For decades, B2B trade was dominated by direct relationships, trade shows, and regional distributors. Digital platforms are compressing the buyer-to-vendor distance in every vertical — from industrial components to specialty food ingredients to medical devices.

**Who wins**

According to the report, platforms that offer three things will take outsized share: (1) trust infrastructure — verified vendors, escrow, quality assurance; (2) intelligence — AI-driven matching, pricing benchmarks, demand forecasting; (3) logistics integration — real-time freight booking, customs clearance, and last-mile visibility.

**Feenix's positioning**

We believe we're building exactly that platform. Our 2025 product roadmap delivered on all three pillars, and our 2026 roadmap goes further — with predictive reorder suggestions, carbon-footprint tracking for logistics, and a new financing layer for buyers.`,
  },
];

const categoryColorMap: Record<string, string> = {
  indigo: 'bg-indigo-100 text-indigo-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  blue: 'bg-blue-100 text-blue-700',
  amber: 'bg-amber-100 text-amber-700',
  violet: 'bg-violet-100 text-violet-700',
  rose: 'bg-rose-100 text-rose-700',
};

function renderContent(content: string) {
  return content.split('\n\n').map((block, i) => {
    if (block.startsWith('**') && block.endsWith('**')) {
      return (
        <h3 key={i} className="text-lg font-semibold text-gray-900 mt-6 mb-2">
          {block.slice(2, -2)}
        </h3>
      );
    }
    if (block.includes('\n')) {
      const lines = block.split('\n');
      const heading = lines[0];
      const rest = lines.slice(1);
      return (
        <div key={i}>
          {heading.startsWith('**') ? (
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">
              {heading.replace(/\*\*/g, '')}
            </h3>
          ) : (
            <p className="text-gray-600 leading-relaxed mb-3">{heading}</p>
          )}
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {rest.map((line, j) => (
              <li key={j}>{line.replace(/^\d+\.\s/, '').replace(/^-\s/, '')}</li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <p key={i} className="text-gray-600 leading-relaxed mb-3">
        {block.replace(/\*\*(.*?)\*\*/g, '$1')}
      </p>
    );
  });
}

export default function NewsPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featured = articles[0];
  const grid = articles.slice(1);

  return (
    <div className="min-h-screen bg-[#f8faff]">
      {/* Hero */}
      <section className="relative h-[480px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/news-hero.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/85 via-[#1e1b4b]/70 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <span className="inline-block bg-indigo-500/20 border border-indigo-400/40 text-indigo-200 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
              News & Insights
            </span>
            <Typography
              variant="h2"
              className="!font-bold !text-white !leading-tight"
              sx={{ fontSize: { xs: '2rem', md: '2.75rem' } }}
            >
              Stay ahead of the<br />
              <span className="text-indigo-300">B2B market</span>
            </Typography>
            <p className="text-slate-300 mt-4 text-lg leading-relaxed">
              Platform updates, market trends, vendor spotlights, and industry intelligence
              — curated for the modern B2B professional.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-px flex-1 bg-indigo-100" />
          <span className="text-xs font-bold tracking-widest text-indigo-500 uppercase">Featured Story</span>
          <span className="h-px flex-1 bg-indigo-100" />
        </div>

        <button
          onClick={() => setSelectedArticle(featured)}
          className="group w-full text-left bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative overflow-hidden h-72 md:h-auto">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="p-10 flex flex-col justify-center">
              <span
                className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full mb-4 w-fit ${categoryColorMap[featured.categoryColor]}`}
              >
                {featured.category}
              </span>
              <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-4 group-hover:text-indigo-600 transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6 text-[0.95rem]">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />
                  {featured.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <AccessTimeOutlinedIcon sx={{ fontSize: 14 }} />
                  {featured.readTime}
                </span>
                <span className="ml-auto flex items-center gap-1 text-indigo-600 font-medium group-hover:gap-2 transition-all">
                  Read more <ArrowForwardIcon sx={{ fontSize: 16 }} />
                </span>
              </div>
            </div>
          </div>
        </button>
      </section>

      {/* Article Grid */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <span className="text-xs font-bold tracking-widest text-indigo-500 uppercase">Latest Articles</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">More from the newsroom</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {grid.map((article) => (
              <button
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group text-left bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm bg-white/80 ${categoryColorMap[article.categoryColor]}`}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-[1.05rem] font-semibold text-gray-900 leading-snug mb-3 group-hover:text-indigo-600 transition-colors flex-1">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto pt-4 border-t border-gray-50">
                    <span className="flex items-center gap-1">
                      <CalendarTodayOutlinedIcon sx={{ fontSize: 12 }} />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <AccessTimeOutlinedIcon sx={{ fontSize: 12 }} />
                      {article.readTime}
                    </span>
                    <span className="ml-auto text-indigo-600 font-medium flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      Read <ArrowForwardIcon sx={{ fontSize: 13 }} />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 rounded-2xl mb-6">
            <EmailOutlinedIcon className="text-indigo-600" sx={{ fontSize: 28 }} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Never miss a market update</h2>
          <p className="text-gray-500 mb-8 text-lg">
            Get the latest B2B trade insights, platform news, and vendor spotlights delivered to your inbox every week.
          </p>
          {subscribed ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-8 py-5 font-medium text-lg">
              You're subscribed! We'll be in touch soon.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubscribed(true);
              }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="flex-1 px-5 py-3.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 text-[0.95rem] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-white shadow-sm"
              />
              <button
                type="submit"
                className="px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
          <p className="text-xs text-gray-400 mt-4">No spam. Unsubscribe at any time.</p>
        </div>
      </section>

      {/* Article Modal */}
      <Modal open={Boolean(selectedArticle)} onClose={() => setSelectedArticle(null)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95vw', sm: '90vw', md: '780px' },
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {selectedArticle && (
            <>
              <div className="relative h-56 flex-shrink-0">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white rounded-full p-1.5 hover:bg-white/40 transition-colors"
                >
                  <CloseIcon sx={{ fontSize: 20 }} />
                </button>
                <div className="absolute bottom-5 left-6 right-6">
                  <Chip
                    label={selectedArticle.category}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.15)',
                      color: 'white',
                      backdropFilter: 'blur(4px)',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                      mb: 1.5,
                    }}
                  />
                  <h2 className="text-xl font-bold text-white leading-snug">{selectedArticle.title}</h2>
                </div>
              </div>
              <div className="flex items-center gap-4 px-8 py-4 border-b border-gray-100 text-sm text-gray-400 flex-shrink-0">
                <span className="flex items-center gap-1.5">
                  <CalendarTodayOutlinedIcon sx={{ fontSize: 14 }} />
                  {selectedArticle.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <AccessTimeOutlinedIcon sx={{ fontSize: 14 }} />
                  {selectedArticle.readTime}
                </span>
              </div>
              <div className="overflow-y-auto px-8 py-6 flex-1">
                <div className="prose prose-gray max-w-none">
                  {renderContent(selectedArticle.content)}
                </div>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
