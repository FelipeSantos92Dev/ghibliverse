// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://ghibliapi.vercel.app",
});

export default api;
