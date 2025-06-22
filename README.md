# Movies Box – Semperis Movies SPA

A modern, responsive Single Page Application (SPA) for browsing, searching, and viewing details about movies, built for the Semperis internship assignment.

## Features
- Browse a catalog of movies with title, release year, genre, and rating
- Advanced search and filtering (title, genre, year, sort, order, language)
- View detailed information for each movie (synopsis, cast, director, etc.)
- Responsive gallery layout with equal-sized movie cards
- Quick search and navigation via a modern navbar (with mobile hamburger menu)
- State management with Redux Toolkit
- Data fetched from The Movie Database (TMDb) API
- Built with React, Vite, and Material UI (MUI)

## Live Demo
- 🌐 [moviesbox547.netlify.app](https://moviesbox547.netlify.app/)

## Getting Started

### Prerequisites
- Node.js (v16 or newer recommended)
- npm

### Installation
1. Clone or download this repository
2. Navigate to the `movies_box` directory:
   ```sh
   cd movies_box
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the `movies_box` directory and add your TMDb API token:
   ```env
   VITE_TMDB_TOKEN=your_tmdb_token_here
   ```
   (A demo token is already provided in the assignment.)

### Running the App
```sh
npm run dev
```
- Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure
- `src/components/` – Reusable UI components (Navbar, MovieCard, MovieGallery, SearchForm)
- `src/pages/` – Main pages (Home, Search, Movie Details)
- `src/slices/` – Redux slices for movies, genres, languages, and details
- `src/store.js` – Redux store setup
- `src/App.jsx` – Main app and router

## API
- Uses [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)
- Requires a TMDb API token (see `.env` setup above)

## Deployment
You can deploy this app to Vercel, Netlify, or any static hosting that supports Vite/React builds.

## License
This project is for educational and assignment purposes only.

---

**Good luck and happy coding!**
