import { defineStore } from 'pinia';
import { busApi } from '@/api';


const busStore = defineStore('bus', {
    state: () => ({
        buses: [],
        bus_types : []
    }),

    actions: {
        async getAllBus() {
            try {
                const accessToken = localStorage.getItem('auth_token');

                const response = await busApi.getAllBus(accessToken);
                this.buses = response.data;
                return response;
            } catch (error) {
                console.error('Error while fetching buses:', error);
                throw error;
            }
        },
        async addBus(data) {
            try {
                const accessToken = localStorage.getItem('auth_token');
                const response = await busApi.addBus(accessToken, data);
                return response;
            } catch (error) {
                console.error('Error while add bus:', error);
                throw error;
            }
        },
        async deleteBus(data) {
            try {
                const accessToken = localStorage.getItem('auth_token');
                const response = await busApi.deleteBus(accessToken, data);
                return response;
            } catch (error) {
                console.error('Error while delete bus:', error);
                throw error;
            }
        },
    },

});

export default busStore;
