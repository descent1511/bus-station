import { defineStore } from 'pinia';
import { authApi } from '@/api';

const authStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    redirectUrl: null,
    isLoggedIn : false,
  }),
  actions: {
    async login({ username, password }) {
      try {
        const response = await authApi.login({ username, password });
        this.accessToken = response.data.auth_token;
        this.user = await authApi.profile(this.accessToken);
        this.user = this.user.data
        this.isLoggedIn = true;
        return response;
      } catch (error) {
        console.error('Error during login:', error);
        throw error;
      }
    },

    async signUp(data) {
      try {
        const response = await authApi.signUp(data);
        //this.user = await authApi.profile(this.accessToken);
        this.accessToken = response.data.auth_token;
        return response;
      } catch (error) {
        console.error('Error during sign-up:', error);
        throw error;
      }
    },

    async updateProfile(data) {
      try {
        
        const response = await authApi.updateProfile(this.accessToken, data);
        this.user = response.data
        
        return response;
      } catch (error) {
        console.error('Error during sign-up:', error);
        throw error;
      }
    },

    logout() {
      this.user = null;
      this.accessToken = null;
      this.isLoggedIn = false;
    },
  },
});
export default authStore;