import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { RoleType, UserState } from "@/store/modules/user/types";
import { getToken } from "@/utils/auth";

export interface BooleanRes {
  data : any;
  code : number;
  message : string;
}

export interface Menu {
  id: string;
  locale: string;
  requiresAuth: string;
  name: string;
  parentId: string;
  orderNum: string;
  path: string;
  status: string;
  perms: string;
  icon: string;
  createTime: string;
}

export interface MenuParams extends Partial<Menu> {
  current: number;
  pageSize: number;
}

export interface MenuListRes {
  records: Menu[];
  total: number;
}

export function getMenuInfoById(id:any) {
  return axios.get<Menu>(`/sysmenu/get/${id}`);
}

export function deleteMenuInfoById(id:any) {
  return axios.get<BooleanRes>(`/sysmenu/delete/${id}`);
}

export function updateMenuInfoById(data: Menu) {
  return axios.post<BooleanRes>('/sysmenu/update', data);
}

export function addMenuInfo(data: Menu) {
  return axios.post<BooleanRes>('/sysmenu/add', data);
}

export function getMenuList() {
  return axios.get<RouteRecordNormalized[]>('/sysmenu/showSysMenu');
}

export function queryMenuList(params: MenuParams) {
  return axios.post<MenuListRes>('/sysmenu/list/page/menuTree', params);
}