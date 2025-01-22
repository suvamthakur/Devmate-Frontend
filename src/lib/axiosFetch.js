import axios from "axios";

export const axiosFetch = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true,
});
