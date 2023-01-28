import axios from "axios";
import { useNavigate } from "react-router-dom";
import { REST_API_URL } from "../../constants/global";
import jwt_decode from 'jwt-decode'


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
          sessionStorage.setItem("token", response.data);
        }
        console.log(sessionStorage.getItem("token"));
        
        return response.data;
      });
  }

  logout() {
    sessionStorage.removeItem("token");
  }

  getCurrentToken() {
    return JSON.parse(sessionStorage.getItem("token") || '{}');
  }

  getUserRole() {
    console.log(sessionStorage.getItem("token"));
    if (sessionStorage.getItem("token")) {
      const decodedJwt: any = jwt_decode(sessionStorage.getItem("token") || '{}');
      return decodedJwt.role;
    }
    return "NONE"
  }

  getLogin() {
    console.log(sessionStorage.getItem("token"));
    if (sessionStorage.getItem("token")) {
      const decodedJwt: any = jwt_decode(sessionStorage.getItem("token") || '{}');
      return decodedJwt.sub;
    }
    return ""
  }

  showButton(userRole : any) {
    if (userRole === "ADMIN"){
      return true;
    }

  }
}

export default new AuthService();