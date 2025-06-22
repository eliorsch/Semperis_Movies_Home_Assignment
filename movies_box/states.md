# 🗂️ Redux State Management Design for Semperis Movies SPA

## State Slices

### 1. movies
- **Purpose:** Holds the list of movies, loading state, error, and pagination info.
- **State Shape:**
  - `items: Movie[]` – Array of movie objects
  - `loading: boolean` – Loading indicator
  - `error: string | null` – Error message
  - `page: number` – Current page
  - `totalPages: number` – Total pages from API
  - `query: string` – Current search query
  - `genre: string` – Current genre filter
  - `year: string` – Current year filter
  - `sort: string` – Sort field
  - `order: 'asc' | 'desc'` – Sort order
  - `language: string` – Current language filter

### 2. movieDetails
- **Purpose:** Holds details for a single movie (when viewing details page).
- **State Shape:**
  - `data: MovieDetails | null` – Detailed movie object
  - `loading: boolean` – Loading indicator
  - `error: string | null` – Error message

### 3. genres
- **Purpose:** Holds the list of available genres for filtering.
- **State Shape:**
  - `items: Genre[]` – Array of genre objects
  - `loading: boolean` – Loading indicator
  - `error: string | null` – Error message

### 4. languages
- **Purpose:** Holds the list of available languages for filtering.
- **State Shape:**
  - `items: Language[]` – Array of language objects (from TMDB API)
  - `loading: boolean` – Loading indicator
  - `error: string | null` – Error message

## Example State Tree

```
{
  movies: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 0,
    query: '',
    genre: '',
    year: '',
    sort: 'popularity',
    order: 'desc',
    language: ''
  },
  movieDetails: {
    data: null,
    loading: false,
    error: null
  },
  genres: {
    items: [],
    loading: false,
    error: null
  },
  languages: {
    items: [],
    loading: false,
    error: null
  }
}
```

## Async Actions (Thunks)
- `fetchMovies` – Fetch movies list with filters/search/sort/pagination
- `fetchMovieDetails` – Fetch details for a single movie
- `fetchGenres` – Fetch available genres
- `fetchLanguages` – Fetch available languages

## Usage
- Use selectors to access state in components.
- Dispatch thunks for async API calls.
- Store TMDB token in `.env` and use it in thunks for API requests.
