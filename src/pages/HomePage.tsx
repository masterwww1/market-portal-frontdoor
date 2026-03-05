import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Business as BusinessIcon,
  Inventory as InventoryIcon,
  AccountBalanceWallet as WalletIcon,
  TrendingUp as TrendingUpIcon,
  PersonAdd as PersonAddIcon,
  AddBox as AddBoxIcon,
  MonitorHeart as HealthIcon,
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  ContactSupport as SupportIcon,
  FiberManualRecord as DotIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { IconButton, Tooltip as MuiTooltip } from '@mui/material';
import { useAuth } from '@/core/contexts/AuthContext';
import { getVendors, VendorResponse } from '@/core/api/vendors';
import { getProducts, ProductResponse } from '@/core/api/products';
import { getHealth, HealthResponse } from '@/core/api/health';

const CHART_COLORS = ['#635bff', '#00c9a7', '#ff7043', '#ffc107', '#2196f3', '#e91e63'];

const TREND_BASE = [
  { month: 'Sep', vendors: 8,  products: 22 },
  { month: 'Oct', vendors: 14, products: 41 },
  { month: 'Nov', vendors: 19, products: 58 },
  { month: 'Dec', vendors: 25, products: 79 },
  { month: 'Jan', vendors: 31, products: 98 },
  { month: 'Feb', vendors: 38, products: 127 },
  { month: 'Mar', vendors: 0,  products: 0 },
];

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function formatFullDate(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function avatarColor(id: number): string {
  return `hsl(${(id * 47) % 360}, 60%, 48%)`;
}

// ---------- Sub-components ----------

function SkeletonLine({ className = '' }: { className?: string }) {
  return <div className={`bg-gray-100 rounded-lg animate-pulse ${className}`} />;
}

interface StatCardProps {
  label: string;
  value: string | number | null;
  sub: string;
  icon: React.ReactNode;
  accent: string;
  bg: string;
  loading: boolean;
}

function StatCard({ label, value, sub, icon, accent, bg, loading }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
          <span style={{ color: accent }}>{icon}</span>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: bg, color: accent }}>
          LIVE
        </span>
      </div>
      {loading ? (
        <SkeletonLine className="h-8 w-3/4" />
      ) : (
        <p className="text-2xl font-bold text-gray-900 leading-none">{value ?? '—'}</p>
      )}
      <div>
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <p className="text-xs text-gray-400">{sub}</p>
      </div>
    </div>
  );
}

// ---------- Main Component ----------

