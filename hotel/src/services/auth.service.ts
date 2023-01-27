import axios from "axios";
import { REST_API_URL } from "../constants/global";

const API_LOGIN_URL = REST_API_URL + 'login/'

class AuthService {
  login(login: any, password: any) {
    return axios
      .post(API_LOGIN_URL, {
        login,
        password
      })
      .then(response => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user") || '{}');
  }
}

export default new AuthService();