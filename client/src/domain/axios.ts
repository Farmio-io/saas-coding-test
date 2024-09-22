import axios from "axios";

const generateHeaders = () => ({
  "Content-Type": "application/json",
});

const axiosInstance = () =>
  axios.create({
    baseURL: "http://localhost:8080",
    headers: generateHeaders(),
  });

export default axiosInstance;
