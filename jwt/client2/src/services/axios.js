import axios from "axios";
import { getToken } from "./token.service";

axios.defaults.baseURL = "http://localhost:3001";

axios.interceptors.request.use((request) => {
  request.headers = {
    authorization: getToken(),
  };
  return request;
});

export { axios };
