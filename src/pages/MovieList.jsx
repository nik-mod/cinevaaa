import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { request, getList } from "../api";

export default function MovieList({ token, favorites = false }) {
  const [movies, setMovies] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadMovies() {
      setLoading(true);
      setError("");
      try {
        const data = await request("/movies");
        const allMovies = getList(data);
        let savedMovies = [];

        if (token) {
          const result = await request("/favorites", "GET", null, token);
          savedMovies = getList(result).map((item) => item.movie || item);
        }

        if (active) {
          setFavoriteIds(savedMovies.map((movie) => String(movie.id)));
          setMovies(favorites ? savedMovies : allMovies);
        }
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadMovies();
    return () => {
      active = false;
    };
  }, [token, favorites]);

  const filteredMovies = movies.filter((movie) =>
    (movie.title || "").toLowerCase().includes(search.toLowerCase()),
  );

  function saveFavorite(id) {
    setFavoriteIds([...favoriteIds, String(id)]);
  }

  return (
    <section>
      <h1>{favorites ? "My favorites" : "Movies"}</h1>
      <input
        className="search"
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && filteredMovies.length === 0 && (
        <p>No movies found.</p>
      )}
      <div className="movies">
        {!loading &&
          !error &&
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              token={token}
              isFavorite={favoriteIds.includes(String(movie.id))}
              onSaved={saveFavorite}
            />
          ))}
      </div>
    </section>
  );
}
