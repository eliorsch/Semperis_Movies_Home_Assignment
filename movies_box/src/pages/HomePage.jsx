import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../slices/moviesSlice';
import { Box, Typography, Button, Grid, MenuItem, Select } from '@mui/material';
import MovieGallery from '../components/MovieGallery';

const HomePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.items);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  useEffect(() => {
    dispatch(fetchMovies({ sort: 'popularity', order: 'desc', page: 1 }));
  }, [dispatch]);

  return (
    <Box sx={{ minHeight: '100vh', background: 'background.default', pb: 8 }}>
      {/* Navbar is likely rendered in App.jsx */}
      <Box
        sx={{
          mt: { xs: 4, sm: 6 },
          mb: { xs: 6, sm: 8 },
          mx: 'auto',
          maxWidth: 900,
          borderRadius: 4,
          p: { xs: 3, sm: 6 },
          background: 'linear-gradient(90deg, #d13a3a 0%, #a13ad1 100%)',
          color: '#fff',
          textAlign: 'center',
          boxShadow: 0,
        }}
      >
        <Typography variant="h3" fontWeight={700} mb={2}>
          Discover Amazing Movies
        </Typography>
        <Typography variant="h6" fontWeight={400} mb={0}>
          Browse through thousands of movies, find your favorites, and explore
          <br />
          detailed information about cast, crew, and more.
        </Typography>
      </Box>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 0 } }}>
        <Grid container spacing={2} alignItems="center" mb={4}>
          <Grid item>
            <Select
              value={''}
              size="small"
              sx={{
                minWidth: 140,
                background: 'background.paper',
                borderRadius: 2,
                fontWeight: 600,
              }}
              displayEmpty
              inputProps={{ 'aria-label': 'All Genres' }}
            >
              <MenuItem value="">All Genres</MenuItem>
              {/* Map genres here if needed */}
            </Select>
          </Grid>
          <Grid item>
            <Select
              value={''}
              size="small"
              sx={{
                minWidth: 140,
                background: 'background.paper',
                borderRadius: 2,
                fontWeight: 600,
              }}
              displayEmpty
              inputProps={{ 'aria-label': 'Most Popular' }}
            >
              <MenuItem value="">Most Popular</MenuItem>
              {/* Map sort options here if needed */}
            </Select>
          </Grid>
        </Grid>
        {/* MovieGallery component renders the movie cards grid */}
        <MovieGallery movies={movies} loading={loading} error={error} />
      </Box>
    </Box>
  );
};

export default HomePage;
