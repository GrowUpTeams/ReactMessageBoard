import axios from 'axios';

// BACKUP
// const DEVICE = "Web";
const axiosInstance = axios.create();
const NODE_ENV = process.env.NODE_ENV;

console.log(process.env);

axiosInstance.defaults.baseURL =
  NODE_ENV === 'production'
    ? 'https://prod-message-board-api.onrender.com'
    : process.env.REACT_APP_API_ENDPOINT;
// BACKUP
// axiosInstance.defaults.headers["device"] = DEVICE;

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    return Promise.reject(err.response && err.response.data);
  }
);

export default axiosInstance;
