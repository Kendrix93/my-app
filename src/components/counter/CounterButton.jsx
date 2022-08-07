import React, {Component} from "react";
import PropTypes from "prop-types";

class CounterButton extends Component {

    constructor() {
        super();
        this.state = {
            counter : 0,
        }
        // this.increment = this.increment.bind(this)
        // this.decrement = this.decrement.bind(this)
    }

    render() {
        // let style = {fontSize: "50px"};
        // const style = {fontSize: "50px"};
        return (
            <div className="counter">
                <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
                {/*<span className="count" style={style}>{this.state.counter}</span>*/}
            </div>
        )
    }

    // increment() {
    //     this.props.incrementMethod(this.props.by);
    // }

    // decrement() {
        // console.log('wciskam')
        // this.state.counter ++;
        // this.setState(
        //     {counter: this.state.counter - this.props.by}
        // );
        // this.props.decrementMethod(this.props.by);
    // }

}

CounterButton.defaultProps = {
    by : 1
}

CounterButton.propTypes = {
    by : PropTypes.number
}


export default CounterButton