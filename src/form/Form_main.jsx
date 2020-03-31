import React from "react";
import {Button, Form} from 'react-bootstrap';


class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    handleClick = () => {
        alert('Пошел нахуй')
    }
    render() {
        return (
            <div>
                <h1>Программа подсчета питания</h1>
                <Form>
                    
                </Form>
                <Button onClick = {this.handleClick}>Привет</Button>
            </div>
        )
    }
}

export default Form;