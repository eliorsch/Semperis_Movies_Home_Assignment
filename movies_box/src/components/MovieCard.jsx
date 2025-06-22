import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
    <Card
        sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 'none',
            transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
            background: 'background.paper',
            '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 40px rgba(10,14,39,0.7)',
                borderColor: 'primary.main',
            },
            minWidth: 0,
            minHeight: 0,
            height: 1,
            width: 1,
        }}
    >
        <CardActionArea
            component={Link}
            to={`/movies/${movie.id}`}
            sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                height: 1,
                borderRadius: 2,
                overflow: 'hidden',
            }}
        >
            <Box sx={{ position: 'relative', width: '100%' }}>
                <CardMedia
                    component="img"
                    image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/no_movie_poster.png'}
                    alt={movie.title}
                    sx={{
                        objectFit: 'cover',
                        width: '100%',
                        aspectRatio: '2/3',
                        minHeight: 0,
                        flexShrink: 0,
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        bgcolor: 'rgba(0,0,0,0.85)', // solid, high-contrast background
                        color: '#fff', // always white text
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.4)', // subtle shadow for separation
                        border: '1px solid rgba(255,255,255,0.15)', // subtle border for extra clarity
                    }}
                >
                    <span style={{ color: '#FFD600', fontSize: 18, marginRight: 4, filter: 'drop-shadow(0 1px 2px #000)' }}>★</span>
                    <Typography variant="body2" sx={{ fontWeight: 700, fontSize: 16, color: '#fff', textShadow: '0 1px 2px #000' }}>
                        {movie.vote_average?.toFixed(1)}
                    </Typography>
                </Box>
            </Box>
            <CardContent sx={{ width: '100%', p: 2, pb: 2, background: 'background.paper', flexGrow: 0 }}>
                <Typography variant="subtitle2" noWrap sx={{ fontWeight: 700, color: 'common.white', fontSize: 16, mb: 0.5 }}>
                    {movie.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: 14 }}>
                        {movie.release_date?.slice(0, 4)}
                    </Typography>
                    {typeof movie.vote_count === 'number' && (
                        <Box sx={{ bgcolor: 'error.main', color: '#fff', borderRadius: 1, px: 1.2, py: 0.2, fontWeight: 700, fontSize: 13, ml: 'auto' }}>
                            {movie.vote_count} votes
                        </Box>
                    )}
                </Box>
            </CardContent>
        </CardActionArea>
    </Card>
);

export default MovieCard;
