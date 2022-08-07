import React, {Component} from "react";
import PropTypes from "prop-types";

class ResetButton extends Component {

    constructor() {
        super();
        this.state = {
            counter : 0,
        }
        this.reset = this.reset.bind(this)
    }

    render() {
        // let style = {fontSize: "50px"};
        const style = {fontSize: "50px"};
        return (
            <div className="counter">
                <button onClick={this.reset}>RESET</button>
            </div>
        )
    }

    reset() {
        this.props.decrementMethod(this.props.by);
    }


}

ResetButton.propTypes = {
    by : PropTypes.number
}

export default ResetButton