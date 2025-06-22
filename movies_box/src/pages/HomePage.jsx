import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../slices/moviesSlice';
import { Container, Typography } from '@mui/material';
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
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>Featured / Latest Movies</Typography>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <MovieGallery movies={movies} />
    </Container>
  );
};

export default HomePage;
