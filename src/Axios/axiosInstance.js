import axios from "axios";
import { apiRoutes } from "../Constants/apiRoutes";

const axiosInstance = axios.create({
  baseURL: `${apiRoutes.baseUrl}/api/v1/`,
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");

    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      //   store.dispatch(logoutUser());
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
