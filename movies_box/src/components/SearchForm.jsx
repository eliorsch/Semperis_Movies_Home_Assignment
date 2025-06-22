import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, MenuItem, Grid, InputLabel, Select, FormControl } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres } from '../slices/genresSlice';
import { fetchLanguages } from '../slices/languagesSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'vote_average', label: 'Rating' },
  { value: 'release_date', label: 'Release Date' },
];

const orderOptions = [
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' },
];

const SearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const genres = useSelector((state) => state.genres.items);
  const languages = useSelector((state) => state.languages.items);
  const [form, setForm] = useState({
    query: '',
    genre: '',
    year: '',
    sort: 'popularity',
    order: 'desc',
    language: '',
  });

  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchLanguages());
    // Populate form from URL
    const params = new URLSearchParams(location.search);
    setForm({
      query: params.get('query') || '',
      genre: params.get('genre') || '',
      year: params.get('year') || '',
      sort: params.get('sort') || 'popularity',
      order: params.get('order') || 'desc',
      language: params.get('language') || '',
    });
  }, [dispatch, location.search]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (form.query) params.set('query', form.query);
    if (form.genre) params.set('genre', form.genre);
    if (form.year) params.set('year', form.year);
    if (form.sort) params.set('sort', form.sort);
    if (form.order) params.set('order', form.order);
    if (form.language) params.set('language', form.language);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Title"
            name="query"
            value={form.query}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Genre</InputLabel>
            <Select
              label="Genre"
              name="genre"
              value={form.genre}
              onChange={handleChange}
            >
              <MenuItem value="">All</MenuItem>
              {genres.map((g) => (
                <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            label="Year"
            name="year"
            value={form.year}
            onChange={handleChange}
            type="number"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              label="Sort By"
              name="sort"
              value={form.sort}
              onChange={handleChange}
            >
              {sortOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Order</InputLabel>
            <Select
              label="Order"
              name="order"
              value={form.order}
              onChange={handleChange}
            >
              {orderOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Language</InputLabel>
            <Select
              label="Language"
              name="language"
              value={form.language}
              onChange={handleChange}
            >
              <MenuItem value="">All</MenuItem>
              {languages.map((lang) => (
                <MenuItem key={lang.iso_639_1} value={lang.iso_639_1}>
                  {lang.english_name || lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: { xs: 2, sm: 0 } }}>Search</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchForm;
