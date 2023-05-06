import axiosInstance from "@/src/Axios/axiosInstance";
import { apiRoutes } from "@/src/Constants/apiRoutes";

export const getAllBooks = (page, perPage, search) => {
  const response = axiosInstance.get(apiRoutes.getAllBooks, {
    params: {
      search,
      page,
      perPage,
    },
  });
  return response;
};
