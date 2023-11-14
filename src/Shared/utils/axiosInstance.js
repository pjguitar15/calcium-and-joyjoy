import axios from "axios";
import config from "../utils/config";

const axiosInstance = axios.create({
  baseURL: `${config.apiUrl}/api`,
});

export default axiosInstance;
