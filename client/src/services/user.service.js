/* Add a HTTP header using authHeader() to
request for authorized resources */
import api from "./api";

const DASHBOARD_ROUTE = "/dashboard/";

const getPublicContent = () => {
  return api.get(DASHBOARD_ROUTE + "all");
};

const getUserBoard = () => {
  return api.get(DASHBOARD_ROUTE + "user");
};

const getModeratorBoard = () => {
  return api.get(DASHBOARD_ROUTE + "mod");
};

const getAdminBoard = () => {
  return api.get(DASHBOARD_ROUTE + "admin");
};

const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

export default userService;