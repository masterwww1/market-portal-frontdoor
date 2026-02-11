import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { getVendors, createVendor, VendorResponse } from '@/core/api/vendors';

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

  if (error) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Vendors
        </Typography>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Vendors
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
        <TextField
          size="small"
          label="Vendor name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          placeholder="Add a vendor"
          sx={{ minWidth: 220 }}
        />
        <Button variant="contained" onClick={handleCreate} disabled={submitting || !newName.trim()}>
          Add
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3}>Loading…</TableCell>
              </TableRow>
            ) : vendors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>No vendors yet. Add one above.</TableCell>
              </TableRow>
            ) : (
              vendors.map((v) => (
                <TableRow key={v.id}>
                  <TableCell>{v.id}</TableCell>
                  <TableCell>{v.name}</TableCell>
                  <TableCell>{new Date(v.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
