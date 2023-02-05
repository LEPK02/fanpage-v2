/* 
* The service uses Axios for HTTP requests and
* Local Storage for user information & JWT
*/
import axios from "axios";

// CHANGED
// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "http://localhost:8080/auth/";

// POST {username, email, password}
const register = (username, email, password) => {
  // CHANGED
  // return axios.post(API_URL + "signup", {
  return axios.post(API_URL + "register", {
    username,
    email,
    password,
  });
};

// POST {username, password} & save JWT to Local Storage
const login = (username, password) => {
    // CHANGED  
    // return axios.post(API_URL + "signin", {
    return axios.post(API_URL + "login", {
    username,
    password,
  })
  .then((response) => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  });
};

// Remove JWT from Local Storage
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;