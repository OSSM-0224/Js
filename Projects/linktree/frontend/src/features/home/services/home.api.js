import axios from "axios";

const linkApiInstance = axios.create({
  baseURL: "/api/links",
});

export const getLinks = async ({ username }) => {
  const response = await linkApiInstance.get(`/${username}`);
  console.log(response.data);
  return response.data;
};

export const linkClick = async ({ linkId }) => {
  const response = await linkApiInstance.patch(`/${linkId}/click`);
  console.log(response.data);
  return response.data;
};
