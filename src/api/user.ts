import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  userAccount: string;
  userPassword: string;
}

export interface LoginRes {
  id: string;
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
  return axios.post<RouteRecordNormalized[]>('/api/sysmenu/showSysMenu');
}
