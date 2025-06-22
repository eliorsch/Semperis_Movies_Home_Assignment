# 📁 Application Routes – Semperis Movies SPA

This document outlines the URI structure used in the application for navigation and filtering.

---

## 🔹 Main Routes

| Path           | Description                             |
|----------------|-----------------------------------------|
| `/`            | Home page (optional: featured/latest)   |
| `/movies/:id`  | View full details of a single movie     |
| `/search`      | List/search/filter movies               |

---

## 🔍 `/search` Query Parameters

The `/search` route supports the following query parameters for filtering and sorting movies.

| Parameter  | Description                          | Example                  |
|------------|--------------------------------------|--------------------------|
| `query`    | Search by movie title                | `query=batman`           |
| `genre`    | Filter by genre name or ID           | `genre=Action`           |
| `year`     | Filter by release year               | `year=2022`              |
| `sort`     | Sort field (e.g. `rating`, `popularity`) | `sort=rating`        |
| `order`    | Sort order: `asc` or `desc`          | `order=desc`             |
| `page`     | Pagination number                    | `page=2`                 |

### Example URLs:

- `/search?query=matrix`
- `/search?genre=Comedy&year=2005`
- `/search?sort=rating&order=desc&page=3`

---

## 🧱 Notes

- The `/movies/:id` route loads details using the movie's TMDb ID.
- The `/search` route is the only entry point for browsing or filtering the movie catalog.
- All filters are optional and combinable.

