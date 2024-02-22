// checkAuth.js
export default function checkAuth() {
    const accessToken = localStorage.getItem('auth_token');
    return !!accessToken;
  }
  