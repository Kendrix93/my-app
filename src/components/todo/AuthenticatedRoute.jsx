import {Component} from "react";
import AuthenticationService from "./AuthenticationService";
import {Navigate} from "react-router-dom";


class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggerId()) {
            return {...this.props.children}
        } else {
            return <Navigate to={"/login"}/>
        }
    }
}
export default AuthenticatedRoute