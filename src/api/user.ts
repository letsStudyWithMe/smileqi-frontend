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
export function login(data: LoginData) {
  return axios.post<LoginRes>('/sysuser/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/sysuser/logout');
}

export function getUserInfo() {
  return axios.get<UserState>('/sysuser/get/login');
}

export function getMenuList() {
  // return axios.post<RouteRecordNormalized[]>('/api/sysmenu/showSysMenu');
  const menuList = [
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        locale: 'menu.server.dashboard',
        requiresAuth: true,
        icon: 'icon-dashboard',
        order: 1,
      },
      children: [
        {
          path: 'workplace',
          name: 'Workplace',
          meta: {
            locale: 'menu.server.workplace',
            requiresAuth: true,
          },
        },
        {
          path: 'https://arco.design',
          name: 'arcoWebsite',
          meta: {
            locale: 'menu.arcoWebsite',
            requiresAuth: true,
          },
        },
      ],
    },
  ];
  return menuList;
}
