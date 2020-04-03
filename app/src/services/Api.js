import axios from "axios";

const URL = "http://192.168.1.13:8000/api";

export default api = axios.create({
  baseURL: URL,
});
