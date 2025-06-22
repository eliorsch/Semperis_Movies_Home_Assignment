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

  useEffect(() => {
    if (data && data.title) {
      document.title = data.title + " | Movies Box";
    }
    return () => {
      document.title = 'Movies Box'; // fallback default
    };
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!data) return <div>No details found.</div>;

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Grid container spacing={6} gap={{ xs: 2, sm: 4 }} flexDirection={"column"} alignItems={"flex-start"}>
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '/vite.svg'}
              alt={data.title}
              style={{ width: '100%', borderRadius: 12, maxWidth: 320, height: 'auto', border: '4px solid #f4c430', boxShadow: '0 8px 32px rgba(10,14,39,0.7)' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
            {data.title} <span style={{ fontWeight: 400, color: '#b8bcc8' }}>({data.release_date?.slice(0, 4)})</span>
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom sx={{ fontWeight: 500, mb: 2 }}>
            {data.tagline}
          </Typography>
          <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap' }}>
            {data.genres?.map((g) => (
              <Chip
                key={g.id}
                label={g.name}
                component="a"
                href={`/search?genre=${g.id}`}
                clickable
                sx={{
                  mr: 1,
                  mb: 1,
                  fontWeight: 600,
                  background: '#2a2f4a',
                  color: '#f4c430',
                  textDecoration: 'none',
                  '&:hover': {
                    background: 'primary.main',
                    color: '#fff',
                  },
                }}
              />
            ))}
          </Box>
          <Typography variant="body1" sx={{ mb: 2, fontSize: 18 }}>
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
          <Divider sx={{ my: 3, borderColor: 'primary.main' }} />
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>Cast</Typography>
          <Grid container spacing={1}>
            {data.credits?.cast?.slice(0, 8).map((c) => (
              <Grid item size={{ xs: 4, sm: 3 }} key={c.cast_id || c.credit_id}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <Avatar
                    src={c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : undefined}
                    alt={c.name}
                    sx={{ width: 64, height: 64, mb: 1, background: '#2a2f4a', color: '#f4c430', fontWeight: 700, fontSize: 24 }}
                  >
                    {c.name[0]}
                  </Avatar>
                  <Typography variant="caption" align="center" noWrap sx={{ fontWeight: 600 }}>
                    {c.name}
                  </Typography>
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
