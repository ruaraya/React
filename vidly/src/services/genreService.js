import config from "../config.json";
import http from "../services/httpService";

export async function getGenres() {
  const { data: genres } = await http.get(config.genresEndpoint);
  return genres;
}
