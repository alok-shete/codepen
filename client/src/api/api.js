import axios from "axios";
require("dotenv").config();
let api_url = process.env.API_URL || `/api`;
export default axios.create({
  baseURL: `${api_url}`,
  withCredentials: true,
});
