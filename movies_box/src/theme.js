// filepath: src/theme.js
import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0e27',
      paper: '#1a1f3a',
    },
    primary: {
      main: '#f4c430',
      contrastText: '#0a0e27',
    },
    secondary: {
      main: '#d4af37',
    },
    text: {
      primary: '#fff',
      secondary: '#b8bcc8',
      disabled: '#8892b0',
    },
    divider: '#2d3748',
    success: { main: '#48bb78' },
    error: { main: '#f56565' },
  },
  typography: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    h1: { fontSize: 56, fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: 40, fontWeight: 600, lineHeight: 1.2 },
    h3: { fontSize: 32, fontWeight: 600, lineHeight: 1.2 },
    h4: { fontSize: 24, fontWeight: 600, lineHeight: 1.2 },
    h5: { fontSize: 18, fontWeight: 500, lineHeight: 1.2 },
    h6: { fontSize: 16, fontWeight: 500, lineHeight: 1.2 },
    body1: { fontSize: 16, fontWeight: 400, lineHeight: 1.6 },
    body2: { fontSize: 14, fontWeight: 400, lineHeight: 1.6 },
    caption: { fontSize: 12, fontWeight: 300, lineHeight: 1.4 },
    button: { fontWeight: 600, textTransform: 'none' },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0a0e27',
          color: '#fff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(10,14,39,0.95)',
          borderBottom: '1px solid #2d3748',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          padding: '12px 24px',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #f4c430 0%, #d4af37 100%)',
          color: '#0a0e27',
          '&:hover': {
            background: '#d4af37',
          },
        },
        outlined: {
          border: '2px solid #2d3748',
          color: '#fff',
          background: 'transparent',
          '&:hover': {
            background: '#2a2f4a',
          },
        },
        text: {
          color: '#f4c430',
          '&:hover': {
            textDecoration: 'underline',
            color: '#d4af37',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#1e2235',
          borderRadius: 12,
          border: '1px solid #2d3748',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(10,14,39,0.7)',
            borderColor: '#f4c430',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          background: '#1e2235',
          borderRadius: 12,
          '& .MuiOutlinedInput-root': {
            color: '#fff',
            borderRadius: 12,
            '& fieldset': {
              borderColor: '#2d3748',
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: '#f4c430',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#f4c430',
              boxShadow: '0 0 0 3px rgba(244,196,48,0.2)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#b8bcc8',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          background: '#1e2235',
          borderRadius: 12,
          color: '#fff',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          background: '#2a2f4a',
          color: '#f4c430',
          fontWeight: 500,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 1200,
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        container: {
          gap: 3,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          background: '#2a2f4a',
          color: '#f4c430',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          marginTop: 24,
          marginBottom: 24,
        },
      },
    },
  },
});

export default theme;
