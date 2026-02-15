import { useEffect, useState } from 'react';
import { getProducts, createProduct, ProductResponse } from '@/core/api/products';
import { DataTable, Column } from '@/components/DataTable';
import { Modal } from '@/components/Modal';
import { useAuth } from '@/core/contexts/AuthContext';

type AddProductForm = {
  name: string;
  sku: string;
  description: string;
  price: string;
};

const initialForm: AddProductForm = {
  name: '',
  sku: '',
  description: '',
  price: '',
};

export function ProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

  const isVendor = user?.vendor_id != null;

  const loadProducts = () => {
    setLoading(true);
    setError(null);
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => setError(err.message || 'Failed to load products'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openModal = () => {
    setForm(initialForm);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm(initialForm);
  };

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const priceNum = parseFloat(form.price);
  const allRequiredFilled =
    form.name.trim() !== '' && !Number.isNaN(priceNum) && priceNum >= 0;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRequiredFilled) return;
    setSubmitting(true);
    createProduct({
      name: form.name.trim(),
      sku: form.sku.trim() || undefined,
      description: form.description.trim() || undefined,
      price: priceNum,
    })
      .then(() => {
        closeModal();
        loadProducts();
      })
      .catch((err) => setError(err.message || 'Failed to create product'))
      .finally(() => setSubmitting(false));
  };

  const columns: Column<ProductResponse>[] = [
    { key: 'id', header: 'ID', className: 'w-20' },
    { key: 'name', header: 'Name' },
    {
      key: 'sku',
      header: 'SKU',
      render: (p) => p.sku || <span className="text-gray-400">—</span>,
    },
    {
      key: 'description',
      header: 'Description',
      render: (p) =>
        p.description ? (
          <span className="max-w-xs truncate block" title={p.description}>
            {p.description}
          </span>
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      key: 'price',
      header: 'Price',
      render: (p) => (typeof p.price === 'number' ? `$${p.price.toFixed(2)}` : String(p.price)),
      className: 'w-24',
    },
    {
      key: 'vendor_name',
      header: 'Vendor',
      render: (p) => p.vendor_name || <span className="text-gray-400">—</span>,
    },
    {
      key: 'created_at',
      header: 'Created',
      render: (p) => new Date(p.created_at).toLocaleString(),
      className: 'w-48',
    },
  ];

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Products</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        {isVendor && (
          <button
            type="button"
            onClick={openModal}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150 font-medium"
          >
            Add Product
          </button>
        )}
      </div>

      <DataTable
        data={products}
        columns={columns}
        loading={loading}
        emptyMessage={
          isVendor
            ? 'No products yet. Click Add Product to create one.'
            : 'No products yet.'
        }
        className="w-full"
        searchPlaceholder="Search products..."
      />

      <Modal isOpen={modalOpen} onClose={closeModal} title="Add Product">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="productName"
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              placeholder="Product name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              id="productPrice"
              type="number"
              min={0}
              step="0.01"
              value={form.price}
              onChange={handleChange('price')}
              placeholder="0.00"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="productSku" className="block text-sm font-medium text-gray-700 mb-1">
              SKU
            </label>
            <input
              id="productSku"
              type="text"
              value={form.sku}
              onChange={handleChange('sku')}
              placeholder="Stock keeping unit"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="productDescription"
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Product description"
              rows={3}
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
              disabled={submitting || !allRequiredFilled}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {submitting ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
