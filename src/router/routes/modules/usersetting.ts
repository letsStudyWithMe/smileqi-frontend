import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSMANAGEMENT: AppRouteRecordRaw = {
  path: '/usersetting',
  name: 'usersetting',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.user.setting',
    requiresAuth: true,
    icon: 'icon-user',
    order: 0,
  },
  children: [
    {
      path: 'usercentral',
      name: 'usercentral',
      component: () => import('@/views/usersetting/usercentral/index.vue'),
      meta: {
        locale: 'menu.user.central',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default SYSMANAGEMENT;
