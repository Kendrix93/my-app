import {Component} from "react";
import AuthenticationService from "./AuthenticationService";

class LoginComponent extends Component {



    constructor(props) {
        super(props);

        this.state = {
            username: 'patryk',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
        this.goToTodos = this.goToTodos.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // handlePasswordChange(event){
    //     console.log(event.target.value)
    //     this.setState({password:event.target.value})
    // }

    loginClicked() {

        // if (this.state.username === 'patryk' && this.state.password === "asdf") {
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //     console.log("no wchodzi ale nic nie robi")
        //     this.props.navigate(`/welcome/${this.state.username}`)
        //     // this.setState({showSuccessMessage: true})
        //     // this.setState({hasLoginFailed: false})
        // } else {
        //     this.setState({showSuccessMessage: false})
        //     this.setState({hasLoginFailed: true})
        // }

        console.log("State: " + this.state)


        // AuthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password).then(()=> {
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password);
        //     this.props.navigate(`/welcome/${this.state.username}`)
        // }).catch(()=>{
        //     this.setState({showSuccessMessage: false})
        //     this.setState({hasLoginFailed: true})
        // })


        AuthenticationService
            .executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username,response.data.token)
                this.props.navigate(`/welcome/${this.state.username}`)
            }).catch( () =>{
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        })

    }


    render() {
        return (
            <div className={"container"}>
                {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                <ShowLoginSuccessfully isLoggedSuccessfully={this.state.showSuccessMessage}/>
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input type="password" name="password" value={this.state.password}
                                 onChange={this.handleChange}/>
                <button className={"btn btn-success"} onClick={() => this.loginClicked(this.props.by)}>Login</button>
                {this.state.hasLoginFailed && <div className={"alert alert-warning"}>Invalid Credentials</div>}
                <br/>
                <br/>
                <button onClick={() => this.goToTodos(this.props.by)}>TODOS</button>
            </div>
        )
    }

    goToTodos(){
        this.props.navigate("/todos")
    }
}


function ShowLoginSuccessfully(props) {
    if (props.isLoggedSuccessfully) {
        return <div>Login Successful</div>
    } else {
        return null
    }
}

export default LoginComponent