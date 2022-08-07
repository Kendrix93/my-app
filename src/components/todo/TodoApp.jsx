import {Component} from "react";
import {BrowserRouter as Routers, Link, Route, Routes} from 'react-router-dom'
import withNavigationAndParam from "./WithNavigationAndParam";
import PageNotFoundComponent from "./PageNotFoundComponent";
import WelcomeComponent from "./WelcomePageComponent";
import LoginComponent from "./LoginComponent";
import AuthenticationService from "./AuthenticationService";
import LogoutComponent from "./LogoutComponent";
import AuthenticatedRoute from "./AuthenticatedRoute";
import TodoDataService from "../api/TodoDataService";
import TodoComponent from "./TodoComponent";
import moment from "moment";

class TodoApp extends Component {
    render() {
        const WelcomeComponentWithNavigation = withNavigationAndParam(WelcomeComponent);
        const LoginComponentWithNavigation = withNavigationAndParam(LoginComponent);
        const PageNotFoundComponentWithNavigation = withNavigationAndParam(PageNotFoundComponent);
        const ListTodosComponentWithNavigation = withNavigationAndParam(ListTodosComponent);
        const HeaderComponentWithNavigation = withNavigationAndParam(HeaderComponent);
        const LogoutComponentWithNavigation = withNavigationAndParam(LogoutComponent);
        const TodoComponentWithNavigation = withNavigationAndParam(TodoComponent);
        console.log("todo component");
        return (
            <div className={"TodoApp"}>
                <Routers>
                    <HeaderComponentWithNavigation/>
                    <Routes>
                        <Route path="/" element={<LoginComponentWithNavigation/>}/>
                        <Route path="/welcome/:name" element={
                            <AuthenticatedRoute>
                                <WelcomeComponentWithNavigation/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path="*" element={<PageNotFoundComponentWithNavigation/>}/>

                        <Route path="/todos/:id" element={
                            <AuthenticatedRoute>
                                <TodoComponentWithNavigation/>
                            </AuthenticatedRoute>}/>

                        <Route path="/todos" element={
                            <AuthenticatedRoute>
                                <ListTodosComponentWithNavigation/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path="/logout" element={<LogoutComponentWithNavigation/>}/>

                    </Routes>
                    <FooterComponent/>
                </Routers>
            </div>
        )
    }

}

/**
 * @param {{targetDate:string}} data
 * @param todoList.isDone          Information about if it is done
 */
class ListTodosComponent extends Component {
    constructor(props) {
        super(props);
        console.log("ListTodosComponent constructor");
        this.state = {
            todos: [],
            message: null
        }
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.refreshTodos()
    }

    refreshTodos(){
        let userName = AuthenticationService.getLoggedInUserName()
        TodoDataService.executeGetAllTodos(userName).then(
            response => {
                console.log(response.data)
                this.setState({todos: response.data})
            }
        )
    }

    componentWillUnmount() {
        console.log("componentWillUnmount")
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("shouldComponentUpdate")
        console.log(nextProps)
        console.log(nextState)
        console.log(nextContext)
        return true
    }

    updateTodoClicker(id){
        this.props.navigate(`/todos/${id}`)
    }

    addTodo(id){
        this.props.navigate(`/todos/-1`)
    }

    deleteTodoClicker(id){
        let userName = AuthenticationService.getLoggedInUserName()
        TodoDataService.deleteTodoRow(userName, id).then(
            () => {
                this.setState({message : `Delete of todo ${id} Successful!`})
                this.refreshTodos()
            }
        )
    }

    render() {
        console.log("laduje tabelke ");
        return (
            <div>
                <h1> List Todos</h1>
                {this.state.message && <div className="alert alert-success">{ this.state.message}</div>}
                <div className={"container"}>
                    <table className={"table"}>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Description</th>
                            <th>Target Date</th>
                            <th>Done</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map(
                                todoList =>
                                    <tr key={todoList.id}>
                                        <td>{todoList.id}</td>
                                        <td>{todoList.description}</td>
                                        <td>{moment(todoList.targetDate).format('YYYY-MM-DD')}</td>
                                        <td>{todoList.done.toString()}</td>
                                        <td>
                                            <button className={"btn btn-success"}
                                                    onClick={() => this.updateTodoClicker(todoList.id)}>Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className={"btn btn-warning"}
                                                    onClick={() => this.deleteTodoClicker(todoList.id)}>Delete
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div>
                        <button className={"btn btn-success"}
                                onClick={() => this.addTodo()}>Add
                        </button>

                    </div>
                </div>
            </div>
        )
    }

}

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggerId();
        console.log(isUserLoggedIn)
        console.log("HeaderComponent")
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href={"https://www.onet.pl"} className={"navbar-brand"}>PATRYK</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to={"/welcome/patryk"}>Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to={"/todos"}>Todos</Link></li>}
                    </ul>
                    <ul className={"navbar-nav navbar-collapse justify-content-end"}>
                        {!isUserLoggedIn && <li><Link className="nav-link" to={"/"}>Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to={"/logout"}
                                                     onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component {
    render() {
        return (
            <div>
                <footer className={"footer"}>
                    <span className={"text-muted"}>Wszelkie prawa sa moje a to jest stopka haha @xx #react</span>
                </footer>
            </div>
        )
    }
}


export default TodoApp