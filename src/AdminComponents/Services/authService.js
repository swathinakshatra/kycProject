import { jwtDecode } from "jwt-decode";
import http from "./httpService";
import helpers from "./cryptos";
import { useHistory } from "react-router-dom";

const tokenKey = "token";
const apiEndpoint = process.env.REACT_APP_API_URL;

http.setJwt(getJwt());


export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);

    if (token) {
      const decryptedToken = helpers.decryptobj(token);
      const decodedToken = jwtDecode(decryptedToken);

      if (decodedToken.exp >= Date.now() / 1000) {
        return decodedToken;
      } else {
        logout();
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export function IsAdmin() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const decryptedToken = helpers.decryptobj(jwt);
    return jwtDecode(decryptedToken).isAdmin;
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  window.location = "/";
}

export async function login(email, password) {
  const loginobj = { email, password };
  const drreqpob = helpers.encryptobj(loginobj);

  const data = await http.post(apiEndpoint + "/member/login", {
    enc: drreqpob,
  });
  if (data.data) {
    var dd = helpers.decryptobj(data.data);

    return dd;
  }
}

export async function backEndCallVerifyOtp(route, obj) {
  const encobj = obj;

  const drreqpob = helpers.encryptobj(encobj);

  const data = await http.post(apiEndpoint + route, { enc: drreqpob });
  if (data.data) {
    localStorage.setItem(tokenKey, data.data);
    var dd = helpers.encryptobj(data.data);

    http.setJwt(getJwt());

    return dd;
  }
}

export default {
  login,
  backEndCallVerifyOtp,
  getCurrentUser,
  logout,
  getJwt,
  IsAdmin,
};
