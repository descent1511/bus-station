export class DriverApi {
    constructor(api) {
        this.api = api
    }

    async getAllDriver(accessToken) {
        return this.api({
            url: '/drivers',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${accessToken}`,
            }
        })
    }

    async getDriverByClass(accessToken, data) {
        let url = `/drivers/class/${data}`;

      
        return this.api({
            url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${accessToken}`,
            }
        });
    }
    async addDriver(accessToken,data) {
        return this.api({
            url: '/drivers/',
            method: 'POST',
            data,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${accessToken}`,
            }
        })
    }
    async deleteDriver(accessToken,data) {
        let url = `/drivers/${data}`;
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