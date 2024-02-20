import axios from "axios";
export const http = axios.create({
  // baseURL: "http://localhost:3005/"
  baseURL: "http://10.3.152.107:3005/",
});
