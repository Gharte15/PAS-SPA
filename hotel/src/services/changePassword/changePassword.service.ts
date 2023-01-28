import axios from "axios";
import { REST_API_URL } from "../../constants/global";
import authHeader from "../auth/auth-header";

const API_CHANGE_PASSWORD_URL = REST_API_URL + 'users/passwordChange'

class ChangePasswordService {
  
    changePassword(login: any, oldPassword: any, newPassword: any, confirmNewPassword: any) {
        return axios
            .put(API_CHANGE_PASSWORD_URL, {
                login,
                oldPassword,
                newPassword,
                confirmNewPassword
            }, {headers: authHeader()})
            .then(response =>
            {
                return response;
            });
    }
}
export default new ChangePasswordService();