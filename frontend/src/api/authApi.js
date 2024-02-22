export class AuthApi {
  constructor(api) {
    this.api = api
  }

  async login(data) {
    return this.api({
      url: '/auth/token/login/',
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async signUp(data) {
    return this.api({
      url: '/auth/users/',
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async profile(accessToken) {
    return this.api({
      url: '/auth/users/me',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${accessToken}`,
      }
    })
  }
  async updateProfile(accessToken, data) {
    return this.api({
      url: '/auth/users/me/',
      method: 'PUT',
      data ,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${accessToken}`,
      },
     
    });
  }


}