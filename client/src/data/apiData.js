import axios from "axios";

const baseURL = "http://localhost:8000/";

const apiData = axios.create({
  baseURL,
});

export default apiData;
