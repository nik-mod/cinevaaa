import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../api";

export default function AddMovie({ token }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await request(
        "/movies",
        "POST",
        {
          title,
          description,
          year: Number(year),
          genre,
        },
        token,
      );
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="form-box">
      <h1>Add movie</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Year</label>
        <input
          type="number"
          min="1888"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <label>Genre</label>
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button>Add movie</button>
      </form>
    </div>
  );
}
