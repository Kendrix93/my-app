import React, {Component} from "react";
import './Counter.css'
import CounterButton from "./CounterButton";

class Counter extends Component {

    constructor() {
        super();
        this.state = {
            counter : 0,
        }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.reset = this.reset.bind(this)
    }

    render() {
        return (
            <div className="counter">
                <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterButton by={2} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
                <span className="count" style={{fontSize: "100px"}}>{this.state.counter}</span>
                <div>
                    <button className="reset" onClick={this.reset}>RESET</button>
                </div>
            </div>
        );
    }

    increment(by) {
        // console.log(`wciskam - ${by}`)
        // this.state.counter ++;
        this.setState(
            (prevState)=> {
                return { counter:prevState.counter + by}
             }
        );
    }

    decrement(by) {
        // console.log(`wciskam - ${by}`)
        // this.state.counter --;
        this.setState(
            (prevState)=> {
                return { counter:prevState.counter - by}
            }
        );
    }

    reset() {
        // console.log(`wciskam - ${by}`)
        // this.state.counter --;
        this.setState({counter: 0}
        );
    }

}




export default Counter