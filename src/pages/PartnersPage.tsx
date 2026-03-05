import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';

const vendorBenefits = [
  'List your entire catalog in under 24 hours',
  'Reach 40,000+ verified B2B buyers globally',
  'Instant escrow — get paid on delivery, not after chasing',
  'AI-generated product descriptions and SEO tags',
  'Dedicated onboarding specialist and priority support',
  'Real-time analytics: views, inquiries, and conversion',
  'Flexible pricing: fixed, RFQ, or volume tiers',
  'Logistics integration with 50+ global carriers',
];

const buyerBenefits = [
  'Access 8,000+ verified, quality-checked vendors',
  'Smart RFQ — top 5 vendor matches in 60 seconds',
  'Escrow protection on every order',
  'Trade financing options through our fintech partners',
  'Real-time shipment tracking and customs documentation',
  'Consolidated invoicing across all suppliers',
  'Multi-currency support across 68 countries',
  'Dedicated procurement manager for enterprise accounts',
];

const testimonials = [
  {
    id: 1,
    quote:
      "Feenix transformed our procurement process. We sourced from three new countries last quarter — markets we'd never have accessed through traditional channels. The escrow model gave our finance team the confidence to move fast.",
    name: 'Robert Hargrove',
    title: 'Chief Procurement Officer',
    company: 'Allied Industrial Group',
    image: '/testimonial-1.png',
  },
  {
    id: 2,
    quote:
      "Within 6 months of listing on Feenix, we had buyers from Germany, the UAE, and South Korea. The platform handles compliance documentation automatically — saving us days of work per shipment. It's genuinely changed our business.",
    name: 'Priya Sharma',
    title: 'Managing Director',
    company: 'Precision Components Ltd.',
    image: '/testimonial-2.png',
  },
  {
    id: 3,
    quote:
      "As a regional distributor entering the digital marketplace for the first time, Feenix's onboarding team was exceptional. They understood our business model and helped us structure our listings for maximum visibility.",
    name: 'David Okonkwo',
    title: 'VP of Business Development',
    company: 'TransAfrica Trade Partners',
    image: '/testimonial-3.png',
  },
];

const partnerLogos = [
  { name: 'Nexara', initials: 'NX', color: 'from-blue-600 to-blue-700' },
  { name: 'Trade Bridge', initials: 'TB', color: 'from-emerald-600 to-emerald-700' },
  { name: 'Apex Industries', initials: 'AI', color: 'from-indigo-600 to-indigo-700' },
  { name: 'GlobalPak', initials: 'GP', color: 'from-violet-600 to-violet-700' },
  { name: 'SteelCore', initials: 'SC', color: 'from-gray-600 to-gray-700' },
  { name: 'MedXport', initials: 'MX', color: 'from-rose-600 to-rose-700' },
  { name: 'AgroLink', initials: 'AL', color: 'from-lime-600 to-lime-700' },
  { name: 'TechSource', initials: 'TS', color: 'from-cyan-600 to-cyan-700' },
];

