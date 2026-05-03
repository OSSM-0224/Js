import axios from "axios";
import { addError } from "../../shared/state/errorSlice";
import { dispatch } from "../store/store";

export let axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error in api", error.message);
    dispatch(addError(error.message));
  }
);