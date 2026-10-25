import { Link } from "react-router-dom";

export default function Navbar({ token, logout }) {
  return (
    <header>
      <nav className="container nav">
        <Link className="logo" to="/">
          Cineva
        </Link>
        <Link to="/">Movies</Link>
        {token ? (
          <>
            <Link to="/favorites">Favorites</Link>
            <Link to="/add-movie">Add movie</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