export function HomePage() {
  const { user } = useAuth();
  const [vendors, setVendors] = useState<VendorResponse[]>([]);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [vRes, pRes, hRes] = await Promise.allSettled([
        getVendors(),
        getProducts(),
        getHealth(),
      ]);
      if (vRes.status === 'fulfilled') setVendors(vRes.value.data);
      if (pRes.status === 'fulfilled') setProducts(pRes.value.data);
      if (hRes.status === 'fulfilled') setHealth(hRes.value.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Derived metrics
  const totalVendors = vendors.length;
  const totalProducts = products.length;
  const totalValue = products.reduce((s, p) => s + (Number(p.price) || 0), 0);
  const avgPrice = totalProducts ? totalValue / totalProducts : 0;
  const apiHealthy = health?.status === 'ok' || health?.status === 'healthy';
  const dbHealthy = health?.database === 'ok' || health?.database === 'healthy';

  const trendData = TREND_BASE.map((d, i) =>
    i === TREND_BASE.length - 1 ? { ...d, vendors: totalVendors, products: totalProducts } : d
  );

  // Pie data: vendor → product count
  const vendorProdCount: Record<string, number> = {};
  products.forEach((p) => {
    const k = p.vendor_name || `Vendor #${p.vendor_id}`;
    vendorProdCount[k] = (vendorProdCount[k] || 0) + 1;
  });
  const pieData = Object.entries(vendorProdCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, value]) => ({ name, value }));

  const recentVendors = [...vendors]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const userName = user?.email.split('@')[0] ?? 'there';

  const statCards: StatCardProps[] = [
    {
      label: 'Total Vendors',
      value: totalVendors,
      sub: 'Registered partners',
      icon: <BusinessIcon fontSize="small" />,
      accent: '#635bff',
      bg: '#f0efff',
      loading,
    },
    {
      label: 'Total Products',
      value: totalProducts,
      sub: 'Active SKUs in catalog',
      icon: <InventoryIcon fontSize="small" />,
      accent: '#00c9a7',
      bg: '#e6faf7',
      loading,
    },
    {
      label: 'Catalog Value',
      value: loading ? null : formatCurrency(totalValue),
      sub: 'Total listed value',
      icon: <WalletIcon fontSize="small" />,
      accent: '#ff7043',
      bg: '#fff3ef',
      loading,
    },
    {
      label: 'Avg. Price',
      value: loading ? null : formatCurrency(avgPrice),
      sub: 'Per product',
      icon: <TrendingUpIcon fontSize="small" />,
      accent: '#f59e0b',
      bg: '#fffbeb',
      loading,
    },
  ];

  const quickActions = [
    { to: '/vendors',  Icon: PersonAddIcon, label: 'Add Vendor',      desc: 'Register new partner',  accent: '#635bff', bg: '#f0efff' },
    { to: '/products', Icon: AddBoxIcon,    label: 'Add Product',     desc: 'List new SKU',          accent: '#00c9a7', bg: '#e6faf7' },
    { to: '/health',   Icon: HealthIcon,    label: 'System Health',   desc: 'Check API & database',  accent: '#ff7043', bg: '#fff3ef' },
    { to: '/vendors',  Icon: SearchIcon,    label: 'Browse Vendors',  desc: 'Explore all partners',  accent: '#2196f3', bg: '#e3f2fd' },
    { to: '/products', Icon: CartIcon,      label: 'Browse Products', desc: 'Search the catalog',    accent: '#e91e63', bg: '#fce4ec' },
    { to: '/contact',  Icon: SupportIcon,   label: 'Get Support',     desc: 'Contact our team',      accent: '#f59e0b', bg: '#fffbeb' },
  ];

  return (
    <div className="min-h-full bg-[#f6f9fc] p-6 space-y-6 pb-10">

      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a2540 0%, #1a3a5c 55%, #635bff 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-20 right-8 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute top-6 right-52 w-28 h-28 rounded-full bg-purple-400/15 pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between flex-wrap gap-6">
          <div>
            <p className="text-blue-300 text-sm font-medium mb-1">{formatFullDate()}</p>
            <h1 className="text-3xl font-bold mb-1.5 tracking-tight">
              {getGreeting()}, {userName}
            </h1>
            <p className="text-blue-200 text-sm max-w-sm">
              Here's a live overview of your B2B marketplace platform.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            {[
              { label: 'Vendors',    value: loading ? '…' : String(totalVendors) },
              { label: 'Products',   value: loading ? '…' : String(totalProducts) },
              {
                label: 'API Status',
                value: loading ? '…' : apiHealthy ? 'Online' : 'Offline',
                color: loading ? undefined : apiHealthy ? '#6ee7b7' : '#fca5a5',
              },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 text-center min-w-[90px]">
                <p className="text-2xl font-bold" style={{ color: color ?? 'white' }}>{value}</p>
                <p className="text-xs text-blue-200 mt-0.5">{label}</p>
              </div>
            ))}

            <MuiTooltip title="Refresh data">
              <IconButton
                onClick={fetchData}
                size="small"
                sx={{ color: 'rgba(255,255,255,0.6)', alignSelf: 'center', '&:hover': { color: 'white', background: 'rgba(255,255,255,0.1)' } }}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </MuiTooltip>
          </div>
        </div>
      </div>

      {/* ── KPI Cards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* ── Charts Row ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Area Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Platform Growth</h2>
              <p className="text-xs text-gray-400 mt-0.5">Vendors & products — last 7 months</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full inline-block" style={{ backgroundColor: '#635bff' }} />
                <span className="text-xs text-gray-500">Vendors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full inline-block" style={{ backgroundColor: '#00c9a7' }} />
                <span className="text-xs text-gray-500">Products</span>
              </div>
            </div>
          </div>

          {loading ? (
            <SkeletonLine className="h-52" />
          ) : (
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={trendData} margin={{ top: 5, right: 8, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradVendors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#635bff" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#635bff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradProducts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#00c9a7" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#00c9a7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    fontSize: '12px',
                    padding: '10px 14px',
                  }}
                  cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
                />
                <Area
                  type="monotone"
                  dataKey="vendors"
                  stroke="#635bff"
                  strokeWidth={2.5}
                  fill="url(#gradVendors)"
                  name="Vendors"
                  dot={false}
                  activeDot={{ r: 4, fill: '#635bff', stroke: 'white', strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="products"
                  stroke="#00c9a7"
                  strokeWidth={2.5}
                  fill="url(#gradProducts)"
                  name="Products"
                  dot={false}
                  activeDot={{ r: 4, fill: '#00c9a7', stroke: 'white', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="mb-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Vendor Share</h2>
            <p className="text-xs text-gray-400 mt-0.5">Products per vendor</p>
          </div>

          {loading ? (
            <SkeletonLine className="flex-1 min-h-[180px]" />
          ) : pieData.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-2">
              <InventoryIcon sx={{ color: '#d1d5db', fontSize: 40 }} />
              <p className="text-sm text-gray-400">No products yet</p>
              <RouterLink to="/products" className="text-xs text-indigo-500 font-semibold hover:underline">
                Add your first product →
              </RouterLink>
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={170}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={78}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {pieData.map((_, idx) => (
                      <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: '10px',
                      border: 'none',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-2 mt-2">
                {pieData.slice(0, 5).map(({ name, value }, idx) => (
                  <div key={name} className="flex items-center gap-2 text-xs">
                    <DotIcon sx={{ fontSize: 10, color: CHART_COLORS[idx % CHART_COLORS.length] }} />
                    <span className="text-gray-600 flex-1 truncate">{name}</span>
                    <span className="font-bold text-gray-800">{value}</span>
                    <span className="text-gray-300">
                      {Math.round((value / totalProducts) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Recent Activity Row ─────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

        {/* Recent Vendors */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Recent Vendors</h2>
              <p className="text-xs text-gray-400">Latest registered partners</p>
            </div>
            <RouterLink to="/vendors" className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 transition-colors">
              View all →
            </RouterLink>
          </div>

          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(4)].map((_, i) => <SkeletonLine key={i} className="h-12" />)}
            </div>
          ) : recentVendors.length === 0 ? (
            <div className="p-10 text-center">
              <BusinessIcon sx={{ color: '#d1d5db', fontSize: 36, mb: 1 }} />
              <p className="text-sm text-gray-400">No vendors yet.</p>
              <RouterLink to="/vendors" className="text-xs text-indigo-500 font-semibold hover:underline">
                Register your first vendor →
              </RouterLink>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentVendors.map((v) => (
                <div
                  key={v.id}
                  className="px-6 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: avatarColor(v.id) }}
                  >
                    {v.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{v.name}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {[v.first_name, v.last_name].filter(Boolean).join(' ') || v.email || 'No contact info'}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs text-gray-400">{formatShortDate(v.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Recent Products</h2>
              <p className="text-xs text-gray-400">Latest catalog additions</p>
            </div>
            <RouterLink to="/products" className="text-xs font-semibold text-teal-500 hover:text-teal-700 transition-colors">
              View all →
            </RouterLink>
          </div>

          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(4)].map((_, i) => <SkeletonLine key={i} className="h-12" />)}
            </div>
          ) : recentProducts.length === 0 ? (
            <div className="p-10 text-center">
              <InventoryIcon sx={{ color: '#d1d5db', fontSize: 36, mb: 1 }} />
              <p className="text-sm text-gray-400">No products yet.</p>
              <RouterLink to="/products" className="text-xs text-teal-500 font-semibold hover:underline">
                Add your first product →
              </RouterLink>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentProducts.map((p) => (
                <div
                  key={p.id}
                  className="px-6 py-3.5 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <InventoryIcon sx={{ color: '#00c9a7', fontSize: 18 }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {p.vendor_name || `Vendor #${p.vendor_id}`}
                      {p.sku ? ` · ${p.sku}` : ''}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-teal-600">${Number(p.price).toFixed(2)}</p>
                    <p className="text-xs text-gray-400">{formatShortDate(p.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Quick Actions + System Status ───────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Quick Actions */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="mb-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Quick Actions</h2>
            <p className="text-xs text-gray-400 mt-0.5">Navigate to common tasks</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickActions.map(({ to, Icon, label, desc, accent, bg }) => (
              <RouterLink
                key={label}
                to={to}
                className="flex flex-col gap-2.5 p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-200"
                  style={{ backgroundColor: bg }}
                >
                  <Icon sx={{ color: accent, fontSize: 20 }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
              </RouterLink>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="mb-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">System Status</h2>
            <p className="text-xs text-gray-400 mt-0.5">Infrastructure health</p>
          </div>

          <div className="space-y-4">
            {[
              { label: 'API Server',   healthy: loading ? null : apiHealthy, detail: health?.app ?? 'B2B Market API' },
              { label: 'Database',     healthy: loading ? null : dbHealthy,  detail: 'PostgreSQL' },
            ].map(({ label, healthy, detail }) => (
              <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      healthy === null ? 'bg-gray-300 animate-pulse' :
                      healthy ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{label}</p>
                    <p className="text-xs text-gray-400">{detail}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    healthy === null ? 'bg-gray-200 text-gray-400' :
                    healthy ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'
                  }`}
                >
                  {healthy === null ? '…' : healthy ? 'UP' : 'DOWN'}
                </span>
              </div>
            ))}
          </div>

          {/* Progress metrics */}
          <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Platform Scale</p>
            {[
              { label: 'Vendors',  value: totalVendors,  cap: 100, color: '#635bff' },
              { label: 'Products', value: totalProducts, cap: 500, color: '#00c9a7' },
            ].map(({ label, value, cap, color }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-bold text-gray-700">
                    {loading ? '…' : value}
                    <span className="text-gray-300 font-normal"> / {cap}</span>
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: loading ? '0%' : `${Math.min((value / cap) * 100, 100)}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <RouterLink
            to="/health"
            className="mt-5 flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <HealthIcon sx={{ fontSize: 14 }} />
            Full diagnostics
          </RouterLink>
        </div>
      </div>
    </div>
  );
}
