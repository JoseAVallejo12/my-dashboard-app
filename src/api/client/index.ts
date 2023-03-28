import axios from "axios";
const httpRequest = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 5000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpRequest;
