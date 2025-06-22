import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://api.themoviedb.org/3/configuration/languages';
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const fetchLanguages = createAsyncThunk(
  'languages/fetchLanguages',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${TMDB_TOKEN}` },
      });
      if (!res.ok) throw new Error('Failed to fetch languages');
      const data = await res.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const languagesSlice = createSlice({
  name: 'languages',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.loading = false;
        // Sort languages by english_name or name
        state.items = (action.payload || []).slice().sort((a, b) => {
          const nameA = (a.english_name || a.name || '').toLowerCase();
          const nameB = (b.english_name || b.name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default languagesSlice.reducer;
