import React, {Component} from "react";

export class SecondComponent extends Component {
    render() {
        return (
            <div className="SecondComponent">
                Dwa Component 2
            </div>
        );
    }
}

export function FirstFunction(){
    return (
        <div className="FirstFunction">
            Pierwszy komponent
        </div>
    );
}

export default SecondComponent;