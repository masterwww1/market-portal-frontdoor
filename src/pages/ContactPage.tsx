import { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  Box,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const inquiryTypes = [
  'General enquiry',
  'Partnership / vendor onboarding',
  'Career application',
  'Press & media',
  'Technical support',
  'Other',
];

interface FormState {
  name: string;
  email: string;
  company: string;
  inquiry: string;
  message: string;
}

const emptyForm: FormState = {
  name: '',
  email: '',
  company: '',
  inquiry: '',
  message: '',
};

const contactItems = [
  {
    icon: <EmailOutlinedIcon sx={{ fontSize: 22, color: '#3b82f6' }} />,
    label: 'Email us',
    value: 'hello@b2bmarket.io',
    href: 'mailto:hello@b2bmarket.io',
  },
  {
    icon: <PhoneOutlinedIcon sx={{ fontSize: 22, color: '#3b82f6' }} />,
    label: 'Call us',
    value: '+90 212 000 0000',
    href: 'tel:+902120000000',
  },
  {
    icon: <LocationOnOutlinedIcon sx={{ fontSize: 22, color: '#3b82f6' }} />,
    label: 'Head office',
    value: 'Istanbul, Turkey',
    href: 'https://maps.google.com/?q=Istanbul,Turkey',
  },
];

export function ContactPage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address';
    }
    if (!form.inquiry) next.inquiry = 'Please select an inquiry type';
    if (!form.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="w-full relative">
        <img
          src="/b2bmarket-contact-bg.png"
          alt="B2Bmarket team meeting"
          className="w-full block"
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
              <EmailOutlinedIcon sx={{ color: '#93c5fd', fontSize: 20 }} />
              <Typography
                variant="overline"
                sx={{ color: '#93c5fd', fontWeight: 700, letterSpacing: 2 }}
              >
                Get in touch
              </Typography>
            </div>
            <Typography
              variant="h2"
              fontWeight={800}
              sx={{ color: '#fff', lineHeight: 1.15, mb: 1.5, fontSize: { xs: '1.6rem', md: '2.4rem' } }}
            >
              We'd love to&nbsp;
              <span style={{ color: '#60a5fa' }}>hear from you</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#e2e8f0', fontWeight: 400, maxWidth: 520, lineHeight: 1.65 }}
            >
              Whether you're a vendor looking to list, a buyer exploring the platform, or
              a potential team member — drop us a message.
            </Typography>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Contact details
              </Typography>
              <Typography variant="body2" color="text.secondary" className="leading-relaxed">
                Our team typically responds within one business day.
                For urgent matters, give us a call.
              </Typography>
            </div>

            <div className="space-y-4">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-start gap-3 group no-underline"
                >
                  <div className="mt-0.5 p-2 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <Typography
                      variant="caption"
                      sx={{ color: '#6b7280', fontWeight: 600, display: 'block', lineHeight: 1.4 }}
                    >
                      {item.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{ color: '#0a2540', 'a:hover &': { color: '#3b82f6' } }}
                    >
                      {item.value}
                    </Typography>
                  </div>
                </a>
              ))}
            </div>

            <Box
              className="rounded-2xl p-5"
              sx={{ bgcolor: '#f0f7ff', border: '1px solid #bfdbfe' }}
            >
              <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ color: '#1e40af' }}>
                Looking to join the team?
              </Typography>
              <Typography variant="body2" sx={{ color: '#1e40af', opacity: 0.8, lineHeight: 1.6 }}>
                Check out our{' '}
                <a href="/careers" className="underline font-semibold">
                  open roles
                </a>{' '}
                or select "Career application" in the form — we'd love to hear from you.
              </Typography>
            </Box>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                  <CheckCircleOutlineIcon sx={{ fontSize: 56, color: '#22c55e' }} />
                  <Typography variant="h6" fontWeight={700}>
                    Message sent!
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="max-w-xs">
                    Thanks for reaching out. We'll get back to you within one business day.
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => { setSubmitted(false); setForm(emptyForm); }}
                    sx={{ mt: 1, borderRadius: 2, textTransform: 'none' }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Send us a message
                  </Typography>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField
                      label="Full name"
                      value={form.name}
                      onChange={handleChange('name')}
                      error={!!errors.name}
                      helperText={errors.name}
                      fullWidth
                      size="small"
                      required
                    />
                    <TextField
                      label="Work email"
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      error={!!errors.email}
                      helperText={errors.email}
                      fullWidth
                      size="small"
                      required
                    />
                  </div>

                  <TextField
                    label="Company (optional)"
                    value={form.company}
                    onChange={handleChange('company')}
                    fullWidth
                    size="small"
                  />

                  <TextField
                    select
                    label="What's this about?"
                    value={form.inquiry}
                    onChange={handleChange('inquiry')}
                    error={!!errors.inquiry}
                    helperText={errors.inquiry}
                    fullWidth
                    size="small"
                    required
                  >
                    {inquiryTypes.map((opt) => (
                      <MenuItem key={opt} value={opt}>
                        {opt}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label="Your message"
                    value={form.message}
                    onChange={handleChange('message')}
                    error={!!errors.message}
                    helperText={errors.message}
                    fullWidth
                    multiline
                    rows={5}
                    required
                  />

                  {Object.keys(errors).length > 0 && (
                    <Alert severity="error" variant="outlined">
                      Please fix the errors above before submitting.
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={submitting}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 700,
                      py: 1.25,
                    }}
                  >
                    {submitting ? 'Sending…' : 'Send message'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
