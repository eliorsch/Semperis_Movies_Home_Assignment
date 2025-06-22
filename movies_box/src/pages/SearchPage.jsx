import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, setFilters } from '../slices/moviesSlice';
import { Container, Typography, Pagination, Stack } from '@mui/material';
import MovieGallery from '../components/MovieGallery';
import SearchForm from '../components/SearchForm';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const movies = useSelector((state) => state.movies.items);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);
  const page = useSelector((state) => state.movies.page);
  const totalPages = useSelector((state) => state.movies.totalPages);

  useEffect(() => {
    const params = {
      query: query.get('query') || '',
      genre: query.get('genre') || '',
      year: query.get('year') || '',
      sort: query.get('sort') || 'popularity',
      order: query.get('order') || 'desc',
      page: query.get('page') || 1,
      release_date_lte: new Date().toISOString().slice(0, 10),
      language: query.get('language') || '',
    };
    dispatch(setFilters(params));
    dispatch(fetchMovies(params));
  }, [window.location.search, dispatch]);

  const handlePageChange = (event, value) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', value);
    navigate(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>Search Movies</Typography>
      <SearchForm />
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <MovieGallery movies={movies} />
      <Stack direction="row" justifyContent="center" sx={{ my: 4 }}>
        <Pagination
          count={totalPages}
          page={Number(page) || 1}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </Stack>
    </Container>
  );
};

export default SearchPage;
