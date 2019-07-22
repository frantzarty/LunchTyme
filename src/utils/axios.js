import axios from "axios";

const baseURL = "http://sandbox.bottlerocketapps.com/";
const instance = axios.create({
  baseURL,
  timeout: 10000
});

export default instance;
