import jwtDecode from "jwt-decode";
import config from "../config.json";
import http from "../services/httpService";

const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(config.authEndPoint, {
    email,
    password
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

function getJwt() {
  const jwt = localStorage.getItem(tokenKey);
  return jwt;
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
