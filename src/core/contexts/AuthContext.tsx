import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi, refreshToken as refreshTokenApi, verifyToken as verifyTokenApi, LoginResponse } from '@/core/api/auth';

interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACCESS_TOKEN_KEY = 'b2bmarket_access_token';
const REFRESH_TOKEN_KEY = 'b2bmarket_refresh_token';
const USER_KEY = 'b2bmarket_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (storedUser && accessToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        // Verify token is still valid
        verifyTokenApi(accessToken)
          .then(() => {
            setLoading(false);
          })
          .catch(() => {
            // Token invalid, try refresh
            const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
            if (refreshToken) {
              refreshAccessToken().finally(() => setLoading(false));
            } else {
              logout();
            }
          });
      } catch {
        logout();
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      logout();
      return;
    }

    try {
      const response = await refreshTokenApi(refreshToken);
      localStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response: LoginResponse = await loginApi({ email, password });
      
      // Store tokens and user
      localStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, response.refresh_token);
      localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      
      setUser(response.user);
      navigate('/');
    } catch (error: any) {
      const message = error.response?.data?.error || error.message || 'Login failed';
      throw new Error(message);
    }
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
