import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { RoleType, UserState } from "@/store/modules/user/types";
import { getToken } from "@/utils/auth";

export interface LoginData {
  userAccount: string;
  userPassword: string;
}

export interface token {
  token: string;
}

export interface LoginRes {
  token: string;
}

export interface User {
  id: number;
  userAccount: string;
  userPassword: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  createTime: string;
  isDelete: boolean;
}

export interface UserParams extends Partial<User> {
  current: number;
  pageSize: number;
}

export interface UserListRes {
  records: User[];
  total: number;
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/sysuser/login', data);
}

export function getUserInfo() {
  return axios.get<UserState>('/sysuser/get/login');
}

export function getMenuList() {
  return axios.get<RouteRecordNormalized[]>('/sysmenu/showSysMenu');
}

// export function queryUserList(params: UserParams) {
//   return axios.get<UserListRes>('/list/policy', {
//     params,
//     paramsSerializer: (obj) => {
//       return qs.stringify(obj);
//     },
//   });
// }

export function queryUserList(params: UserParams) {
  return axios.post<UserListRes>('/sysuser/list/page', params);
}