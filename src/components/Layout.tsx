import { ReactNode } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useAuth } from '@/core/contexts/AuthContext';

const SIDEBAR_WIDTH = 220;

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/vendors', label: 'Vendors' },
  { to: '/products', label: 'Products' },
  { to: '/health', label: 'Health' },
];

export function Layout({ children }: LayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  return (
    <div className="flex flex-col h-screen w-full">
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, fontWeight: 700, textDecoration: 'none', color: 'inherit' }}
          >
            B2Bmarket
          </Typography>
          {isAuthenticated ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2">{user?.email}</Typography>
              <Button color="inherit" onClick={logout} size="small">
                Logout
              </Button>
            </Box>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <div className="flex flex-1 min-h-0 w-full">
        {isAuthenticated && (
          <aside
            className="flex-shrink-0 border-r border-gray-200 bg-gray-50 flex flex-col"
            style={{ width: SIDEBAR_WIDTH }}
          >
            <nav className="p-4 flex flex-col gap-1">
              {navItems.map(({ to, label }) => {
                const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
                return (
                  <RouterLink
                    key={to}
                    to={to}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </RouterLink>
                );
              })}
            </nav>
          </aside>
        )}

        <main className="flex-1 min-w-0 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
