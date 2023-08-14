import axios from "axios";

const instance = axios.create({
  // CHANGED
  // baseURL: "http://localhost:8080/api",
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;