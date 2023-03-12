import axios from 'axios';

// BACKUP
// const DEVICE = "Web";
const axiosInstance = axios.create();

console.log(process.env);

axiosInstance.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
// BACKUP
// axiosInstance.defaults.headers["device"] = DEVICE;

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    return err;
  }
);

export default axiosInstance;
