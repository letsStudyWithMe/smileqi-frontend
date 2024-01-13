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

export interface BooleanRes {
  data : any;
  code : number;
  message : string;
}

export interface LoginRes {
  token: string;
}

export interface User {
  id: string;
  userAccount: string;
  userPassword: string;
  userName: string;
  userAvatar: string;
  userRole: string;
  createTime: string;
  isDelete: string;
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

export function getUserInfoById(id:any) {
  return axios.get<User>(`/sysuser/get/${id}`);
}

export function deleteUserInfoById(id:any) {
  return axios.get<BooleanRes>(`/sysuser/delete/${id}`);
}

export function updateUserInfoById(data: User) {
  return axios.post<BooleanRes>('/sysuser/update', data);
}

export function addUserInfo(data: User) {
  return axios.post<BooleanRes>('/sysuser/register', data);
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
  return axios.post<UserListRes>('/sysuser/list/page/vo', params);
}