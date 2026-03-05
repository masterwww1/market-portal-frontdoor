import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Collapse } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface Job {
  id: number;
  title: string;
  team: string;
  location: string;
  type: string;
  tags: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const openRoles: Job[] = [
  {
    id: 1,
    title: 'Senior Full-Stack Engineer',
    team: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    description:
      'Join our core platform team to build the trading infrastructure powering thousands of B2B transactions daily.',
    responsibilities: [
      'Design and implement scalable APIs and front-end features',
      'Collaborate closely with product and design on new marketplace capabilities',
      'Drive technical architecture discussions and code reviews',
      'Champion performance, security, and reliability best practices',
    ],
    requirements: [
      '5+ years of full-stack experience',
      'Strong proficiency with React and a Node.js backend framework',
      'Comfort working with relational databases (PostgreSQL preferred)',
      'Experience with cloud infrastructure (AWS / GCP)',
    ],
  },
  {
    id: 2,
    title: 'Product Manager — Marketplace',
    team: 'Product',
    location: 'Hybrid · Istanbul',
    type: 'Full-time',
    tags: ['B2B', 'SaaS', 'Marketplace'],
    description:
      'Own the end-to-end product strategy for our vendor and buyer marketplace, turning complex trade workflows into elegant experiences.',
    responsibilities: [
      'Define and prioritise the marketplace product roadmap',
      'Work with engineering, design, and sales to ship high-impact features',
      'Conduct user interviews and analyse data to surface insights',
      'Define success metrics and monitor post-launch outcomes',
    ],
    requirements: [
      '3+ years of product management in a B2B or marketplace product',
      'Fluency with data — SQL or BI tools a plus',
      'Excellent written and verbal communication',
      'Experience in e-commerce or supply-chain domains preferred',
    ],
  },
  {
    id: 3,
    title: 'Business Development Representative',
    team: 'Sales',
    location: 'Remote',
    type: 'Full-time',
    tags: ['Sales', 'Outbound', 'B2B'],
    description:
      'Help us grow the B2Bmarket vendor network by identifying and qualifying new business opportunities across key verticals.',
    responsibilities: [
      'Research and prospect enterprise vendors and distributors',
      'Run outbound sequences and manage pipeline in the CRM',
      'Qualify leads and hand off to Account Executives',
      'Contribute to playbook creation for new markets',
    ],
    requirements: [
      '1–3 years of B2B sales or SDR experience',
      'Strong written and spoken English (additional languages a bonus)',
      'Comfort with CRM tools (HubSpot, Salesforce, etc.)',
      'Self-directed with a track record of hitting targets',
    ],
  },
  {
    id: 4,
    title: 'UX / Product Designer',
    team: 'Design',
    location: 'Remote',
    type: 'Full-time',
    tags: ['Figma', 'UX Research', 'Design Systems'],
    description:
      'Shape how thousands of buyers and vendors experience trade — from onboarding flows to complex order management dashboards.',
    responsibilities: [
      'Lead end-to-end design from discovery through delivery',
      'Create wireframes, prototypes, and production-ready Figma files',
      'Maintain and evolve the B2Bmarket design system',
      'Partner with engineering to ensure pixel-perfect implementation',
    ],
    requirements: [
      '3+ years of product design for web applications',
      'Expert Figma skills and a strong portfolio',
      'Experience with complex data-heavy or transactional UIs',
      'Familiarity with component-based design systems',
    ],
  },
];

const values = [
  {
    img: '/b2b-card-dev-discussion.png',
    title: 'Precision at Every Step',
    body: 'We move quickly without sacrificing quality. Our engineering culture is rooted in rigorous code review, continuous delivery, and a shared commitment to correctness. Every feature we ship is deliberate — because reliability is the foundation our customers build their businesses on.',
  },
  {
    img: '/b2b-card-vendor-onboarding.png',
    title: 'Partnerships That Last',
    body: 'Every product decision begins with a single question: does this create real value for the vendors and buyers on our platform? We work hand-in-hand with our partners from day one, treating their growth as our own and building relationships that extend well beyond the initial onboarding.',
  },
  {
    img: '/b2b-card-remote-team.png',
    title: 'Global Team, One Mission',
    body: 'Our team operates across time zones without losing cohesion. We communicate with clarity, document decisions thoroughly, and trust each other to deliver. Being distributed is not a limitation — it is how we access world-class talent and build a genuinely inclusive workplace.',
  },
  {
    img: '/b2b-card-grow-together.png',
    title: 'Invest in Each Other',
    body: 'Growth at B2Bmarket is never a solo endeavour. We pair senior engineers with emerging talent, fund continuous learning through personal development budgets, and maintain transparent career tracks so every team member knows exactly where they stand and where they are headed.',
  },
];

const TEAM_META: Record<string, { color: string; bg: string; accent: string }> = {
  Engineering: { color: '#4f46e5', bg: '#eef2ff', accent: '#6366f1' },
  Product:     { color: '#0369a1', bg: '#e0f2fe', accent: '#0284c7' },
  Sales:       { color: '#047857', bg: '#d1fae5', accent: '#10b981' },
  Design:      { color: '#be185d', bg: '#fce7f3', accent: '#ec4899' },
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
          <CheckCircleOutlineIcon sx={{ fontSize: 16, color: '#635bff', mt: '2px', flexShrink: 0 }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const meta = TEAM_META[job.team] ?? { color: '#374151', bg: '#f3f4f6', accent: '#6b7280' };

  return (
    <div
      className="bg-white rounded-2xl border overflow-hidden transition-all duration-200"
      style={{
        borderColor: open ? meta.accent + '55' : '#e5e7eb',
        boxShadow: open
          ? `0 8px 30px ${meta.accent}18`
          : '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Clickable header row */}
      <button
        className="w-full text-left px-7 py-5 flex items-center gap-5 group"
        onClick={() => setOpen((v) => !v)}
      >
        {/* Team color bar */}
        <div
          className="hidden sm:block w-1 self-stretch rounded-full flex-shrink-0"
          style={{ backgroundColor: meta.accent }}
        />

        <div className="flex-1 min-w-0">
          {/* Top row: team badge + tags */}
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
              style={{ backgroundColor: meta.bg, color: meta.color }}
            >
              {job.team}
            </span>
            {job.tags.map((t) => (
              <span
                key={t}
                className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Job title */}
          <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2">
            {job.title}
          </h3>

          {/* Meta: location + type */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <LocationOnOutlinedIcon sx={{ fontSize: 15 }} />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <AccessTimeOutlinedIcon sx={{ fontSize: 15 }} />
              {job.type}
            </span>
          </div>
        </div>

        {/* Expand toggle */}
        <div
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            backgroundColor: open ? meta.bg : '#f9fafb',
            color: open ? meta.color : '#9ca3af',
          }}
        >
          {open ? <ExpandLessIcon sx={{ fontSize: 20 }} /> : <ExpandMoreIcon sx={{ fontSize: 20 }} />}
        </div>
      </button>

      {/* Expanded content */}
      <Collapse in={open}>
        <div
          className="px-7 pb-7"
          style={{ borderTop: `1px solid ${meta.accent}22` }}
        >
          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed mt-5 mb-6 max-w-2xl">
            {job.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-7">
            {/* Responsibilities */}
            <div>
              <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-1">
                What you'll do
              </p>
              <BulletList items={job.responsibilities} />
            </div>

            {/* Requirements */}
            <div>
              <p className="text-xs font-bold text-gray-700 uppercase tracking-widest mb-1">
                What we're looking for
              </p>
              <BulletList items={job.requirements} />
            </div>
          </div>

          {/* CTA */}
          <RouterLink
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white no-underline transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${meta.accent} 0%, ${meta.color} 100%)`,
              textDecoration: 'none',
            }}
          >
            Apply for this role
            <ArrowForwardIcon sx={{ fontSize: 16 }} />
          </RouterLink>
        </div>
      </Collapse>
    </div>
  );
}

export function CareerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="w-full relative overflow-hidden">
        <img
          src="/b2bmarket-hero-bg.png"
          alt="B2Bmarket team workspace"
          className="w-full block"
          style={{
            clipPath: 'inset(15% 0 15% 0)',
            marginTop: '-8.37%',
            marginBottom: '-8.37%',
          }}
        />
        {/* bottom-20% gradient fade + text */}
        <div
          className="absolute inset-x-0 bottom-0 flex items-end"
          style={{
            height: '40%',
            background: 'linear-gradient(to bottom, transparent, rgba(10,37,64,0.82))',
          }}
        >
          <div className="max-w-4xl w-full mx-auto px-6 pb-8">
            <div className="flex items-center gap-2 mb-2">
              <WorkOutlineIcon sx={{ color: '#93c5fd', fontSize: 20 }} />
              <Typography variant="overline" sx={{ color: '#93c5fd', fontWeight: 700, letterSpacing: 2 }}>
                Join B2Bmarket
              </Typography>
            </div>
            <Typography
              variant="h2"
              fontWeight={800}
              sx={{ color: '#fff', lineHeight: 1.15, mb: 1.5, fontSize: { xs: '1.6rem', md: '2.4rem' } }}
            >
              Build the future of&nbsp;
              <span style={{ color: '#60a5fa' }}>B2B trade</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#e2e8f0', fontWeight: 400, maxWidth: 520, lineHeight: 1.65 }}
            >
              We're a remote-first team connecting vendors and buyers across the globe.
              Come help us make commerce simpler, faster, and more trustworthy.
            </Typography>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: '#0a2540' }} className="w-full py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <Typography variant="overline" sx={{ color: '#93c5fd', fontWeight: 700, letterSpacing: 2, display: 'block', mb: 1 }}>
            Our principles
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ color: '#fff', mb: 1 }}>
            How we work
          </Typography>
          <Typography variant="body1" sx={{ color: '#94a3b8', mb: 6, maxWidth: 480 }}>
            A few principles that guide everything we do, from code review to customer calls.
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="flex flex-col rounded-2xl overflow-hidden group"
                style={{ background: '#112d4e', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* card image */}
                <div className="w-full overflow-hidden" style={{ height: 220 }}>
                  <img
                    src={v.img}
                    alt={v.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* card body */}
                <div className="flex flex-col flex-1 p-6">
                  <Typography variant="h6" fontWeight={700} sx={{ color: '#f1f5f9', mb: 1.5 }}>
                    {v.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8', lineHeight: 1.8 }}>
                    {v.body}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="bg-[#f8faff] py-20">
        <div className="max-w-5xl mx-auto px-6">
          {/* Section header */}
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
              <WorkOutlineIcon sx={{ fontSize: 13 }} />
              We're hiring
            </span>
            <h2 className="text-4xl font-black text-gray-900 leading-tight mb-3">
              Open roles
            </h2>
            <p className="text-gray-500 text-lg max-w-xl">
              We're actively hiring across all teams. Click any role to read more and apply.
            </p>
          </div>

          {/* Job cards */}
          <div className="space-y-4 mb-12">
            {openRoles.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {/* Don't see the right role CTA */}
          <div
            className="rounded-2xl p-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0a2540 0%, #1a3a5c 60%, #635bff 100%)' }}
          >
            {/* Decorative orb */}
            <div
              className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(99,91,255,0.3) 0%, transparent 70%)' }}
            />
            <div className="relative z-10">
              <p className="text-xs font-bold text-blue-300 uppercase tracking-widest mb-3">
                Open application
              </p>
              <h3 className="text-2xl font-black text-white mb-2">
                Don't see the right role?
              </h3>
              <p className="text-white/60 text-sm mb-6 max-w-sm mx-auto">
                We're always keen to meet talented people. Send us a note and tell us what you're great at.
              </p>
              <RouterLink
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white no-underline transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #635bff 0%, #4f46e5 100%)',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(99,91,255,0.4)',
                }}
              >
                Get in touch
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </RouterLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
