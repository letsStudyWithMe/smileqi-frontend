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
    userRole: 'user',
    userAccount: undefined,
    token: '',
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
      const res = await getUserInfo();
      this.setInfo(res.data);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        // 存token
        setToken(res.data.token);
        this.userName = res.data.userName
        this.userAccount = res.data.userAccount
        this.userRole = res.data.userRole
        this.token = res.data.token
        this.userAvatar = res.data.userAvatar
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
