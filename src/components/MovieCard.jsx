import { useState } from "react";
import { Link } from "react-router-dom";
import { request } from "../api";
import { movieImage, fallbackImage } from "../movieImage";

export default function MovieCard({ movie, token, isFavorite, onSaved }) {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function addFavorite() {
    setSaving(true);
    setError("");
    try {
      await request("/favorites", "POST", { movie_id: movie.id }, token);
      onSaved(movie.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="movie-card">
      <Link to={`/movies/${movie.id}`} className="poster-link">
        <img
          className="movie-poster"
          src={movieImage(movie)}
          alt={`${movie.title} poster`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackImage(movie);
          }}
        />
      </Link>
      <div className="movie-info">
        <h2>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </h2>
        <p>
          {movie.year} | {movie.genre}
        </p>
        <p>{movie.description}</p>
        {isFavorite ? (
          <span>In favorites</span>
        ) : token ? (
          <button onClick={addFavorite} disabled={saving}>
            Add to favorites
          </button>
        ) : (
          <Link to="/login">Log in to save</Link>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
