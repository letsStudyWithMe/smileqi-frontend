import { defineStore } from 'pinia';
import {
  login as userLogin,
  getUserInfo,
  LoginData,
} from '@/api/user';
import { setToken, clearToken, getToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserState } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userName: undefined,
    userAvatar: undefined,
    userRole: 'admin',
    userAccount: undefined,
    // location: undefined,
    // email: undefined,
    // introduction: undefined,
    // personalWebsite: undefined,
    // jobName: undefined,
    // organizationName: undefined,
    // locationName: undefined,
    // phone: undefined,
    // registrationDate: undefined,
    // accountId: undefined,
    // certification: undefined,
    // role: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.userRole = this.userRole === 'user' ? 'admin' : 'user';
        resolve(this.userRole);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const token = getToken();
      const res = await getUserInfo(token);
      this.setInfo(res.data);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      this.logoutCallBack();
    },
  },
});

export default useUserStore;
