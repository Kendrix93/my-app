import React, {Component} from "react";
import moment from "moment";
import {Formik, Field, Form, ErrorMessage} from "formik";
import TodoDataService from "../api/TodoDataService";
import AuthenticationService from "./AuthenticationService";

class TodoComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: 1,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
    }

    componentDidMount() {

        if (this.props.params.id === -1) {
            return
        }

        let loggedInUserName = AuthenticationService.getLoggedInUserName();

        TodoDataService.executeGetTodo(loggedInUserName, this.props.params.id).then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }
        ))
        console.log("jestem asdfg " + loggedInUserName + this.state.id)
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Should have at least 5 Characters'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid date'
        }

        return errors
    }

    render() {
        return (

            <div>
                <h1>Todo component for id {this.props.params.id}</h1>
                <div className={"container"}>
                    <Formik
                        initialValues={{
                            description: this.state.description,
                            targetDate: moment(new Date()).format('YYYY-MM-DD')
                        }}
                        onSubmit={(values) => {
                            let loggedInUserName = AuthenticationService.getLoggedInUserName();

                            let todo = {
                                id: this.props.params.id,
                                description: values.description,
                                targetDate: values.targetDate
                            }

                            if (this.props.params.id === -1) {
                                TodoDataService.createTodoRow(loggedInUserName, todo)
                                    .then(this.props.navigate(`/todos`))
                            } else {
                                TodoDataService.updateTodoRow(loggedInUserName, this.props.params.id, todo)
                                    .then(this.props.navigate(`/todos`))
                            }
                        }}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        <Form>
                            <ErrorMessage name={"description"} component={"div"} className={"alert alert-warning"}/>
                            <ErrorMessage name={"targetDate"} component={"div"} className={"alert alert-warning"}/>

                            <fieldset className={"form-group"}>
                                <label>Description</label>
                                <Field className={"form-control"} name="description" type="text"/>

                                <label>Target Date</label>
                                <Field className={"form-control"} id="targetDate" name="targetDate" type="date"/>

                                <button type="submit">Submit</button>
                            </fieldset>
                        </Form>
                    </Formik>
                </div>
            </div>

        )
    }
}

export default TodoComponent