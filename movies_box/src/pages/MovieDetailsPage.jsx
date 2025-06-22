import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetails } from '../slices/movieDetailsSlice';
import { Container, Grid, Typography, Chip, Box, Divider, Avatar } from '@mui/material';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.movieDetails);

  useEffect(() => {
    if (id) dispatch(fetchMovieDetails(id));
  }, [id, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!data) return <div>No details found.</div>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '/vite.svg'}
              alt={data.title}
              style={{ width: '100%', borderRadius: 8, maxWidth: 300, height: 'auto' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
            {data.title} ({data.release_date?.slice(0, 4)})
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {data.tagline}
          </Typography>
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap' }}>
            {data.genres?.map((g) => (
              <Chip key={g.id} label={g.name} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Overview:</strong> {data.overview}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Release Date:</strong> {data.release_date}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Rating:</strong> {data.vote_average} ({data.vote_count} votes)
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Runtime:</strong> {data.runtime} min
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Language:</strong> {data.original_language?.toUpperCase()}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Director:</strong> {data.credits?.crew?.find((c) => c.job === 'Director')?.name || 'N/A'}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>Cast</Typography>
          <Grid container spacing={1}>
            {data.credits?.cast?.slice(0, 8).map((c) => (
              <Grid item xs={6} sm={3} key={c.cast_id || c.credit_id}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <Avatar
                    src={c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : undefined}
                    alt={c.name}
                    sx={{ width: 56, height: 56, mb: 1 }}
                  >
                    {c.name[0]}
                  </Avatar>
                  <Typography variant="caption" align="center" noWrap>{c.name}</Typography>
                  <Typography variant="caption" color="text.secondary" align="center" noWrap>
                    {c.character}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetailsPage;
