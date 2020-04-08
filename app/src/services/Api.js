import axios from "axios";
import ENV from "../config/envVariables";

export default api = axios.create({
  baseURL: ENV.apiUrl,
});
