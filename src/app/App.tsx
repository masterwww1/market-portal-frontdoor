import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { PublicLayout } from '@/components/PublicLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { LandingPage } from '@/pages/LandingPage';
import { HomePage } from '@/pages/HomePage';
import { HealthPage } from '@/pages/HealthPage';
import { VendorsPage } from '@/pages/VendorsPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { CareerPage } from '@/pages/CareerPage';
import { ContactPage } from '@/pages/ContactPage';
import NewsPage from '@/pages/NewsPage';
import AboutPage from '@/pages/AboutPage';
import PartnersPage from '@/pages/PartnersPage';
import { getSubdomain } from '@/utils/subdomain';
import '@/app/style.css';

function App() {
  const onPortalSubdomain = Boolean(getSubdomain(window.location.hostname));

  return (
    <Routes>
      {/* Root: landing page on main domain, redirect to dashboard on subdomains */}
      <Route
        path="/"
        element={onPortalSubdomain ? <Navigate to="/dashboard" replace /> : <LandingPage />}
      />

      {/* Auth — no sidebar layout */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Public pages — landing page style (nav + footer, no sidebar) */}
      <Route path="/careers"  element={<PublicLayout><CareerPage /></PublicLayout>} />
      <Route path="/contact"  element={<PublicLayout><ContactPage /></PublicLayout>} />
      <Route path="/news"     element={<PublicLayout><NewsPage /></PublicLayout>} />
      <Route path="/about"    element={<PublicLayout><AboutPage /></PublicLayout>} />
      <Route path="/partners" element={<PublicLayout><PartnersPage /></PublicLayout>} />

      {/* Protected portal pages — with sidebar */}
      <Route path="/dashboard" element={<ProtectedRoute><Layout><HomePage /></Layout></ProtectedRoute>} />
      <Route path="/vendors"   element={<ProtectedRoute><Layout><VendorsPage /></Layout></ProtectedRoute>} />
      <Route path="/products"  element={<ProtectedRoute><Layout><ProductsPage /></Layout></ProtectedRoute>} />
      <Route path="/health"    element={<ProtectedRoute><Layout><HealthPage /></Layout></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
