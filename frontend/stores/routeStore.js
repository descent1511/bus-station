import { defineStore } from 'pinia';
import { routeApi } from '@/api';


const routeStore = defineStore('route', {
    state: () => ({
        routes: [],
    }),

    actions: {
        async getAllRoute() {
            try {
                const accessToken = localStorage.getItem('auth_token');
             
                const response = await routeApi.getAllRoute(accessToken);
                this.routes = response.data;
                return response;
            } catch (error) {
                console.error('Error while fetching routes:', error);
                throw error;
            }
        },
        async getRouteByData(data) {
            try {
                const accessToken = localStorage.getItem('auth_token');
                const response = await routeApi.getRouteByData(accessToken,data);
                return response;
            } catch (error) {
                console.error('Error while fetching routes:', error);
                throw error;
            }
        },
    },

});

export default routeStore;
