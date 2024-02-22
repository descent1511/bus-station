export class BusApi {
    constructor(api) {
        this.api = api
    }

    async getAllBus(accessToken) {
        return this.api({
            url: '/buses',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${accessToken}`,
            }
        })
    }
    async addBus(accessToken,data) {
        return this.api({
            url: '/buses/',
            method: 'POST',
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${accessToken}`,
            }
        })
    }

    async deleteBus(accessToken,data) {
        let url = `/buses/${data}`;
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