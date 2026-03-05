import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Chip,
  Collapse,
  Divider,
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
    icon: '🚀',
    title: 'Move fast, stay precise',
    body: 'We ship frequently but never cut corners on correctness. Speed and quality are not opposites.',
  },
  {
    icon: '🤝',
    title: 'Vendors & buyers first',
    body: 'Every decision starts with the question: does this make trade better for the people using our platform?',
  },
  {
    icon: '🌍',
    title: 'Distributed by default',
    body: 'Our team spans continents. We write clearly, communicate asynchronously, and trust each other.',
  },
  {
    icon: '📈',
    title: 'Grow together',
    body: 'We invest in mentorship, learning budgets, and career tracks so everyone levels up alongside the company.',
  },
];

function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <button
        className="w-full text-left p-6 flex items-start justify-between gap-4 group"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Chip
              label={job.team}
              size="small"
              sx={{ bgcolor: '#e8f0fe', color: '#1a56db', fontWeight: 600, fontSize: 11 }}
            />
            {job.tags.map((t) => (
              <Chip key={t} label={t} size="small" variant="outlined" sx={{ fontSize: 11 }} />
            ))}
          </div>
          <Typography variant="h6" fontWeight={700} className="text-gray-900 mb-1">
            {job.title}
          </Typography>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />
              {job.type}
            </span>
          </div>
        </div>
        <span className="flex-shrink-0 mt-1 text-gray-400 group-hover:text-blue-600 transition-colors">
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </span>
      </button>

      <Collapse in={open}>
        <Divider />
        <div className="p-6 pt-5 space-y-5">
          <Typography variant="body2" color="text.secondary" className="leading-relaxed">
            {job.description}
          </Typography>

          <div>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              What you'll do
            </Typography>
            <ul className="space-y-1">
              {job.responsibilities.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-gray-600">
                  <span className="mt-0.5 text-blue-500 flex-shrink-0">•</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              What we're looking for
            </Typography>
            <ul className="space-y-1">
              {job.requirements.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-gray-600">
                  <span className="mt-0.5 text-blue-500 flex-shrink-0">•</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <Button
            variant="contained"
            component={RouterLink}
            to="/contact"
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
          >
            Apply for this role
          </Button>
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
      <section className="max-w-5xl mx-auto px-6 py-16">
        <Typography variant="h5" fontWeight={700} className="text-gray-900 mb-2">
          How we work
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-8">
          A few principles that guide our day-to-day.
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-3">{v.icon}</div>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                {v.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="leading-relaxed">
                {v.body}
              </Typography>
            </div>
          ))}
        </div>
      </section>

      {/* Open Roles */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <Typography variant="h5" fontWeight={700} className="text-gray-900 mb-2">
          Open roles
        </Typography>
        <Typography variant="body2" color="text.secondary" className="mb-8">
          We're actively hiring across all teams. Click a role to read more and apply.
        </Typography>
        <div className="space-y-4">
          {openRoles.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <Box
          className="mt-10 rounded-2xl p-8 text-center"
          sx={{ bgcolor: '#f0f7ff', border: '1px solid #bfdbfe' }}
        >
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Don't see the right role?
          </Typography>
          <Typography variant="body2" color="text.secondary" className="mb-4">
            We're always keen to meet talented people. Send us a note and tell us what you're great at.
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/contact"
            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}
          >
            Get in touch
          </Button>
        </Box>
      </section>
    </div>
  );
}
