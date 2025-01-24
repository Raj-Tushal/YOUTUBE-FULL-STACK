import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // Replace with your backend URL
});

// Add Authorization Header
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
