import axios from "axios";

const analyticsApi = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getAnalytics = async (username) => {
  const response = await analyticsApi.get(`/link/${encodeURIComponent(username)}/analytics`);
  return response.data;
};
