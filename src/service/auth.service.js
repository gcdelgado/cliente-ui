import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8080/login';

class AuthService{

    login(credentials){
        return axios.post(USER_API_BASE_URL, credentials, {headers: {'Access-Control-Allow-Origin': true}});
    }

    getUserInfo(){
        return JSON.parse(localStorage.getItem("userInfo"));
    }

    getAuthHeader() {
        return {headers: {Authorization: this.getUserInfo() }};
    }

    logOut() {
        localStorage.removeItem("userInfo");
        return axios.post(USER_API_BASE_URL + 'logout', {}, this.getAuthHeader());
    }

}

export default new AuthService();