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
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ flexWrap: 'wrap', px: { xs: 1, sm: 2 } }}>
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', minWidth: 0 }}>
          <img src="/logo2.png" alt="Logo" style={{ height: 36, marginRight: 8, maxWidth: '100%' }} />
          <Typography variant="h6" noWrap sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Movies Box</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
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
                            <IconButton type="submit" size="small">
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ width: '100%', background: '#fff', borderRadius: 1 }}
                    />
                  </Box>
                </ListItem>
                {menuItems.map((item) => (
                  <ListItem key={item.label} disablePadding>
                    <ListItemButton onClick={() => handleMenuClick(item.to)}>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </>
        ) : (
          <>
            <Button component={Link} to="/search?sort=vote_average&order=desc" color="inherit" sx={{ mr: { xs: 1, sm: 2 }, fontSize: { xs: '0.8rem', sm: '1rem' } }}>Top Rated</Button>
            <Button component={Link} to="/search?sort=release_date&order=desc" color="inherit" sx={{ mr: { xs: 1, sm: 2 }, fontSize: { xs: '0.8rem', sm: '1rem' } }}>New Movies</Button>
            <Box component="form" onSubmit={handleQuickSearch} sx={{ display: 'flex', alignItems: 'center', minWidth: 0, ml: { xs: 1, sm: 0 } }}>
              <TextField
                size="small"
                placeholder="Quick search..."
                value={quickQuery}
                onChange={e => setQuickQuery(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" size="small">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: { xs: 120, sm: 180 }, background: '#fff', borderRadius: 1 }}
              />
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
