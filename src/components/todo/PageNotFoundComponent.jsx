import {Component} from "react";

class PageNotFoundComponent extends Component {

    constructor(props) {
        super(props);

        this.goHomePage = this.goHomePage.bind(this);
    }

    render() {
        return (
            <div>Idź do strony główne <br/>
                Kliknij przycisk<br/>
                <button onClick={() => this.goHomePage(this.props.by)}>MAIN</button>

            </div>
        )
    }


    goHomePage(){
        this.props.navigate("/")
    }
}

export default PageNotFoundComponent