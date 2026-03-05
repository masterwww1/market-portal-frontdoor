import { ReactNode } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  Home as HomeIcon,
  Business as BusinessIcon,
  Inventory as InventoryIcon,
  MonitorHeart as HealthIcon,
  Work as CareersIcon,
  ContactMail as ContactIcon,
  Logout as LogoutIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useAuth } from '@/core/contexts/AuthContext';

const SIDEBAR_WIDTH = 220;

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { to: '/',         label: 'Home',     Icon: HomeIcon },
  { to: '/vendors',  label: 'Vendors',  Icon: BusinessIcon },
  { to: '/products', label: 'Products', Icon: InventoryIcon },
  { to: '/health',   label: 'Health',   Icon: HealthIcon },
];

const publicNavItems = [
  { to: '/careers', label: 'Careers', Icon: CareersIcon },
  { to: '/contact', label: 'Contact', Icon: ContactIcon },
];

export function Layout({ children }: LayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <div className="flex flex-col h-screen w-full">
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar sx={{ minHeight: 56 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, fontWeight: 800, textDecoration: 'none', color: 'inherit', letterSpacing: '-0.3px' }}
          >
            B2Bmarket
          </Typography>

          {isAuthenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  fontSize: '12px',
                  fontWeight: 700,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                }}
              >
                {user?.email.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="body2" sx={{ opacity: 0.85, fontSize: '13px' }}>
                {user?.email}
              </Typography>
              <Tooltip title="Logout">
                <Button
                  color="inherit"
                  onClick={logout}
                  size="small"
                  startIcon={<LogoutIcon sx={{ fontSize: '16px !important' }} />}
                  sx={{ opacity: 0.8, '&:hover': { opacity: 1 }, fontSize: '12px', textTransform: 'none' }}
                >
                  Logout
                </Button>
              </Tooltip>
            </Box>
          ) : (
            <Button
              color="inherit"
              component={RouterLink}
              to="/login"
              startIcon={<LoginIcon />}
              sx={{ textTransform: 'none', fontSize: '13px' }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <div className="flex flex-1 min-h-0 w-full">
        <aside
          className="flex-shrink-0 border-r border-gray-200 bg-white flex flex-col"
          style={{ width: SIDEBAR_WIDTH }}
        >
          <nav className="p-3 flex flex-col gap-0.5 flex-1">
            {isAuthenticated && (
              <>
                <p className="px-3 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Main
                </p>
                {navItems.map(({ to, label, Icon }) => {
                  const active = isActive(to);
                  return (
                    <RouterLink
                      key={to}
                      to={to}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                        active
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon
                        sx={{
                          fontSize: 18,
                          color: active ? '#4338ca' : 'inherit',
                          opacity: active ? 1 : 0.6,
                        }}
                      />
                      {label}
                    </RouterLink>
                  );
                })}
              </>
            )}

            <div className="my-3 border-t border-gray-100" />

            <p className="px-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Company
            </p>
            {publicNavItems.map(({ to, label, Icon }) => {
              const active = location.pathname === to;
              return (
                <RouterLink
                  key={to}
                  to={to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    active
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon
                    sx={{
                      fontSize: 18,
                      color: active ? '#4338ca' : 'inherit',
                      opacity: active ? 1 : 0.6,
                    }}
                  />
                  {label}
                </RouterLink>
              );
            })}
          </nav>

          {/* Bottom brand mark */}
          <div className="p-4 border-t border-gray-100">
            <p className="text-[10px] text-gray-300 font-medium text-center tracking-wide">
              B2BMARKET PORTAL
            </p>
          </div>
        </aside>

        <main className="flex-1 min-w-0 overflow-auto bg-[#f6f9fc]">
          {children}
        </main>
      </div>
    </div>
  );
}
