import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  StorefrontOutlined as StoreIcon,
  ShoppingBagOutlined as BagIcon,
  VerifiedOutlined as VerifiedIcon,
  RocketLaunchOutlined as RocketIcon,
  BarChartOutlined as ChartIcon,
  SecurityOutlined as SecurityIcon,
  CheckCircleOutline as CheckIcon,
  ArrowForward as ArrowIcon,
  East as EastIcon,
  Groups as GroupsIcon,
} from '@mui/icons-material';
import { PublicNav, PublicFooter } from '@/components/PublicLayout';

// ── Count-up animation hook ──────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.5 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const startTs = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return { value, ref };
}

// ── Dashboard mockup card in hero ────────────────────────────────────────────
function DashboardPreview() {
  const bars = [3, 5, 4, 7, 6, 8, 9, 8, 11, 10, 9, 12];
  return (
    <div className="relative w-full max-w-[420px] mx-auto" style={{ animation: 'float 6s ease-in-out infinite' }}>
      {/* Main window card */}
      <div className="glass-card rounded-2xl p-5 shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 mb-5">
          <div className="w-3 h-3 rounded-full bg-red-400/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <div className="w-3 h-3 rounded-full bg-green-400/80" />
          <span className="text-white/40 text-xs ml-3 font-mono">B2Bmarket · Dashboard</span>
        </div>

        {/* Mini stat row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Vendors',  value: '247',    color: '#635bff' },
            { label: 'Products', value: '1.2K',   color: '#00c9a7' },
            { label: 'Value',    value: '$2.4M',  color: '#ffc107' },
          ].map(({ label, value, color }) => (
            <div key={label} className="glass-card rounded-xl p-3">
              <p className="text-white text-base font-bold leading-none" style={{ color }}>{value}</p>
              <p className="text-white/50 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Mini chart */}
        <div className="glass-card rounded-xl p-3 mb-3">
          <p className="text-white/50 text-[11px] mb-2 uppercase tracking-wide">Platform Growth</p>
          <div className="flex items-end gap-0.5 h-10">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm transition-all"
                style={{
                  height: `${(h / 12) * 100}%`,
                  backgroundColor: i >= bars.length - 3 ? '#635bff' : 'rgba(99,91,255,0.3)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="space-y-2">
          {[
            { dot: '#00c9a7', text: 'Acme Industries joined as vendor' },
            { dot: '#635bff', text: 'New listing: Industrial Steel Beams' },
            { dot: '#ffc107', text: 'Purchase order #4521 submitted' },
          ].map(({ dot, text }) => (
            <div key={text} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: dot }} />
              <p className="text-white/60 text-xs truncate">{text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating accent cards */}
      <div
        className="absolute -top-5 -right-8 glass-card rounded-xl px-4 py-2.5 shadow-xl"
        style={{ animation: 'float-slow 4s ease-in-out infinite 1s' }}
      >
        <p className="text-emerald-300 text-sm font-bold">+18%</p>
        <p className="text-white/50 text-xs">Monthly Growth</p>
      </div>

      <div
        className="absolute -bottom-5 -left-8 glass-card rounded-xl px-4 py-2.5 shadow-xl"
        style={{ animation: 'float-slow 5s ease-in-out infinite 0.5s' }}
      >
        <p className="text-white text-sm font-bold">99.9%</p>
        <p className="text-white/50 text-xs">Uptime SLA</p>
      </div>
    </div>
  );
}

// ── Stat item with count-up ──────────────────────────────────────────────────
interface StatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  desc: string;
}

function StatItem({ value, suffix = '', prefix = '', label, desc }: StatProps) {
  const { value: displayed, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center px-6 py-2">
      <p className="text-4xl font-black text-gray-900 leading-none mb-1">
        {prefix}{displayed.toLocaleString()}{suffix}
      </p>
      <p className="text-base font-bold text-gray-700">{label}</p>
      <p className="text-sm text-gray-400 mt-0.5">{desc}</p>
    </div>
  );
}

// ── Feature card ─────────────────────────────────────────────────────────────
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent: string;
  bg: string;
}

function FeatureCard({ icon, title, desc, accent, bg }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: bg }}>
        <span style={{ color: accent }}>{icon}</span>
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

