import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/moviesSlice';
import movieDetailsReducer from './slices/movieDetailsSlice';
import genresReducer from './slices/genresSlice';
import languagesReducer from './slices/languagesSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    genres: genresReducer,
    languages: languagesReducer,
  },
});

export default store;
