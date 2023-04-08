/* 
* The service uses api for HTTP requests and
* Local Storage for user information & JWT
*/
import api from "./api";
import TokenService from "./token.service";

const AUTH_ROUTE = "/auth/";

// POST {username, email, password}
const register = (username, email, password) => {
  // CHANGED
  // return api.post(AUTH_ROUTE + "signup", {
  return api.post(AUTH_ROUTE + "register", {
    username,
    email,
    password,
  });
};

// POST {username, password} & save JWT to Local Storage
const login = (username, password) => {
    // CHANGED  
    // return api.post(AUTH_ROUTE + "signin", {
    return api.post(AUTH_ROUTE + "login", {
    username,
    password,
  })
  .then((response) => {
    if (response.data.accessToken) {
      TokenService.setUser(response.data);
    }

    return response.data;
  });
};

// Remove JWT from Local Storage
const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;