// ── Mock product card (used in features section) ──────────────────────────────
function ProductMockCard() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 w-full max-w-[320px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">CATALOG</span>
        <span className="text-xs text-gray-400">1,200+ items</span>
      </div>
      {[
        { name: 'Industrial Steel Rods',   vendor: 'Acme Industries',    price: '$480/ton',  tag: 'In Stock' },
        { name: 'Aluminum Sheet 6061-T6',  vendor: 'MetalMax Corp',      price: '$1,240/lot', tag: 'Bulk' },
        { name: 'Carbon Fiber Composite',  vendor: 'TechMat Solutions',  price: '$3,600/kg',  tag: 'Express' },
      ].map(({ name, vendor, price, tag }) => (
        <div key={name} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-100 to-teal-100 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-900 truncate">{name}</p>
            <p className="text-xs text-gray-400">{vendor}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-xs font-bold text-gray-900">{price}</p>
            <span className="text-[10px] text-teal-600 font-semibold">{tag}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function VendorMockCard() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 w-full max-w-[320px] mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">VENDOR PORTAL</span>
        <span className="text-xs text-emerald-600 font-semibold">Active</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: 'Total Products', value: '34' },
          { label: 'Active Orders',  value: '12' },
          { label: 'Revenue MTD',    value: '$28K' },
          { label: 'Enquiries',      value: '7' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-50 rounded-xl p-3">
            <p className="text-base font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
          </div>
        ))}
      </div>
      <div className="bg-indigo-50 rounded-xl p-3 text-center">
        <p className="text-xs font-semibold text-indigo-700">+ 3 new buyer inquiries today</p>
      </div>
    </div>
  );
}

