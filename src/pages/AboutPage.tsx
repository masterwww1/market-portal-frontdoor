import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

const timelineEvents = [
  {
    year: '2021',
    title: 'Feenix Founded',
    description:
      'Three ex-Stripe engineers and a logistics veteran come together with a simple idea: B2B trade is broken, and the internet can fix it. First seed round of $2.4M closed in September.',
  },
  {
    year: '2022',
    title: 'First 500 Vendors Onboarded',
    description:
      'We launched our closed beta with manufacturers in Turkey and Germany. By year-end, 500 verified vendors were live on the platform with a combined $120M in catalog value.',
  },
  {
    year: '2023',
    title: 'Series A: $18M',
    description:
      'Global commerce investors lead a $18M Series A. We expanded to 12 countries, launched our AI-powered compliance engine, and crossed 10,000 registered buyers.',
  },
  {
    year: '2024',
    title: 'Crossing $1B GMV',
    description:
      'Feenix becomes the first B2B marketplace to reach $1B in annual gross merchandise value in its third full year. Launched escrow protection and instant payment features.',
  },
  {
    year: '2025',
    title: 'Series B & Global Expansion',
    description:
      'We raised $52M in Series B funding and expanded operations into Southeast Asia, Latin America, and sub-Saharan Africa. Team grew to 180 people across 14 offices.',
  },
  {
    year: '2026',
    title: 'The Next Chapter',
    description:
      'Today, Feenix serves 45,000+ businesses in 68 countries. We\'re building toward a fully-automated intelligent marketplace — where every global trade happens with trust, speed, and clarity.',
  },
];

const teamMembers = [
  {
    id: 1,
    name: 'Amara Williams',
    title: 'Co-Founder & CEO',
    bio: 'Former Head of Payments at Stripe. Built two fintech startups before Feenix. Passionate about democratising global trade.',
    image: '/team-1.png',
  },
  {
    id: 2,
    name: 'Rohan Mehta',
    title: 'Co-Founder & CTO',
    bio: 'Ex-Google and Shopify engineer. Led platform scaling initiatives serving 100M+ transactions/month. Loves distributed systems and clean abstractions.',
    image: '/team-2.png',
  },
  {
    id: 3,
    name: 'Sarah Lindqvist',
    title: 'Chief Product Officer',
    bio: 'Previously VP of Product at a top-5 European B2B SaaS. Expert in marketplace dynamics, buyer psychology, and product-led growth.',
    image: '/team-3.png',
  },
  {
    id: 4,
    name: 'James Chen',
    title: 'VP of Operations',
    bio: 'Logistics and supply chain veteran with 12 years at global freight networks. Obsessed with making complex operations feel simple.',
    image: '/team-4.png',
  },
  {
    id: 5,
    name: 'Marco Rivera',
    title: 'Head of Growth',
    bio: 'Scaled three B2B SaaS platforms from zero to $50M ARR. Combines data science with creative marketing to find non-obvious growth levers.',
    image: '/team-5.png',
  },
  {
    id: 6,
    name: 'Layla Hassan',
    title: 'Chief Financial Officer',
    bio: 'CFA with experience at Goldman Sachs and two unicorn CFO roles. Built Feenix\'s financial infrastructure from first invoice to Series B.',
    image: '/team-6.png',
  },
];

const stats = [
  { value: 45000, suffix: '+', label: 'Businesses served' },
  { value: 68, suffix: '', label: 'Countries' },
  { value: 1.4, suffix: 'B+', label: 'Annual GMV', isDecimal: true },
  { value: 180, suffix: '+', label: 'Team members' },
];

