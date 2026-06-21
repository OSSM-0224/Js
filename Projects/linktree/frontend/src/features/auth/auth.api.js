import axios from "axios";

const authApi = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export const loginUser = async ({ identifier, password }) => {
  const response = await authApi.post("/login", { identifier, password });
  return response.data;
};

export const registerUser = async ({ username, email, password }) => {
  const response = await authApi.post("/register", { username, email, password });
  return response.data;
};
