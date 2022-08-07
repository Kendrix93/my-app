import React, {Component} from 'react';
import logo from './logo.svg';
import TodoApp from "./components/todo/TodoApp";
import './App.css';
import './bootstrap.css';

class App extends Component {
    render() {

        return (
            <div className="App">
                <LearningComponent/>
            </div>
        );
    }
}


class LearningComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                {/*<FirstComponent/>*/}
                {/*<SecondComponent/>*/}
                {/*<FirstFunction/>*/}
                {/*<br/>*/}
                {/*<Counter/>*/}
                {/*<br/>*/}
                <TodoApp/>
            </div>
        );
    }


}


export default App;