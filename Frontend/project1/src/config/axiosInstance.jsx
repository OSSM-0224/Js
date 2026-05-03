import axios from "axios";

export let axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("API Error ->", error);
    return Promise.reject(error);
  }
);