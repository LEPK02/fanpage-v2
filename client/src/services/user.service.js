/* Add a HTTP header using authHeader() to
request for authorized resources */
import axios from "axios";
import authHeader from "./auth-header";

// CHANGED
// const API_URL = "http://localhost:8080/api/test/";
const API_URL = "http://localhost:8080/dashboard/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default userService;