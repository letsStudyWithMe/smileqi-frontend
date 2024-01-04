import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
import { getToken } from "@/utils/auth";

export interface LoginData {
  userAccount: string;
  userPassword: string;
}

export interface LoginRes {
  token: string;
}

export interface token {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/sysuser/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/sysuser/logout');
}

export function getUserInfo(data: any) {
  return axios.post<UserState>('/sysuser/get/login', data);
}

export function getMenuList() {
  return axios.get<RouteRecordNormalized[]>('/sysmenu/showSysMenu');
}
