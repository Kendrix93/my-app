import axios from "axios";
import {LOCALHOST} from "../../constant";

export const AUTH_USER = 'authenticatedUser';


class AuthenticationService {

    executeJwtAuthenticationService(username, password){
        console.log( username + " " + password)
        return axios.post(LOCALHOST + 'authenticate',
            {username, password})
    }

    executeBasicAuthenticationService(username, password){
        return axios.get(LOCALHOST + 'basicauth', {
            headers : {
                authorization: this.createBasicAuthToken(username, password)
            }
        })
    }

    createBasicAuthToken(username, password){
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(userName, password){
        let basicAuthHeader = 'Basic' + window.btoa(userName + ":" + password)
        console.log("Register successful login")
        sessionStorage.setItem(AUTH_USER, userName);
        this.setupAxiosInterceptors(basicAuthHeader)
    }


    isUserLoggerId(){
        let user = sessionStorage.getItem(AUTH_USER)
        return user !== null;
    }

    setupAxiosInterceptors(token){
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggerId()){
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(AUTH_USER, username);
        this.setupAxiosInterceptors(this.createJWTToke(token))
    }

    createJWTToke(token) {
        console.log(token)
        return 'Bearer ' + token
    }

    logout() {
        sessionStorage.removeItem(AUTH_USER);
    }


    getLoggedInUserName() {
        let user = sessionStorage.getItem(AUTH_USER)
        if(user===null) return ''
        return user
    }


}

export default new AuthenticationService()