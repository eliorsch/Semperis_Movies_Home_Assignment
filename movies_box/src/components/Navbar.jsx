import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const [quickQuery, setQuickQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const menuItems = [
    { label: 'Top Rated', to: '/search?sort=vote_average&order=desc' },
    { label: 'New Movies', to: '/search?sort=release_date&order=desc' },
  ];

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(quickQuery)}`);
      setQuickQuery('');
    }
  };

  const handleDrawerToggle = () => setDrawerOpen((open) => !open);
  const handleMenuClick = (to) => {
    setDrawerOpen(false);
    navigate(to);
  };

  return (
    <AppBar position="static" color="default" elevation={0} sx={{ background: 'rgba(10,14,39,0.95)', borderBottom: '1px solid', borderColor: 'divider', boxShadow: 'none' }}>
      <Toolbar sx={{ flexWrap: 'wrap', px: { xs: 1, sm: 2 }, minHeight: 64 }}>
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', minWidth: 0 }}>
          <img src="/logo2.png" alt="Logo" style={{ height: 40, marginRight: 12, maxWidth: '100%' }} />
          <Typography variant="h4" noWrap sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', sm: '2rem' }, color: 'primary.main', letterSpacing: 1 }}>Movies Box</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle} PaperProps={{ sx: { background: 'background.paper', color: 'text.primary' } }}>
              <List sx={{ minWidth: 220 }}>
                <ListItem disablePadding>
                  <Box component="form" onSubmit={handleQuickSearch} sx={{ width: '100%', p: 2, display: 'flex', alignItems: 'center' }}>
                    <TextField
                      size="small"
                      placeholder="Quick search..."
                      value={quickQuery}
                      onChange={e => setQuickQuery(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton type="submit" size="small" color="primary">
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ width: '100%' }}
                    />
                  </Box>
                </ListItem>
                {menuItems.map((item) => (
                  <ListItem key={item.label} disablePadding>
                    <ListItemButton onClick={() => handleMenuClick(item.to)} sx={{ '&:hover': { background: 'primary.main', color: 'primary.contrastText' } }}>
                      <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <>
            <Button component={Link} to="/search?sort=vote_average&order=desc" color="inherit" sx={{ mr: { xs: 1, sm: 2 }, fontWeight: 600, color: 'primary.main', '&:hover': { color: 'secondary.main' } }}>Top Rated</Button>
            <Button component={Link} to="/search?sort=release_date&order=desc" color="inherit" sx={{ mr: { xs: 1, sm: 2 }, fontWeight: 600, color: 'primary.main', '&:hover': { color: 'secondary.main' } }}>New Movies</Button>
            <Box component="form" onSubmit={handleQuickSearch} sx={{ display: 'flex', alignItems: 'center', minWidth: 0, ml: { xs: 1, sm: 0 } }}>
              <TextField
                size="small"
                placeholder="Quick search..."
                value={quickQuery}
                onChange={e => setQuickQuery(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" size="small" color="primary">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: { xs: 120, sm: 180 } }}
              />
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
