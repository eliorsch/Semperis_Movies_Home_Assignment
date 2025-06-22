import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, setFilters } from '../slices/moviesSlice';
import { Container, Typography, Pagination, Stack, Box, FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MovieGallery from '../components/MovieGallery';
import SearchForm from '../components/SearchForm';

const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'vote_average', label: 'Rating' },
  { value: 'release_date', label: 'Release Date' },
];

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

  // Extract sort/order from URL
  const sort = query.get('sort') || 'popularity';
  const order = query.get('order') || 'desc';

  useEffect(() => {
    const params = {
      query: query.get('query') || '',
      genre: query.get('genre') || '',
      year: query.get('year') || '',
      sort,
      order,
      page: query.get('page') || 1,
      release_date_lte: new Date().toISOString().slice(0, 10),
      language: query.get('language') || '',
      votes: query.get('votes') || '',
      rating: query.get('rating') || '',
    };
    dispatch(setFilters(params));
    dispatch(fetchMovies(params));
  }, [window.location.search, dispatch]);

  const handlePageChange = (event, value) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', value);
    navigate(`${window.location.pathname}?${params.toString()}`);
  };

  // Handle sort/order changes
  const handleSortChange = (e) => {
    const params = new URLSearchParams(window.location.search);
    params.set('sort', e.target.value);
    params.set('page', 1);
    navigate(`${window.location.pathname}?${params.toString()}`);
  };
  const handleOrderToggle = () => {
    const params = new URLSearchParams(window.location.search);
    params.set('order', order === 'desc' ? 'asc' : 'desc');
    params.set('page', 1);
    navigate(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h2" sx={{ mb: 4, borderLeft: '6px solid', borderColor: 'primary.main', pl: 3, fontWeight: 700 }}>
        Search Movies
      </Typography>
      <SearchForm />
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            label="Sort By"
            value={sort}
            onChange={handleSortChange}
            sx={{ background: 'background.default', borderRadius: 2 }}
          >
            {sortOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title={order === 'desc' ? 'Descending' : 'Ascending'}>
          <IconButton onClick={handleOrderToggle} color="primary" sx={{ ml: 1, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            {order === 'desc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
          </IconButton>
        </Tooltip>
      </Box>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      <MovieGallery movies={movies} loading={loading} error={error} />
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
