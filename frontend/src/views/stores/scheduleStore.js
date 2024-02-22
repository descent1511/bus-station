import { defineStore } from 'pinia';
import { scheduleApi } from '@/api';


const scheduleStore = defineStore('schedule', {
    state: () => ({
        schedules: [],
    }),

    actions: {
        async getAllSchedule() {
            try {
                const accessToken = localStorage.getItem('auth_token');
                const response = await scheduleApi.getAllSchedule(accessToken);
                this.schedules = response.data;
                return response;
            } catch (error) {
                console.error('Error while fetching schedules:', error);
                throw error;
            }
        },
      
        async addSchedule(data) {
            try {

                const accessToken = localStorage.getItem('auth_token');
                console.log(data)
                const response = await scheduleApi.addSchedule(accessToken, data);
                return response;
            } catch (error) {
                console.error('Error while add schedule:', error);
                throw error;
            }
        },
        async deleteSchedule(data) {
            try {
                const accessToken = localStorage.getItem('auth_token');
                const response = await scheduleApi.deleteSchedule(accessToken, data);
                return response;
            } catch (error) {
                console.error('Error while delete schedule:', error);
                throw error;
            }
        },
    },

});

export default scheduleStore;
