import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import AddMovie from "./pages/AddMovie";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  function login(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken("");
  }

  return (
    <>
      <Navbar token={token} logout={logout} />
      <main className="container">
        <Routes>
          <Route path="/" element={<MovieList token={token} />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/favorites"
            element={
              token ? <Favorites token={token} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/add-movie"
            element={
              token ? <AddMovie token={token} /> : <Navigate to="/login" />
            }
          />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </main>
    </>
  );
}
