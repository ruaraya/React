import config from "../config.json";
import http from "../services/httpService";

export function getMovieUrl(id) {
  return `${config.moviesEndpoint}/${id}`;
}

export async function getMovies() {
  const { data: movies } = await http.get(config.moviesEndpoint);
  return movies;
}

export async function deleteMovie(movie) {
  await http.delete(getMovieUrl(movie._id));
}

export async function getMovie(id) {
  const { data: movie } = await http.get(getMovieUrl(id));
  return movie;
}

export async function saveMovie(movie) {
  await http.post(config.moviesEndpoint, movie);
}

export async function updateMovie(id, movie) {
  await http.put(getMovieUrl(id), movie);
}