// ── Main Landing Page ─────────────────────────────────────────────────────────
export function LandingPage() {
  return (
    <div className="min-h-screen text-gray-900">
      <PublicNav />

      {/* ── Hero Section ──────────────────────────────────────────────── */}
      <section className="hero-bg min-h-screen flex items-center relative overflow-hidden pt-16">
        {/* Animated orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(99,91,255,0.18) 0%, transparent 70%)',
            animation: 'orb-drift 12s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,201,167,0.12) 0%, transparent 70%)',
            animation: 'orb-drift 16s ease-in-out infinite 4s',
          }}
        />

        <div className="max-w-7xl mx-auto px-6 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — Copy */}
            <div style={{ animation: 'fade-up 0.8s ease both' }}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                <RocketIcon sx={{ fontSize: 14 }} />
                B2B Marketplace Platform
              </div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Trade{' '}
                <span className="gradient-text">Smarter.</span>
                <br />
                Scale{' '}
                <span className="gradient-text">Faster.</span>
              </h1>

              <p className="text-lg text-white/65 leading-relaxed mb-8 max-w-lg">
                Connect with verified vendors, discover quality products, and manage your entire
                B2B commerce operation — in one powerful marketplace platform.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <RouterLink
                  to="/login"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg shadow-indigo-900/40 transition-all hover:shadow-indigo-900/60 hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #635bff 0%, #4f46e5 100%)' }}
                >
                  Get Started Free
                  <ArrowIcon sx={{ fontSize: 18 }} />
                </RouterLink>
                <RouterLink
                  to="/contact"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white border border-white/20 hover:bg-white/10 transition-colors"
                >
                  Talk to Sales
                </RouterLink>
              </div>

              {/* Trust bar */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-white/50 text-sm">
                {[
                  'No credit card required',
                  'Setup in minutes',
                  '99.9% uptime SLA',
                ].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckIcon sx={{ fontSize: 14, color: '#00c9a7' }} />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Dashboard preview */}
            <div
              className="hidden lg:flex justify-center items-center"
              style={{ animation: 'fade-up 0.8s ease 0.2s both' }}
            >
              <DashboardPreview />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #f6f9fc)' }}
        />
      </section>

      {/* ── Stats Section ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-y md:divide-y-0 divide-gray-100">
            <StatItem value={247}  suffix="+"    label="Active Vendors"   desc="Verified business partners" />
            <StatItem value={1200} suffix="+"    label="Products Listed"  desc="Across all categories" />
            <StatItem value={99}   suffix=".9%"  label="Platform Uptime"  desc="Enterprise-grade reliability" />
            <StatItem value={2400} prefix="$"  suffix="M+" label="Trade Volume"  desc="Processed through the platform" />
          </div>
        </div>
      </section>

      {/* ── For Vendors Section ───────────────────────────────────────── */}
      <section className="py-24 bg-[#f8faff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-purple-700 bg-purple-50 text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
                <StoreIcon sx={{ fontSize: 14 }} />
                For Vendors
              </div>
              <h2 className="text-4xl font-black text-gray-900 leading-tight mb-4">
                Grow your B2B sales with a{' '}
                <span className="gradient-text">powerful catalog.</span>
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                List your products, manage inventory, and connect with thousands of qualified buyers
                — all from one intuitive vendor portal.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { title: 'Effortless product management',  desc: 'Create, update, and organize your entire catalog with smart tools.' },
                  { title: 'Reach verified buyers',          desc: 'Your products appear in front of pre-qualified B2B buyers actively searching.' },
                  { title: 'Real-time order tracking',       desc: 'Monitor inquiries, orders, and revenue from a single dashboard.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon sx={{ fontSize: 12, color: 'white' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{title}</p>
                      <p className="text-sm text-gray-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <RouterLink
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-800 transition-colors"
              >
                Join as a vendor <EastIcon sx={{ fontSize: 16 }} />
              </RouterLink>
            </div>

            <div>
              <VendorMockCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── For Buyers Section ────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Card first on desktop */}
            <div className="order-2 lg:order-1">
              <ProductMockCard />
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-teal-700 bg-teal-50 text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
                <BagIcon sx={{ fontSize: 14 }} />
                For Buyers
              </div>
              <h2 className="text-4xl font-black text-gray-900 leading-tight mb-4">
                Source smarter from{' '}
                <span className="gradient-text">verified vendors.</span>
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Discover thousands of quality products, compare suppliers, and streamline your
                entire procurement process in one place.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { title: 'Curated vendor marketplace',    desc: 'Every vendor is verified and vetted before listing on our platform.' },
                  { title: 'Advanced product search',       desc: 'Filter by category, price, availability, location, and more.' },
                  { title: 'Streamlined procurement',       desc: 'Send RFQs, compare quotes, and place orders — all in one workflow.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon sx={{ fontSize: 12, color: 'white' }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{title}</p>
                      <p className="text-sm text-gray-500">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <RouterLink
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-800 transition-colors"
              >
                Start sourcing now <EastIcon sx={{ fontSize: 16 }} />
              </RouterLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Grid ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#f8faff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-3">
              Everything you need to{' '}
              <span className="gradient-text">trade B2B</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              A complete platform built for modern B2B commerce — from discovery to delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={<VerifiedIcon sx={{ fontSize: 22 }} />}
              title="Verified Network"
              desc="Every vendor and buyer goes through our vetting process. Trade with confidence knowing every partner is legitimate."
              accent="#635bff"
              bg="#f0efff"
            />
            <FeatureCard
              icon={<ChartIcon sx={{ fontSize: 22 }} />}
              title="Live Analytics"
              desc="Real-time dashboards track inventory, orders, revenue, and market trends. Make data-driven decisions instantly."
              accent="#00c9a7"
              bg="#e6faf7"
            />
            <FeatureCard
              icon={<SecurityIcon sx={{ fontSize: 22 }} />}
              title="Secure Transactions"
              desc="Bank-grade encryption on every transaction. Your business data and payment information are always protected."
              accent="#dc2626"
              bg="#fef2f2"
            />
            <FeatureCard
              icon={<GroupsIcon sx={{ fontSize: 22 }} />}
              title="Smart Matching"
              desc="Our algorithm connects buyers with the most relevant vendors based on category, location, and purchase history."
              accent="#f59e0b"
              bg="#fffbeb"
            />
            <FeatureCard
              icon={<RocketIcon sx={{ fontSize: 22 }} />}
              title="Fast Onboarding"
              desc="Go live in minutes. Import your existing catalog, set pricing, and start receiving inquiries the same day."
              accent="#7c3aed"
              bg="#f5f3ff"
            />
            <FeatureCard
              icon={<StoreIcon sx={{ fontSize: 22 }} />}
              title="Multi-Portal Access"
              desc="Role-based portals for vendors, buyers, and admins. Everyone gets a tailored experience for their workflow."
              accent="#0284c7"
              bg="#f0f9ff"
            />
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-gray-900 mb-3">Get started in minutes</h2>
            <p className="text-gray-500 text-lg">Three simple steps to transform your B2B commerce.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 relative">
            {/* Connecting line (desktop only) */}
            <div
              className="hidden md:block absolute top-6 left-[16.67%] right-[16.67%] h-0.5 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #635bff44, #00c9a744)' }}
            />

            {[
              {
                n: 1,
                icon: '🏢',
                title: 'Create your account',
                desc: 'Register as a vendor to list products, or as a buyer to source them. Verification takes under an hour.',
              },
              {
                n: 2,
                icon: '📦',
                title: 'Build your profile',
                desc: 'Vendors add their catalog. Buyers set product preferences and categories they source from.',
              },
              {
                n: 3,
                icon: '🤝',
                title: 'Start trading',
                desc: 'Connect with partners, submit inquiries, manage orders, and grow your B2B revenue.',
              },
            ].map(({ n, icon, title, desc }) => (
              <div key={n} className="flex flex-col items-center text-center px-8 py-4 relative z-10">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg mb-5"
                  style={{ background: 'linear-gradient(135deg, #635bff 0%, #00c9a7 100%)' }}
                >
                  {n}
                </div>
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a2540 0%, #1a1065 50%, #0f2547 100%)' }}
      >
        {/* Orb */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(99,91,255,0.12) 0%, transparent 70%)' }}
        />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            <VerifiedIcon sx={{ fontSize: 14 }} />
            Trusted by businesses worldwide
          </div>
          <h2 className="text-5xl font-black text-white leading-tight mb-5">
            Ready to join the{' '}
            <span className="gradient-text">B2B revolution?</span>
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Join hundreds of vendors and buyers already trading on the platform.
            Get started today — no commitment required.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <RouterLink
              to="/login"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-xl shadow-indigo-900/50 transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #635bff 0%, #4f46e5 100%)' }}
            >
              Get Started Free
              <ArrowIcon sx={{ fontSize: 18 }} />
            </RouterLink>
            <RouterLink
              to="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-colors"
            >
              Contact Sales
            </RouterLink>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
