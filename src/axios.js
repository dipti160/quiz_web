import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Set your API base URL here
  timeout: 10000, // Set the timeout for API requests (in milliseconds)
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
