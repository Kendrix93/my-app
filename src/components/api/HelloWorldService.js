import axios from "axios";
import {LOCALHOST} from "../../constant";

class HelloWorldService {

    executeHelloWorldService(){
        return axios.get(`${LOCALHOST}hello-world`);
    }

    executeHelloWorldBeanService(){
        return axios.get( `${LOCALHOST}hello-world-bean`);
    }

    executeHelloWorldPathVariableService(name){
        return axios.get(`${LOCALHOST}hello-world-name/${name}`);
    }

    executeHelloWorldException(name){
        return axios.get(`${LOCALHOST}hello-world-exception/${name}`);
    }
}

export default new HelloWorldService()