import axios from "axios";
import api from "./api";

const axiosInstance = axios.create({
  baseURL: api.urlBase,
});

export default axiosInstance;
