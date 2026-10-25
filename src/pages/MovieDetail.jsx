import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { request } from "../api";
import { movieImage, fallbackImage } from "../movieImage";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    request(`/movies/${id}`)
      .then((data) => {
        if (active) setMovie(data.data || data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/">Back to movies</Link>
      <div className="movie-detail">
        <img
          className="detail-poster"
          src={movieImage(movie)}
          alt={`${movie.title} poster`}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackImage(movie);
          }}
        />
        <div>
          <h1>{movie.title}</h1>
          <p>
            {movie.year} | {movie.genre}
          </p>
          <p>{movie.description}</p>
        </div>
      </div>
    </div>
  );
}
