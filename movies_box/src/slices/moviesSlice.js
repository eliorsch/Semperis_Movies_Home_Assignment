import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://api.themoviedb.org/3/discover/movie';
const API_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie';
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params, { rejectWithValue }) => {
    const { query, genre, year, sort, order, page } = params || {};
    let url = query ? `${API_SEARCH_URL}?query=${encodeURIComponent(query)}` : `${API_URL}?`;
    if (genre) url += `&with_genres=${genre}`;
    if (year) url += `&year=${year}`;
    if (sort) url += `&sort_by=${sort}.${order || 'desc'}`;
    if (page) url += `&page=${page}`;
    if (params.release_date_lte) url += `&release_date.lte=${params.release_date_lte}`;
    // Only add language param for discover endpoint (API_URL), not for search endpoint (API_SEARCH_URL)
    if (!query && params.language) url += `&with_original_language=${params.language}`;
    // Min votes and rating
    if (params.votes) url += `&vote_count.gte=${params.votes}`;
    if (params.rating) url += `&vote_average.gte=${params.rating}`;
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
      });
      if (!res.ok) throw new Error('Failed to fetch movies');
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 0,
    query: '',
    genre: '',
    year: '',
    sort: 'popularity',
    order: 'desc',
  },
  reducers: {
    setFilters(state, action) {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results || [];
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters } = moviesSlice.actions;
export default moviesSlice.reducer;
