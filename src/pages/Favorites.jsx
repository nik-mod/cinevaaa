import MovieList from "./MovieList";

export default function Favorites({ token, onUnauthorized }) {
  return <MovieList favorites token={token} onUnauthorized={onUnauthorized} />;
}
