import { Typography, Box } from '@mui/material';

export function HomePage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        B2Bmarket Portal
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome to the B2B marketplace portal. Use the Health page to check API and database status.
      </Typography>
    </Box>
  );
}
