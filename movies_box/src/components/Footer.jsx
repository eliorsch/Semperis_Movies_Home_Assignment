import { Box, Typography, Link } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: 6,
      py: 3,
      px: 2,
      background: 'background.paper',
      borderTop: '1px solid',
      borderColor: 'divider',
      textAlign: 'center',
    }}
  >
    <Typography variant="body2" color="text.secondary">
      © {new Date().getFullYear()} Movies Box &nbsp;|&nbsp; Powered by
      <Link
        href="https://www.themoviedb.org/"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: 'primary.main', fontWeight: 600, ml: 0.5 }}
      >
        TMDB
      </Link>
      <Box component="span" sx={{ display: 'inline-block', ml: 1, verticalAlign: 'middle' }}>
        <img src="/favicon2.png" alt="TMDB Logo" style={{ height: 18, verticalAlign: 'middle' }} />
      </Box>
    </Typography>
  </Box>
);

export default Footer;
