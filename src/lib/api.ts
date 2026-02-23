import Axios from "axios";

export const createClientAxios = (token: string) => {
  return Axios.create({
    baseURL: process.env.SPOTIFY_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
