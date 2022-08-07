import {Component} from "react";
import HelloWorldService from "../api/HelloWorldService";

class WelcomeComponent extends Component {

    constructor(props) {
        super(props);

        this.goToTodos = this.goToTodos.bind(this);
        // this.getSpringHelloWorld = this.getSpringHelloWorld.bind(this);
        // this.getSpringHelloWorldBean = this.getSpringHelloWorldBean.bind(this);
        // this.getSpringHelloWorldPathVariable = this.getSpringHelloWorldPathVariable.bind(this);
        // this.getSpringHelloWorldException = this.getSpringHelloWorldException.bind(this);
        this.state = {
            welcomeMessage : ''
        }


    }

    render() {
        return (
            <>
                <div className={"container"}>
                    <h1>SIEMANECZKO</h1>
                    Siemano {this.props.params.name} na mojej stronie do nauki Reacta itd<br/>
                    Kliknij przycisk żeby zobaczyć czy znowu się caładuje okienko logowania<br/>
                    <button onClick={() => this.goToTodos(this.props.by)}>TODOS</button>
                </div>
                <div className={"container"}>
                    <h1>Tu się zaczyne spring</h1>
                    {this.props.params.name} słuchaj, klikniesz to i to wyśle request do Springa<br/>
                    Lets see!!<br/>
                    <button onClick={() => this.getSpringHelloWorld()}>SPRING DO</button><br/>
                    <button onClick={() => this.getSpringHelloWorldBean()}>SPRING DO BEAN</button><br/>
                    <button onClick={() => this.getSpringHelloWorldPathVariable()}>SPRING DO PATH NAME</button><br/>
                    <button onClick={() => this.getSpringHelloWorldException()}>SPRING DO ERROR</button>
                </div>
                <div className={"container"}>
                    {this.state.welcomeMessage}
                </div>
            </>
        )
    }


    goToTodos() {
        this.props.navigate("/todos")
    }

    getSpringHelloWorld() {
        HelloWorldService.executeHelloWorldService().then(response => this.handleSuccessfulResponse(response))
    }

    handleSuccessfulResponse(response){
        this.setState({welcomeMessage : response.data})
    }



    getSpringHelloWorldBean() {
        HelloWorldService.executeHelloWorldBeanService().then(response => this.handleSuccessfulBeanResponse(response))
    }

    handleSuccessfulBeanResponse(response){
        this.setState({welcomeMessage : response.data.message})
    }


    getSpringHelloWorldPathVariable() {
        HelloWorldService.executeHelloWorldPathVariableService(this.props.params.name)
            .then(response => this.handleSuccessfulBeanResponse(response))
    }

    getSpringHelloWorldException() {
        HelloWorldService.executeHelloWorldException(this.props.params.name)
            .then(response => this.handleSuccessfulBeanResponse(response))
            .catch(error => this.handleError(error))
    }

    handleError(error){
        let errorMessage = '';
        if(error.message){
            errorMessage += error.message
        }
        if(error.response && error.response.data){
            errorMessage += error.response.data.message
        }
        this.setState({welcomeMessage : errorMessage})
    }
}

export default WelcomeComponent