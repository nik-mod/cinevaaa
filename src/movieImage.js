// Poster paths for some popular movies in the catalog (TMDB).
const posters = {
  "the shawshank redemption": "q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  inception: "oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
  "forrest gump": "arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
  "the godfather": "3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  "the dark knight": "qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  interstellar: "gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  "the matrix": "f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  "fight club": "pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  "pulp fiction": "d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  "the lord of the rings: the fellowship of the ring":
    "6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
  "the lord of the rings: the return of the king":
    "rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
  gladiator: "ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
  titanic: "9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
  avatar: "kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
  joker: "udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  parasite: "7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  whiplash: "7fn624j5lj3xTme2SgiLCeuedmO.jpg",
  "the prestige": "tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg",
  "the green mile": "8VG8fDNiy50H4FedGwdSVUPoaJe.jpg",
  se7en: "6yoghtyTpznpBik8EngEmJskVUO.jpg",
  seven: "6yoghtyTpznpBik8EngEmJskVUO.jpg",
};

export function fallbackImage() {
  return "/no-poster.svg";
}

export function movieImage(movie) {
  const image =
    movie.poster_url || movie.poster || movie.image_url || movie.image;
  if (typeof image === "string" && /^https?:\/\//.test(image)) return image;
  if (
    typeof movie.poster_path === "string" &&
    movie.poster_path.startsWith("/")
  ) {
    return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  }
  const title = (movie.title || "").trim().toLowerCase();
  return posters[title]
    ? `https://image.tmdb.org/t/p/w500/${posters[title]}`
    : fallbackImage();
}
