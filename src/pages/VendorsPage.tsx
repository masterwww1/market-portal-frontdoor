import { useEffect, useState } from 'react';
import { getVendors, createVendor, VendorResponse } from '@/core/api/vendors';
import { DataTable, Column } from '@/components/DataTable';

export function VendorsPage() {
  const [vendors, setVendors] = useState<VendorResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const handleCreate = () => {
    const name = newName.trim();
    if (!name) return;
    setSubmitting(true);
    createVendor({ name })
      .then(() => {
        setNewName('');
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

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Vendors</h1>
      
      {/* Add Vendor Form */}
      <div className="mb-6 flex gap-3 items-center">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          placeholder="Vendor name"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[220px]"
          disabled={submitting}
        />
        <button
          onClick={handleCreate}
          disabled={submitting || !newName.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 font-medium"
        >
          {submitting ? 'Adding...' : 'ADD'}
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        data={vendors}
        columns={columns}
        loading={loading}
        emptyMessage="No vendors yet. Add one above."
        className="w-full"
      />
    </div>
  );
}