const values = [
  {
    icon: <VerifiedOutlinedIcon sx={{ fontSize: 28 }} />,
    color: 'indigo',
    title: 'Trust above all',
    description:
      'Every feature we build — from escrow to vendor verification — starts with a single question: does this make buyers and sellers feel safe? Trust is the product.',
  },
  {
    icon: <PublicOutlinedIcon sx={{ fontSize: 28 }} />,
    color: 'emerald',
    title: 'Global by default',
    description:
      'We believe the best vendor for your needs might be 8,000 miles away. We build for the world from day one — multi-currency, multi-language, multi-jurisdiction.',
  },
  {
    icon: <LightbulbOutlinedIcon sx={{ fontSize: 28 }} />,
    color: 'amber',
    title: 'Relentlessly practical',
    description:
      'We don\'t build for press releases. We build tools that save a procurement manager two hours on a Tuesday. Simple, fast, reliable — that\'s the standard.',
  },
  {
    icon: <HandshakeOutlinedIcon sx={{ fontSize: 28 }} />,
    color: 'violet',
    title: 'Vendors are partners',
    description:
      'We succeed when our vendors succeed. That means fair fees, powerful tools, honest data, and always advocating for their growth alongside our own.',
  },
  {
    icon: <SecurityOutlinedIcon sx={{ fontSize: 28 }} />,
    color: 'rose',
    title: 'Transparency in everything',
    description:
      'Pricing, fees, performance data, dispute outcomes — we keep our platform transparent because opacity breeds mistrust, and mistrust kills markets.',
  },
  {
    icon: <GroupsOutlinedIcon sx={{ fontSize: 28 }} />,
    color: 'blue',
    title: 'Diverse perspectives win',
    description:
      'Our team spans 22 nationalities. We actively seek out voices from underrepresented markets because they surface problems and opportunities no one else sees.',
  },
];

const valueColorMap: Record<string, string> = {
  indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
  violet: 'bg-violet-50 text-violet-600 border-violet-100',
  rose: 'bg-rose-50 text-rose-600 border-rose-100',
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
};

function useCountUp(target: number, isDecimal = false, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target, isDecimal, duration]);

  return { count, ref };
}

function StatCard({ value, suffix, label, isDecimal }: (typeof stats)[0]) {
  const { count, ref } = useCountUp(value, isDecimal);
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-extrabold text-white mb-1">
        {isDecimal ? count.toFixed(1) : count.toLocaleString()}
        <span className="text-indigo-200">{suffix}</span>
      </div>
      <div className="text-indigo-200 font-medium">{label}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8faff]">
      {/* Hero */}
      <section className="relative h-[520px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/about-hero.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/60 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pb-14">
          <span className="inline-block bg-indigo-500/20 border border-indigo-400/40 text-indigo-200 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-4">
            About Feenix
          </span>
          <h1 className="text-5xl font-bold text-white leading-tight max-w-2xl">
            We're building the trust layer for global B2B trade.
          </h1>
          <p className="text-slate-300 mt-4 text-lg max-w-xl">
            Founded in 2021, Feenix connects manufacturers, distributors, and buyers across 68 countries
            with the infrastructure they need to trade with confidence.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold tracking-widest text-indigo-500 uppercase">Our Mission</span>
          <blockquote className="mt-6 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            "To make every B2B transaction in the world happen with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              trust, speed, and clarity
            </span>
            — regardless of borders, currencies, or complexity."
          </blockquote>
          <p className="mt-8 text-gray-500 text-lg max-w-2xl mx-auto">
            We believe the infrastructure of global trade is decades behind its potential. We're here to change that —
            one verified transaction at a time.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-indigo-500 uppercase">Our Story</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Five years of building</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              From a three-person apartment team to a global marketplace. Here's how we got here.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-indigo-100 transform -translate-x-1/2" />

            <div className="space-y-12">
              {timelineEvents.map((event, i) => (
                <div
                  key={event.year}
                  className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1 md:w-5/12">
                    <div
                      className={`bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${
                        i % 2 === 0 ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      <div
                        className={`inline-flex items-center gap-2 mb-3 ${
                          i % 2 === 0 ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        <span className="text-3xl font-extrabold text-indigo-600">{event.year}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{event.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-indigo-600 border-4 border-white shadow-md items-center justify-center z-10" />

                  {/* Spacer */}
                  <div className="hidden md:block flex-1 md:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-indigo-700 to-violet-700 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">By the numbers</h2>
            <p className="text-indigo-200 mt-2">The scale of trust we've built together</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-indigo-500 uppercase">Leadership</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Meet the team</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Builders, operators, and traders — united by the belief that global commerce deserves better infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group bg-[#f8faff] rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-indigo-600 text-sm font-medium mb-3">{member.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-indigo-500 uppercase">Our Values</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">What we believe</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Six principles that guide every product decision, partnership, and hire at Feenix.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-5 ${valueColorMap[value.color]}`}
                >
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f172a] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join us on this journey</h2>
          <p className="text-slate-400 text-lg mb-8">
            Whether you're a vendor, a buyer, or a builder — there's a place for you in the Feenix ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink
              to="/careers"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all no-underline"
            >
              View open roles <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </RouterLink>
            <RouterLink
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all no-underline"
            >
              Contact us
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  );
}
