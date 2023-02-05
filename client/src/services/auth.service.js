/* 
* The service uses Axios for HTTP requests and
* Local Storage for user information & JWT
*/
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
// TO CHANGE
// const API_URL = "http://localhost:8080/auth/";

// POST {username, email, password}
const register = (username, email, password) => {
  // TO CHANGE
  // return axios.post(API_URL + "register", {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

// POST {username, password} & save JWT to Local Storage
const login = (username, password) => {
  return axios
  // TO CHANGE  
  // .post(API_URL + "login", {
    .post(API_URL + "signin", {
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