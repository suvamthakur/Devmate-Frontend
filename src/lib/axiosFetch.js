import axios from "axios";

const BASE_URL =
  location.hostname == "localhost" ? "http://localhost:3000" : "/api/";

export const axiosFetch = axios.create({
  baseURL: BASE_URL, // here /api is relative path. because frontend and backend are hosted on same ip
  withCredentials: true,
});
