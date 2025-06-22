import React from 'react';
import { Grid, Typography, Skeleton } from '@mui/material';
import MovieCard from './MovieCard';

const MovieGallery = ({ movies, loading, error }) => {
  if (loading) {
    // Show 8 skeleton cards for loading state
    return (
      <Grid container spacing={3} alignItems="stretch" sx={{ rowGap: 3, columnGap: 3, justifyContent: 'flex-start' }}>
        {Array.from({ length: 8 }).map((_, idx) => (
          <Grid item size={{ xs: 6, md: 3 }} key={idx} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Skeleton animation="wave" variant="rectangular" width="100%" height={340} sx={{ borderRadius: 2, flexGrow: 1 }} />
            <Skeleton animation="wave" variant="text" width="80%" sx={{ mt: 2 }} />
            <Skeleton animation="wave" variant="text" width="60%" />
          </Grid>
        ))}
      </Grid>
    );
  }
  if (error) return <Typography color="error">{error}</Typography>;
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
