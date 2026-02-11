import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Container,
  Button,
  Box,
} from '@mui/material';
import { useAuth } from '@/core/contexts/AuthContext';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <>
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
            <>
              <Link component={RouterLink} to="/vendors" color="inherit" sx={{ mx: 1 }}>
                Vendors
              </Link>
              <Link component={RouterLink} to="/health" color="inherit" sx={{ mx: 1 }}>
                Health
              </Link>
              <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2">{user?.email}</Typography>
                <Button color="inherit" onClick={logout} size="small">
                  Logout
                </Button>
              </Box>
            </>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ py: 3 }}>
        {children}
      </Container>
    </>
  );
}
