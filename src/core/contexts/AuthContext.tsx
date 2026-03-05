import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  login as loginApi,
  refreshToken as refreshTokenApi,
  verifyToken as verifyTokenApi,
  LoginResponse,
} from '@/core/api/auth';
import {
  UserRole,
  UserWithRole,
  determineRole,
  buildPortalUrl,
  buildMainDomainUrl,
  getSubdomain,
} from '@/utils/subdomain';

interface User extends UserWithRole {
  id: number;
  email: string;
  vendor_id?: number;
  role?: UserRole;
}

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACCESS_TOKEN_KEY  = 'b2bmarket_access_token';
const REFRESH_TOKEN_KEY = 'b2bmarket_refresh_token';
const USER_KEY          = 'b2bmarket_user';

// Token handoff query param used when crossing subdomain boundary
const TOKEN_HANDOFF_PARAM = '_tkn';

function encodeHandoff(at: string, rt: string, u: User): string {
  return encodeURIComponent(btoa(JSON.stringify({ at, rt, u })));
}

function decodeHandoff(raw: string): { at: string; rt: string; u: User } | null {
  try {
    return JSON.parse(atob(decodeURIComponent(raw)));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]   = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const role: UserRole | null = user ? determineRole(user) : null;

  // ── Bootstrap: check URL token handoff, then localStorage ────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const handoffRaw = params.get(TOKEN_HANDOFF_PARAM);

    if (handoffRaw) {
      const payload = decodeHandoff(handoffRaw);
      if (payload) {
        localStorage.setItem(ACCESS_TOKEN_KEY, payload.at);
        localStorage.setItem(REFRESH_TOKEN_KEY, payload.rt);
        localStorage.setItem(USER_KEY, JSON.stringify(payload.u));
        setUser(payload.u);
        // Clean the token from URL
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, '', cleanUrl);
        setLoading(false);
        return;
      }
    }

    // Normal bootstrap from localStorage
    const storedUser   = localStorage.getItem(USER_KEY);
    const accessToken  = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (storedUser && accessToken) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);

        verifyTokenApi(accessToken)
          .then((res) => {
            if (res.valid && res.user?.id) {
              const updated: User = {
                id:        res.user.id,
                email:     res.user.email,
                vendor_id: res.user.vendor_id,
                role:      (res.user as any).role,
              };
              setUser(updated);
              localStorage.setItem(USER_KEY, JSON.stringify(updated));
            }
            setLoading(false);
          })
          .catch(() => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) { logout(); return; }
    try {
      const response = await refreshTokenApi(refreshToken);
      localStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);
    } catch {
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    const response: LoginResponse = await loginApi({ email, password });

    const loggedInUser: User = {
      ...response.user,
      role: (response.user as any).role,
    };

    localStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);
    localStorage.setItem(REFRESH_TOKEN_KEY, response.refresh_token);
    localStorage.setItem(USER_KEY, JSON.stringify(loggedInUser));
    setUser(loggedInUser);

    const userRole = determineRole(loggedInUser);
    const currentSubdomain = getSubdomain(window.location.hostname);

    if (currentSubdomain === userRole) {
      // Already on the right subdomain — just navigate
      navigate('/dashboard');
    } else {
      // Cross to the role subdomain, carrying tokens via URL handoff
      const handoff = encodeHandoff(
        response.access_token,
        response.refresh_token,
        loggedInUser,
      );
      const portalUrl = buildPortalUrl(userRole, `/dashboard?${TOKEN_HANDOFF_PARAM}=${handoff}`);
      window.location.href = portalUrl;
    }
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    // Always land back on main domain landing page
    window.location.href = buildMainDomainUrl('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
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
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
