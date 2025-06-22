import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://api.themoviedb.org/3/genre/movie/list';
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchGenres = createAsyncThunk(
  'genres/fetchGenres',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
      });
      if (!res.ok) throw new Error('Failed to fetch genres');
      const data = await res.json();
      return data.genres;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const genresSlice = createSlice({
  name: 'genres',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default genresSlice.reducer;
