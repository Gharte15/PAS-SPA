import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { REST_API_URL } from "../../constants/global";
import jwt_decode from 'jwt-decode'
import { BehaviorSubject } from 'rxjs';


const API_LOGIN_URL = REST_API_URL + 'login/'
const currentRoleSubject = new BehaviorSubject(getUserRole())
const currentLoginSubject = new BehaviorSubject(getLogin())

export const authService = {
  login,
  logout,
  currentRole: currentRoleSubject.asObservable(),
  get currentRoleValue () { return currentRoleSubject.value },
  currentLogin: currentLoginSubject.asObservable(),
  get currentLoginValue () { return currentLoginSubject.value }
}

function login(login: any, password: any) {
  return axios
    .post(API_LOGIN_URL, {
      login,
      password
    })
    .then(response => {
      if (response.data) {
        sessionStorage.setItem("token", response.data);
        currentRoleSubject.next(getUserRole());
        currentLoginSubject.next(getLogin());
      }

      return response.data;
    });
}

function logout() {
  sessionStorage.removeItem("token");
  currentRoleSubject.next("NONE");
  currentLoginSubject.next("");
}

function getCurrentToken() {
  return JSON.parse(sessionStorage.getItem("token") || '{}');
}

function getUserRole() {
  if (sessionStorage.getItem("token")) {
    const decodedJwt: any = jwt_decode(sessionStorage.getItem("token") || '{}');
    return decodedJwt.role;
  }
  return "NONE"
}

function getLogin() {
  console.log(sessionStorage.getItem("token"));
  if (sessionStorage.getItem("token")) {
    const decodedJwt: any = jwt_decode(sessionStorage.getItem("token") || '{}');
    return decodedJwt.sub;
  }
  return ""
}

function showButton(userRole: any) {
  if (userRole === "ADMIN") {
    return true;
  }
}