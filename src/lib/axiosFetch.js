import axios from "axios";

export const axiosFetch = axios.create({
  baseURL: "/api/", // here /api is relative path. because frontend and backend are hosted on same ip
  withCredentials: true,
});