const partnerStats = [
  { icon: <TrendingUpOutlinedIcon sx={{ fontSize: 28 }} />, value: '34%', label: 'avg. revenue increase for vendors in year 1' },
  { icon: <VerifiedOutlinedIcon sx={{ fontSize: 28 }} />, value: '99.2%', label: 'escrow dispute resolution rate' },
  { icon: <SupportAgentOutlinedIcon sx={{ fontSize: 28 }} />, value: '< 2h', label: 'median support response time' },
  { icon: <PaymentsOutlinedIcon sx={{ fontSize: 28 }} />, value: '$0', label: 'setup cost — pay only on success' },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#f8faff]">
      {/* Hero — pure gradient, floating glass cards */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] py-28 px-6">
        {/* Floating orbs */}
        <div className="absolute top-10 right-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Floating glass cards */}
        <div className="absolute top-16 right-12 hidden lg:block">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white">
            <div className="text-2xl font-bold">8,000+</div>
            <div className="text-indigo-200 text-sm">Verified Vendors</div>
          </div>
        </div>
        <div className="absolute bottom-20 right-40 hidden lg:block">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white">
            <div className="text-2xl font-bold">68</div>
            <div className="text-indigo-200 text-sm">Countries</div>
          </div>
        </div>
        <div className="absolute top-40 right-64 hidden xl:block">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 text-white">
            <div className="text-2xl font-bold">$1.4B+</div>
            <div className="text-indigo-200 text-sm">Annual GMV</div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <span className="inline-block bg-indigo-500/20 border border-indigo-400/40 text-indigo-200 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
              Partners
            </span>
            <h1 className="text-5xl font-bold text-white leading-tight mb-6">
              Grow your business<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">
                on the world's most trusted
              </span><br />
              B2B marketplace.
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl">
              Whether you're a vendor looking to scale globally or a buyer seeking reliable sourcing —
              Feenix gives you the infrastructure to trade with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#become-vendor"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all no-underline"
              >
                Become a Vendor <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </a>
              <a
                href="#become-buyer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all no-underline"
              >
                Become a Buyer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {partnerStats.map((stat) => (
            <div key={stat.label} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-extrabold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5 leading-tight">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vendor / Buyer Split */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Vendor */}
          <div id="become-vendor" className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                <StorefrontOutlinedIcon sx={{ fontSize: 30 }} />
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest text-indigo-500 uppercase">For Vendors</span>
                <h2 className="text-2xl font-bold text-gray-900">Become a Vendor</h2>
              </div>
            </div>
            <p className="text-gray-500 mb-8 leading-relaxed">
              List your products, reach enterprise buyers worldwide, and get paid securely — all from one platform.
              Our average vendor sees a 34% revenue increase in their first year.
            </p>
            <ul className="space-y-3 mb-10">
              {vendorBenefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircleOutlineIcon className="text-indigo-500 flex-shrink-0 mt-0.5" sx={{ fontSize: 18 }} />
                  <span className="text-gray-600 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
            <RouterLink
              to="/contact"
              className="inline-flex items-center gap-2 w-full justify-center py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all no-underline"
            >
              Apply as a Vendor <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </RouterLink>
            <p className="text-center text-xs text-gray-400 mt-3">Free to list. Commission only on completed orders.</p>
          </div>

          {/* Buyer */}
          <div id="become-buyer" className="bg-gradient-to-br from-[#0f172a] to-[#1e1b4b] rounded-3xl p-10 shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-indigo-300">
                  <ShoppingBagOutlinedIcon sx={{ fontSize: 30 }} />
                </div>
                <div>
                  <span className="text-xs font-bold tracking-widest text-indigo-300 uppercase">For Buyers</span>
                  <h2 className="text-2xl font-bold text-white">Become a Buyer</h2>
                </div>
              </div>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Access the world's best manufacturers and distributors from a single platform.
                With Smart RFQ, escrow protection, and real-time logistics — sourcing has never been simpler.
              </p>
              <ul className="space-y-3 mb-10">
                {buyerBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircleOutlineIcon className="text-indigo-400 flex-shrink-0 mt-0.5" sx={{ fontSize: 18 }} />
                    <span className="text-slate-300 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
              <RouterLink
                to="/contact"
                className="inline-flex items-center gap-2 w-full justify-center py-4 bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all no-underline"
              >
                Register as a Buyer <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </RouterLink>
              <p className="text-center text-xs text-indigo-300/70 mt-3">Free buyer account. Premium features from $49/mo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-indigo-500 uppercase">Trusted Partners</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-2">Businesses that grow with Feenix</h2>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
            {partnerLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex flex-col items-center gap-2 group"
                title={logo.name}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${logo.color} flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-110 transition-transform`}
                >
                  {logo.initials}
                </div>
                <span className="text-xs text-gray-400 font-medium hidden md:block">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-indigo-500 uppercase">Testimonials</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">What our partners say</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Real results from real businesses. Here's how Feenix has changed how they trade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <FormatQuoteIcon className="text-indigo-200" sx={{ fontSize: 40 }} />
                <p className="text-gray-600 leading-relaxed mt-3 flex-1 text-sm italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-50">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover object-top flex-shrink-0"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                    <div className="text-xs text-gray-500">{testimonial.title}</div>
                    <div className="text-xs text-indigo-600 font-medium">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-violet-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to grow with Feenix?</h2>
          <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of vendors and buyers who are already trading smarter, faster, and with total confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white text-indigo-700 font-bold rounded-xl hover:shadow-xl hover:shadow-indigo-700/30 transition-all no-underline"
            >
              Get started today <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </RouterLink>
            <RouterLink
              to="/about"
              className="inline-flex items-center gap-2 px-10 py-4 bg-white/15 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/25 transition-all no-underline"
            >
              Learn more about us
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  );
}
