import { useState, useEffect, useCallback, ReactNode } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { ArrowForward as ArrowIcon, East as EastIcon } from '@mui/icons-material';
import { useAuth } from '@/core/contexts/AuthContext';
import { determineRole, buildPortalUrl } from '@/utils/subdomain';

interface PublicLayoutProps {
  children: ReactNode;
}

function PublicNav() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Reset on route change
    setScrolled(window.scrollY > 60);
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [location.pathname]);

  const toDashboard = useCallback(() => {
    if (user) {
      window.location.href = buildPortalUrl(determineRole(user), '/dashboard');
    }
  }, [user]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(10,37,64,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <RouterLink
          to="/"
          className="text-white font-black text-xl tracking-tight no-underline"
          style={{ textDecoration: 'none' }}
        >
          B2Bmarket
        </RouterLink>

        <nav className="hidden md:flex items-center gap-6">
          <RouterLink
            to="/careers"
            className="text-sm font-medium transition-colors no-underline"
            style={{
              color: location.pathname === '/careers' ? 'white' : 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
            }}
          >
            Careers
          </RouterLink>
          <RouterLink
            to="/contact"
            className="text-sm font-medium transition-colors no-underline"
            style={{
              color: location.pathname === '/contact' ? 'white' : 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
            }}
          >
            Contact
          </RouterLink>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={toDashboard}
              className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            >
              Go to Dashboard
              <EastIcon sx={{ fontSize: 16 }} />
            </button>
          ) : (
            <RouterLink
              to="/login"
              className="flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors no-underline"
              style={{
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
    </header>
  );
}

function PublicFooter() {
  return (
    <footer style={{ backgroundColor: '#0a2540' }}>
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
