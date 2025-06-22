import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://api.themoviedb.org/3/movie';
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovieDetails = createAsyncThunk(
  'movieDetails/fetchMovieDetails',
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/${id}?append_to_response=credits`, {
        headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
      });
      if (!res.ok) throw new Error('Failed to fetch movie details');
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default movieDetailsSlice.reducer;
