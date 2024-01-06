import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSMANAGEMENT: AppRouteRecordRaw = {
  path: '/sysmanagement',
  name: 'sysmanagement',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.sys.management',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'sysmenu',
      name: 'sysmenu',
      component: () => import('@/views/sysmanagement/sysmenu/index.vue'),
      meta: {
        locale: 'menu.sys.menu',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'sysuser',
      name: 'sysuser',
      component: () => import('@/views/sysmanagement/sysuser/index.vue'),
      meta: {
        locale: 'menu.sys.user',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default SYSMANAGEMENT;
