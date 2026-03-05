export type UserRole = 'admin' | 'vendor' | 'buyer';

const ROLE_SUBDOMAINS: UserRole[] = ['admin', 'vendor', 'buyer'];

export function getSubdomain(hostname: string): UserRole | null {
  const first = hostname.split('.')[0].toLowerCase();
  if (ROLE_SUBDOMAINS.includes(first as UserRole)) return first as UserRole;
  return null;
}

export function isOnMainDomain(): boolean {
  return getSubdomain(window.location.hostname) === null;
}

/** Builds a full URL on the role subdomain, e.g. vendor.localhost:3000/dashboard */
export function buildPortalUrl(role: UserRole, path = '/dashboard'): string {
  const { hostname, port, protocol } = window.location;
  const portStr = port ? `:${port}` : '';
  const currentSub = getSubdomain(hostname);
  const base = currentSub ? hostname.slice(currentSub.length + 1) : hostname;
  return `${protocol}//${role}.${base}${portStr}${path}`;
}

/** Builds a full URL on the main (no-subdomain) domain */
export function buildMainDomainUrl(path = '/'): string {
  const { hostname, port, protocol } = window.location;
  const portStr = port ? `:${port}` : '';
  const currentSub = getSubdomain(hostname);
  const base = currentSub ? hostname.slice(currentSub.length + 1) : hostname;
  return `${protocol}//${base}${portStr}${path}`;
}

export interface UserWithRole {
  id: number;
  email: string;
  vendor_id?: number;
  role?: UserRole;
}

/** Infer role from user data: explicit role field → vendor_id → default 'admin' */
export function determineRole(user: UserWithRole): UserRole {
  if (user.role && ROLE_SUBDOMAINS.includes(user.role)) return user.role;
  if (user.vendor_id) return 'vendor';
  return 'admin';
}

export const ROLE_META: Record<UserRole, { label: string; color: string; bg: string }> = {
  admin:  { label: 'Admin',  color: '#dc2626', bg: '#fef2f2' },
  vendor: { label: 'Vendor', color: '#7c3aed', bg: '#f5f3ff' },
  buyer:  { label: 'Buyer',  color: '#0284c7', bg: '#f0f9ff' },
};
