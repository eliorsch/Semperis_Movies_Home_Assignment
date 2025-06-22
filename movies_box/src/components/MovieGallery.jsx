import React from 'react';
import { Grid, Typography } from '@mui/material';
import MovieCard from './MovieCard';

const MovieGallery = ({ movies }) => {
  if (!movies || movies.length === 0) return <Typography>No movies found.</Typography>;
  return (
    <Grid
      container
      spacing={3}
      alignItems="stretch"
      sx={{
        rowGap: 3,
        columnGap: 3,
        justifyContent: 'flex-start',
      }}
    >
      {movies.map((movie) => (
        <Grid item size={{ xs: 6, md: 3 }} key={movie.id} sx={{ display: 'flex' }}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGallery;
