import { defineStore } from 'pinia';
import { driverApi } from '@/api';


const driverStore = defineStore('driver', {
    state: () => ({
        drivers: [],
    }),

    actions: {
        async getAllDriver() {
            try {
                const accessToken = localStorage.getItem('auth_token');

                const response = await driverApi.getAllDriver(accessToken);
                this.drivers = response.data;
                return response;
            } catch (error) {
                console.error('Error while fetching drivers:', error);
                throw error;
            }
        },
        async getDriverByClass(data) {
            try {
                const accessToken = localStorage.getItem('auth_token');
                const response = await driverApi.getDriverByClass(accessToken, data);
                this.drivers = response.data;
                return response;
            } catch (error) {
                console.error('Error while fetching drivers:', error);
                throw error;
            }
        },
        async addDriver(data) {
            try {
                const accessToken = localStorage.getItem('auth_token');
                const response = await driverApi.addDriver(accessToken, data);
                return response;
            } catch (error) {
                console.error('Error while add driver:', error);
                throw error;
            }
        },
        async deleteDriver(data) {
            try {
                const accessToken = localStorage.getItem('auth_token');
                const response = await driverApi.deleteDriver(accessToken, data);
                return response;
            } catch (error) {
                console.error('Error while delete driver:', error);
                throw error;
            }
        },
    },

});

export default driverStore;
