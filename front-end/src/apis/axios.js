import axios from "axios";

const api = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: api,
  headers: { "content-type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (req) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  function error() {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
