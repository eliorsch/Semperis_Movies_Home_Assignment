import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, MenuItem, Grid, InputLabel, Select, FormControl } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGenres } from '../slices/genresSlice';
import { fetchLanguages } from '../slices/languagesSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const currentYear = new Date().getFullYear();
const yearOptions = [];
for (let y = currentYear; y >= 1950; y--) {
  yearOptions.push(y);
}

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
    if (form.language) params.set('language', form.language);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, background: 'background.paper', borderRadius: 2, p: { xs: 3, sm: 4 }, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
      <Grid container spacing={4} justifyContent="space-between" alignItems="center" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
        <Grid item size={{ xs: 12}}>
          <TextField
            label="Title"
            name="query"
            value={form.query}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{
              background: 'background.default',
              borderRadius: 2,
              mb: 3,
              '& .MuiOutlinedInput-root': {
                paddingLeft: 2,
                paddingRight: 2,
                paddingTop: 1.5,
                paddingBottom: 1.5,
              },
            }}
          />
        </Grid>
        <Grid item size={{ xs: 12, sm: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Genre</InputLabel>
            <Select
              label="Genre"
              name="genre"
              value={form.genre}
              onChange={handleChange}
              sx={{ background: 'background.default', borderRadius: 2 }}
              size="small"
            >
              <MenuItem value="">All</MenuItem>
              {genres.map((g) => (
                <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item  size={{ xs: 12, sm: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Year</InputLabel>
            <Select
              label="Year"
              name="year"
              value={form.year}
              onChange={handleChange}
              sx={{ background: 'background.default', borderRadius: 2 }}
              size="small"
            >
              <MenuItem value="">All</MenuItem>
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item size={{ xs: 12, sm: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Language</InputLabel>
            <Select
              label="Language"
              name="language"
              value={form.language}
              onChange={handleChange}
              sx={{ background: 'background.default', borderRadius: 2 }}
              size="small"
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
        <Grid item size={{ xs: 12, sm: 3 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, fontWeight: 700, fontSize: 18, borderRadius: 1 }}>
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchForm;
