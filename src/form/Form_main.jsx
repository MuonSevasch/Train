import React from "react";
import {Button, Form, Col, Row, Spinner} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'
import 'antd/dist/antd.css'

import './Success'

import {Checkbox} from "antd";
import Success from "./Success";


class Form_main extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            value: '',
            sex: '',
            name: '',
            surname: '',
            count: undefined,
            activite: '',
            error: null,
            isLoaded: false,
            items: [],
            email: '',
            result: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({
            [event.target.sex]: event.target.value,
            [event.target.count]: event.target.value,
            [event.target.activite]: event.target.value,
        });
        console.log(event.target)
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/todos/")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        const {error, isLoaded} = this.state;
        if (error) {
            return <div>Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>;
        } else {
            return (

                <div className='center'>
                    <h1 style={{textAlign: 'center'}}>Программа подсчета питания</h1>
                    <Form style={{margin:'5%', textAlign: 'center'}}>
                        <Form.Group>
                            <Form.Control placeholder="Имя"/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Control placeholder="Фамилия"/>
                        </Form.Group>

                        <Form.Group type="number" size='sm'>
                            <Form.Control placeholder="Рост"/>
                        </Form.Group>
                        <Form.Group type="number" size='sm'>
                            <Form.Control placeholder="Вес"/>
                        </Form.Group>

                        <Form.Group type="number" size='sm'>
                            <Form.Control placeholder="Возраст"/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Row sm={10} name="sex" value={this.state.sex} onChange={this.handleChange}>
                                <Form.Check value={'Мужчина'}
                                            type="radio"
                                            label="Мужчина"
                                            name="sex"
                                            id="formHorizontalRadios1"
                                            style={{marginRight: '20px'}}
                                />
                                <Form.Check value={'Женщина'}
                                            type="radio"
                                            label="Женщина"
                                            name="sex"
                                            id="formHorizontalRadios2"
                                />

                            </Row>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label>Ваши пожелания</Form.Label>
                            <Form.Control name='value' as="select" value={this.state.value}
                                          onChange={this.handleChange}>
                                <option value={''}>...</option>
                                <option value={'Сбросить вес'}>Сбросить вес</option>
                                <option value={'Набрать массу'}>Набрать массу</option>
                                <option value={'Задачка'}>Решить задачку по сопромату</option>
                            </Form.Control>
                        </Form.Group>


                        <Form.Group as={Row}>
                            <Form.Label>Планируемое количество тренировок в неделю</Form.Label>
                            <Form.Control name='count' as="select" value={this.state.count}
                                          onChange={this.handleChange}>
                                <option value={undefined}>...</option>
                                <option value={1}>Новичок</option>
                                <option value={2}>Уебать Стырта</option>
                                <option value={3}>Решить задачку по сопромату</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label>Уровень активности</Form.Label>
                            <Form.Control name='activite' as="select" value={this.state.activite}
                                          onChange={this.handleChange}>
                                <option value={''}>...</option>
                                <option value={'Новичок'}>Новичок</option>
                                <option value={'Уебать'}>Уебать Стырта</option>
                                <option value={'Задачка'}>Решить задачку по сопромату</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group name='email' as={Row} controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"/>
                        </Form.Group>

                        <Checkbox.Group name='' style={{width: '100%', margin: 0, padding: 0, textAlign: 'left'}}
                            // value={this.state.result}
                            // onChange={this.handleChange}
                        >


                            <Form.Label> <h4> Ваши предпочтения на завтрак:</h4></Form.Label>
                            {this.state.items.filter(obj => obj.userId === 1).map(
                                obj => {
                                    return <Col key={obj.id}>
                                        <Checkbox value={obj.userId}>{obj.id}</Checkbox>
                                    </Col>
                                }
                            )}
                        </Checkbox.Group>
                        <Button variant="primary" onClick={this.handleSubmit} style={{marginTop:'10%'}}>
                            Отправить
                        </Button>


                    </Form>
                    <Success />
                </div>
            )
        }
    }
}

export default Form_main;