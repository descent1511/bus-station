export class ScheduleApi {
    constructor(api) {
        this.api = api
    }

    async getAllSchedule(accessToken) {
        return this.api({
            url: '/assignments',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${accessToken}`,
            }
        })
    }
    async addSchedule(accessToken,data) {
        return this.api({
            url: '/assignments/',
            method: 'POST',
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${accessToken}`,
            }
        })
    }

    async deleteSchedule(accessToken,data) {
        let url = `/assignments/${data}`;
        return this.api({
            url,
            method: 'DELETE',
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${accessToken}`,
            }
        })
    }
   





}