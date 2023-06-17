import { axios } from "./axios";
import { getToken } from "./token.service";

function getAllUsers() {
  return axios
    .get("/api/users")
    .then((response) => response && response.data && response.data.users);
}
function getAllOrders() {
  return axios.get("/api/orders").then((response) => response && response.data);
}
function getProfile() {
  return axios
    .get("/api/profile")
    .then((response) => response && response.data);
}

function login(credentials) {
  const url = "api/users/login";

  return axios.post(url, credentials);
}

export { getAllUsers, login, getAllOrders, getProfile };
