import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://627dfcd0b75a25d3f3af4996.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
