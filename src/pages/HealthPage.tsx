import { useEffect, useState } from 'react';
import { Typography, Box, Paper, Chip } from '@mui/material';
import { getHealth, HealthResponse } from '@/core/api/health';

export function HealthPage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getHealth()
      .then((res) => setHealth(res.data))
      .catch((err) => setError(err.message || 'Failed to fetch health'));
  }, []);

  if (error) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Health check
        </Typography>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!health) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>
          Health check
        </Typography>
        <Typography color="text.secondary">Loading…</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Health check
      </Typography>
      <Paper sx={{ p: 2, maxWidth: 400 }}>
        <Typography variant="body2" color="text.secondary">
          App: {health.app}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Chip label={health.status} color={health.status === 'healthy' ? 'success' : 'warning'} size="small" sx={{ mr: 1 }} />
          <Chip label={`DB: ${health.database}`} variant="outlined" size="small" />
        </Box>
      </Paper>
    </Box>
  );
}
