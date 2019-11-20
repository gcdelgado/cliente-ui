import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/login';

class AuthService{

    login(credentials){
        return axios.post(USER_API_BASE_URL, credentials);
    }

    getUserToken(){
        return JSON.parse(localStorage.getItem("userToken"));
    }

    getUserName(){
        return localStorage.getItem("userName");
    }

    getAuthHeader() {
        return {headers: {Authorization: this.getUserToken() }};
    }

    logOut() {
        localStorage.removeItem("userToken");
        return axios.post(USER_API_BASE_URL + 'logout', {}, this.getAuthHeader());
    }

}

export default new AuthService();