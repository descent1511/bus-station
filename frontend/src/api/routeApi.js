export class RouteApi {
    constructor(api) {
        this.api = api
    }

    async getAllRoute(accessToken) {
        return this.api({
            url: '/routes',
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${accessToken}`,
            }
        })
    }

    async getRouteByData(accessToken, data) {
        let url = '/routes/search';
        let queryParams = [];
        console.log(data)
   
        if (data.date !== '' && data.date !== undefined) {
            console.log(data.date)
            queryParams.push(`date=${data.date}`);
        }

      
        if (data.start_point !== '' && data.start_point !== undefined) {
            // console.log(data.start_point)
            queryParams.push(`start_point=${data.start_point}`);
        }

  
        if (data.end_point !== '' && data.end_point !== undefined) {
            // console.log(data.end_point)
            queryParams.push(`end_point=${data.end_point}`);
        }

        if (queryParams.length > 0) {
            url += '?' + queryParams.join('&');
        }

        return this.api({
            url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${accessToken}`,
            }
        });
    }




}