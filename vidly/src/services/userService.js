import config from "../config.json";
import http from "../services/httpService";

export function register(user) {
  return http.post(config.usersEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
