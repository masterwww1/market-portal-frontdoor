import { useEffect, useState } from 'react';
import { getVendors, createVendor, VendorResponse } from '@/core/api/vendors';
import { DataTable, Column } from '@/components/DataTable';
import { Modal } from '@/components/Modal';

type AddVendorForm = {
  companyName: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

const initialForm: AddVendorForm = {
  companyName: '',
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
};

export function VendorsPage() {
  const [vendors, setVendors] = useState<VendorResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

  const loadVendors = () => {
    setLoading(true);
    setError(null);
    getVendors()
      .then((res) => setVendors(res.data))
      .catch((err) => setError(err.message || 'Failed to load vendors'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const openModal = () => {
    setForm(initialForm);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm(initialForm);
  };

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const allFieldsFilled =
    form.companyName.trim() !== '' &&
    form.first_name.trim() !== '' &&
    form.last_name.trim() !== '' &&
    form.email.trim() !== '' &&
    form.phone_number.trim() !== '';

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allFieldsFilled) return;
    setSubmitting(true);
    createVendor({
      name: form.companyName.trim(),
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      email: form.email.trim(),
      phone_number: form.phone_number.trim(),
    })
      .then(() => {
        closeModal();
        loadVendors();
      })
      .catch((err) => setError(err.message || 'Failed to create vendor'))
      .finally(() => setSubmitting(false));
  };

  const columns: Column<VendorResponse>[] = [
    {
      key: 'id',
      header: 'ID',
      className: 'w-20',
    },
    {
      key: 'first_name',
      header: 'First Name',
      render: (vendor) => vendor.first_name || <span className="text-gray-400">—</span>,
    },
    {
      key: 'last_name',
      header: 'Last Name',
      render: (vendor) => vendor.last_name || <span className="text-gray-400">—</span>,
    },
    {
      key: 'email',
      header: 'Email',
      render: (vendor) =>
        vendor.email ? (
          <a href={`mailto:${vendor.email}`} className="text-blue-600 hover:text-blue-800 hover:underline">
            {vendor.email}
          </a>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      key: 'phone_number',
      header: 'Phone Number',
      render: (vendor) =>
        vendor.phone_number ? (
          <a href={`tel:${vendor.phone_number}`} className="text-blue-600 hover:text-blue-800 hover:underline">
            {vendor.phone_number}
          </a>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      key: 'name',
      header: 'Company Name',
    },
    {
      key: 'created_at',
      header: 'Created',
      render: (vendor) => new Date(vendor.created_at).toLocaleString(),
      className: 'w-48',
    },
  ];

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Vendors</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  const recentVendors = [...vendors].slice(0, 5);

  return (
    <div className="flex w-full h-full min-h-0">
      {/* Center: table */}
      <div className="flex-1 min-w-0 flex flex-col p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Vendors</h1>
          <button
            type="button"
            onClick={openModal}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150 font-medium"
          >
            Add Vendor
          </button>
        </div>

        <DataTable
          data={vendors}
          columns={columns}
          loading={loading}
          emptyMessage="No vendors yet. Click Add Vendor to create one."
          className="w-full"
        />
      </div>

      {/* Right: card with charts and details */}
      <div
        className="flex-shrink-0 border-l border-gray-200 bg-gray-50 overflow-auto"
        style={{ width: 320 }}
      >
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Overview</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <p className="text-sm text-gray-500">Total vendors</p>
              <p className="text-2xl font-bold text-gray-900">{loading ? '—' : vendors.length}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Vendors (recent)</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="space-y-2">
                {recentVendors.length === 0 && !loading && (
                  <p className="text-sm text-gray-500">No vendors yet</p>
                )}
                {recentVendors.length === 0 && loading && (
                  <p className="text-sm text-gray-500">Loading...</p>
                )}
                {recentVendors.map((v) => (
                  <div key={v.id} className="flex items-center gap-2">
                    <div
                      className="flex-shrink-0 rounded bg-blue-100"
                      style={{
                        width: 8,
                        height: 32,
                        maxHeight: 48,
                        minHeight: 8,
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{v.name}</p>
                      <p className="text-xs text-gray-500 truncate">{v.email || '—'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Trend</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <div className="flex items-end gap-2 h-32">
                {[6, 4, 8, 5, 7, 9, vendors.length || 1].map((val, i) => (
                  <div
                    key={i}
                    className="flex-1 min-w-0 flex flex-col justify-end"
                    title={`${val}`}
                  >
                    <div
                      className="rounded-t bg-blue-500 w-full"
                      style={{
                        height: `${Math.max(8, (val / 10) * 100)}%`,
                      }}
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">Last 7 entries (sample)</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Details</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Page</span>
                <span className="font-medium">Vendors</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Loaded</span>
                <span className="font-medium">{loading ? '…' : vendors.length} rows</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal} title="Add Vendor">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              id="companyName"
              type="text"
              value={form.companyName}
              onChange={handleChange('companyName')}
              placeholder="Company name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                type="text"
                value={form.first_name}
                onChange={handleChange('first_name')}
                placeholder="First name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                type="text"
                value={form.last_name}
                onChange={handleChange('last_name')}
                placeholder="Last name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="email@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone_number}
              onChange={handleChange('phone_number')}
              placeholder="+1 234 567 8900"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !allFieldsFilled}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {submitting ? 'Adding...' : 'Add Vendor'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
