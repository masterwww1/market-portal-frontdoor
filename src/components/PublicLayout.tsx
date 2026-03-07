import { useState, useEffect, useCallback, ReactNode } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ArrowForward as ArrowIcon, East as EastIcon, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useAuth } from '@/core/contexts/AuthContext';
import { determineRole, buildPortalUrl } from '@/utils/subdomain';

interface PublicLayoutProps {
  children: ReactNode;
}

const NAV_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/news', label: 'News' },
  { to: '/partners', label: 'Partners' },
  { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

function PublicNav() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const useSolidHeader = scrolled || mobileOpen;

  useEffect(() => {
    const getScrollY = () =>
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    setScrolled(getScrollY() > 60);
    const handler = () => setScrolled(getScrollY() > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [location.pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const toDashboard = useCallback(() => {
    if (user) {
      window.location.href = buildPortalUrl(determineRole(user), '/dashboard');
    }
  }, [user]);

  // Top: transparent + white text. Scrolled: solid white bg + black text
  const brandColor = useSolidHeader ? '#000000' : '#ffffff';
  const linkColor = useSolidHeader
    ? (to: string) => location.pathname === to ? '#000000' : '#374151'
    : (to: string) => location.pathname === to ? 'white' : 'rgba(255,255,255,0.75)';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: useSolidHeader ? '#ffffff' : 'transparent',
        backdropFilter: useSolidHeader ? 'none' : 'blur(16px)',
        WebkitBackdropFilter: useSolidHeader ? 'none' : 'blur(16px)',
        boxShadow: useSolidHeader ? '0 1px 0 rgba(0,0,0,0.08)' : '0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <RouterLink
          to="/"
          className="font-black text-xl tracking-tight no-underline transition-colors"
          style={{ color: brandColor, textDecoration: 'none' }}
        >
          B2Bmarket
        </RouterLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ to, label }) => (
            <RouterLink
              key={to}
              to={to}
              className="text-sm font-medium transition-colors no-underline"
              style={{ color: linkColor(to), textDecoration: 'none' }}
            >
              {label}
            </RouterLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1 transition-colors"
          style={{ color: brandColor }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={toDashboard}
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              style={{
                background: useSolidHeader ? '#f1f5f9' : 'rgba(255,255,255,0.12)',
                color: useSolidHeader ? '#000000' : 'white',
              }}
            >
              Go to Dashboard
              <EastIcon sx={{ fontSize: 16 }} />
            </button>
          ) : (
            <RouterLink
              to="/login"
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all no-underline hover:opacity-90"
              style={{
                color: 'white',
                background: 'linear-gradient(135deg, #635bff 0%, #4f46e5 100%)',
                textDecoration: 'none',
              }}
            >
              Sign In
              <ArrowIcon sx={{ fontSize: 16 }} />
            </RouterLink>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-3"
          style={{
            background: useSolidHeader ? '#ffffff' : 'rgba(17,34,64,0.97)',
            borderTop: useSolidHeader ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.10)',
          }}
        >
          {NAV_LINKS.map(({ to, label }) => (
            <RouterLink
              key={to}
              to={to}
              className="text-sm font-medium py-2 no-underline last:border-0"
              style={{
                color: useSolidHeader
                  ? (location.pathname === to ? '#000000' : '#374151')
                  : (location.pathname === to ? 'white' : 'rgba(255,255,255,0.7)'),
                borderBottom: useSolidHeader ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.10)',
                textDecoration: 'none',
              }}
            >
              {label}
            </RouterLink>
          ))}
          {isAuthenticated ? (
            <button
              onClick={toDashboard}
              className="mt-2 flex items-center gap-2 text-sm font-semibold px-4 py-3 rounded-lg"
              style={{
                color: useSolidHeader ? '#000000' : 'white',
                background: useSolidHeader ? '#f1f5f9' : 'rgba(255,255,255,0.12)',
              }}
            >
              Go to Dashboard <EastIcon sx={{ fontSize: 16 }} />
            </button>
          ) : (
            <RouterLink
              to="/login"
              className="mt-2 flex items-center justify-center gap-2 text-white text-sm font-semibold px-4 py-3 rounded-lg no-underline"
              style={{ background: 'linear-gradient(135deg, #635bff 0%, #4f46e5 100%)', textDecoration: 'none' }}
            >
              Sign In <ArrowIcon sx={{ fontSize: 16 }} />
            </RouterLink>
          )}
        </div>
      )}
    </header>
  );
}

function PublicFooter() {
  return (
    <footer style={{ backgroundColor: '#0f172a' }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <p className="text-white font-black text-2xl mb-3">B2Bmarket</p>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              The unified B2B marketplace platform connecting vendors and buyers worldwide.
              Trade smarter. Scale faster.
            </p>
          </div>

          <div>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Company</p>
            <div className="space-y-2.5">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/news', label: 'News & Insights' },
                { to: '/partners', label: 'Partners' },
                { to: '/careers', label: 'Careers' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <RouterLink
                  key={to}
                  to={to}
                  className="block text-sm transition-colors no-underline"
                  style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
                >
                  {label}
                </RouterLink>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">Platform</p>
            <div className="space-y-2.5">
              {[
                { to: '/login', label: 'Vendor Portal' },
                { to: '/login', label: 'Buyer Portal' },
                { to: '/login', label: 'Admin Portal' },
              ].map(({ to, label }) => (
                <RouterLink
                  key={label}
                  to={to}
                  className="block text-sm transition-colors no-underline"
                  style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
                >
                  {label}
                </RouterLink>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © {new Date().getFullYear()} B2Bmarket. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Powered by Feenix
          </p>
        </div>
      </div>
    </footer>
  );
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNav />
      <main className="flex-1">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}

// Re-export sub-components for use in LandingPage
export { PublicNav, PublicFooter };
