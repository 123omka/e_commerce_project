import axios from "axios";

exportconst api = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  // timeout: 5000
});


