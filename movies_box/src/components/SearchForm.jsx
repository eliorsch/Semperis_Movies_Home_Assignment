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
    votes: '',
    rating: '',
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
      votes: params.get('votes') || '',
      rating: params.get('rating') || '',
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
    // Handle min-votes (custom or preset)
    if (form.votes === 'custom' && form.votesCustom) {
      params.set('votes', form.votesCustom);
    } else if (form.votes && form.votes !== 'custom') {
      params.set('votes', form.votes);
    }
    // Handle min-rating (custom or preset)
    if (form.rating === 'custom' && form.ratingCustom) {
      params.set('rating', form.ratingCustom);
    } else if (form.rating && form.rating !== 'custom') {
      params.set('rating', form.rating);
    }
    navigate(`/search?${params.toString()}`);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, background: 'background.paper', borderRadius: 2, p: { xs: 3, sm: 4 }, boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
      <Grid container spacing={4} justifyContent="space-between" alignItems="center" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
        <Grid item size={{ xs: 12, sm: 3 }}>
          <TextField
            label="Title"
            name="query"
            value={form.query}
            onChange={handleChange}
            fullWidth
            size="small"
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
          <FormControl fullWidth size="small">
            <InputLabel>Min Votes</InputLabel>
            <Select
              label="Min Votes"
              name="votes"
              value={form.votes || ''}
              onChange={handleChange}
              sx={{ background: 'background.default', borderRadius: 2 }}
              size="small"
              renderValue={(selected) => selected === 'custom' ? 'Custom' : (selected ? `${selected}+` : 'All')}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="100">100+</MenuItem>
              <MenuItem value="500">500+</MenuItem>
              <MenuItem value="1000">1000+</MenuItem>
              <MenuItem value="5000">5000+</MenuItem>
              <MenuItem value="custom">Custom...</MenuItem>
            </Select>
          </FormControl>
          {form.votes === 'custom' && (
            <TextField
              label="Custom Min Votes"
              name="votesCustom"
              type="number"
              value={form.votesCustom || ''}
              onChange={e => setForm({ ...form, votesCustom: e.target.value })}
              size="small"
              fullWidth
              sx={{ mt: 1, background: 'background.default', borderRadius: 2 }}
              inputProps={{ min: 0 }}
            />
          )}
        </Grid>
        <Grid item size={{ xs: 12, sm: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Min Rating</InputLabel>
            <Select
              label="Min Rating"
              name="rating"
              value={form.rating || ''}
              onChange={handleChange}
              sx={{ background: 'background.default', borderRadius: 2 }}
              size="small"
              renderValue={(selected) => selected === 'custom' ? 'Custom' : (selected ? `${selected}+` : 'All')}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="5">5+</MenuItem>
              <MenuItem value="6">6+</MenuItem>
              <MenuItem value="7">7+</MenuItem>
              <MenuItem value="8">8+</MenuItem>
              <MenuItem value="custom">Custom...</MenuItem>
            </Select>
          </FormControl>
          {form.rating === 'custom' && (
            <TextField
              label="Custom Min Rating"
              name="ratingCustom"
              type="number"
              value={form.ratingCustom || ''}
              onChange={e => setForm({ ...form, ratingCustom: e.target.value })}
              size="small"
              fullWidth
              sx={{ mt: 1, background: 'background.default', borderRadius: 2 }}
              inputProps={{ min: 0, max: 10, step: 0.1 }}
            />
          )}
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
