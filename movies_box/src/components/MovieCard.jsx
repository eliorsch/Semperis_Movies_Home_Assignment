import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
  <Card sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: 420, minHeight: 420, maxHeight: 420, width: 1, minWidth: 1, maxWidth: 1 }}>
    <CardActionArea component={Link} to={`/movies/${movie.id}`} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: 1 }}>
      <CardMedia
        component="img"
        height="350"
        image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/vite.svg'}
        alt={movie.title}
        sx={{ objectFit: 'cover', width: '100%', height: 350, maxHeight: 350, flexShrink: 0 }}
      />
      <CardContent sx={{ flexGrow: 1, width: '100%' }}>
        <Typography variant="h6" noWrap>{movie.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.release_date?.slice(0, 4)} | Rating: {movie.vote_average}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default MovieCard;
