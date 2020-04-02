import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Form as BootForm, Col, Row, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import Api from "../global/api";

import Food from "../Food";
import Success from "../Success";
import Error from "../Error";

import "./info-form.css";
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";
import "antd/dist/antd.css";

const infoSchema = Yup.object().shape({
  email: Yup.string()
    .email("Неверный email")
    .required("Обязательно для заполнения"),
  firstName: Yup.string().required("Обязательно для заполнения"),
  lastName: Yup.string().required("Обязательно для заполнения"),

  height: Yup.string()
    .matches(/^[0-9]*$/, "Только числа")
    .required("Обязательно для заполнения"),
  weight: Yup.string()
    .matches(/^[0-9]*$/, "Только числа")
    .required("Обязательно для заполнения"),
  age: Yup.string()
    .matches(/^[0-9]*$/, "Только числа")
    .required("Обязательно для заполнения")
});

export default class InfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target: "",
      sex: "",
      count: undefined,
      activityLevel: -1,
      error: null,
      isLoading: true,
      selected_products: {},
      success: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({ selected_products: {} });
    this.setLoading();
   
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleProducts = (event, type) => {
    const { selected_products } = this.state;

    if (event.target.checked) {
      const array = selected_products[type] ? selected_products[type] : [];
      this.setState({
        selected_products: {
          ...selected_products,
          [type]: [...array, event.target.value]
        }
      });
    } else {
      const newLoot = selected_products[type].filter(
        food => food !== event.target.value
      );
      this.setState({
        selected_products: {
          ...selected_products,
          [type]: newLoot
        }
      });
    }
  };

  handleSubmit = async values => {
    const { email, firstName, lastName, height, weight, age } = values;
    const { target, activityLevel, sex, selected_products } = this.state;
   
    const info = {
      firstName,
      lastName,
      email,
      height,
      weight,
      age,
      target,
      sex,
      activityLevel,
      selected_products
    };
    await Api.sendInfo(info)
      .then(response => {
        console.log(response);
        this.setState({ success: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  setLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading
    });
  };

  render() {
    const { error, isLoading, selected_products, success } = this.state;
    if (error) {
      return <div>Ошибка: {error.message}</div>;
    } else if (isLoading) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else {
      return (
        <div className="center">
          <h2 style={{ textAlign: "center" }}>Программа подсчета питания</h2>

          <Formik
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              height: "",
              weight: "",
              age: ""
            }}
            validationSchema={infoSchema}
            onSubmit={this.handleSubmit}
          >
            <Form autoComplete="off" className="form">
              <BootForm.Group as={Row}>
                <Col className="col" md={12}>
                  <BootForm.Label column>Email</BootForm.Label>
                  <Field
                    className="input"
                    label="Email"
                    name="email"
                    placeholder="ivan-neivanov@gmail.com"

                    // invalid={touched.email && errors.email}
                  ></Field>
                  <ErrorMessage name="email">
                    {message => <Error message={message} />}
                  </ErrorMessage>
                </Col>
              </BootForm.Group>
              <BootForm.Group as={Row}>
                <Col className="col" md={6}>
                  <BootForm.Label column>Имя</BootForm.Label>
                  <Field
                    className="input"
                    type="text"
                    name="firstName"
                    placeholder="Иван"
                  ></Field>
                  <ErrorMessage
                    name="firstName"
                    render={message => <Error message={message} />}
                  />
                </Col>

                <Col className="col" md={6}>
                  <BootForm.Label column>Фамилия</BootForm.Label>
                  <Field
                    className="input"
                    type="text"
                    name="lastName"
                    placeholder="Неиванов"
                  ></Field>
                  <ErrorMessage
                    name="lastName"
                    render={message => <Error message={message} />}
                  />
                </Col>
              </BootForm.Group>

              <BootForm.Group as={Row}>
                <Col className="col" md={4}>
                  <BootForm.Label column>Рост, см</BootForm.Label>
                  <Field
                    className="input"
                    type="text"
                    name="height"
                    placeholder="175"
                  ></Field>
                  <ErrorMessage
                    name="height"
                    render={message => <Error message={message} />}
                  />
                </Col>

                <Col className="col" md={4}>
                  <BootForm.Label column>Вес, кг</BootForm.Label>
                  <Field
                    className="input"
                    type="text"
                    name="weight"
                    placeholder="80"
                  ></Field>
                  <ErrorMessage
                    name="weight"
                    render={message => <Error message={message} />}
                  />
                </Col>

                <Col className="col" md={4}>
                  <BootForm.Label column>Возраст</BootForm.Label>
                  <Field
                    className="input"
                    type="text"
                    name="age"
                    placeholder="30"
                  ></Field>

                  <ErrorMessage
                    name="age"
                    render={message => <Error message={message} />}
                  />
                </Col>
              </BootForm.Group>

              <BootForm.Group as={Row}>
                <BootForm.Group as={Col}>
                  <Row
                    sm={10}
                    name="sex"
                    value={this.state.sex}
                    onChange={this.handleChange}
                  >
                    <BootForm.Check
                      value="male"
                      type="radio"
                      label="Мужчина"
                      name="sex"
                      id="formHorizontalRadios1"
                      style={{ marginRight: "20px" }}
                    />
                    <BootForm.Check
                      value="female"
                      type="radio"
                      label="Женщина"
                      name="sex"
                      id="formHorizontalRadios2"
                    />
                  </Row>
                </BootForm.Group>
              </BootForm.Group>

              <BootForm.Group as={Row}>
                <Col className="col" md={12}>
                  <BootForm.Label column>Ваши пожелания</BootForm.Label>
                  <BootForm.Control
                    name="target"
                    as="select"
                    value={this.state.value}
                    onChange={this.handleChange}
                  >
                    <option value={""}>...</option>
                    <option value={"loss"}>Сбросить вес</option>
                    <option value={"maintenance"}>Поддерживать форму</option>
                    <option value={"gain"}>Набрать массу</option>
                  </BootForm.Control>
                </Col>
              </BootForm.Group>


              {/* <BootForm.Group as={Row}>
                <BootForm.Label>
                  Планируемое количество тренировок в неделю
                </BootForm.Label>
                <BootForm.Control
                  name="count"
                  as="select"
                  value={this.state.count}
                  onChange={this.handleChange}
                >
                  <option value={undefined}>...</option>
                  <option value={1}>Новичок</option>
                  <option value={2}>Уебать Стырта</option>
                  <option value={3}>Решить задачку по сопромату</option>
                </BootForm.Control>
              </BootForm.Group> */}


              <BootForm.Group as={Row}>
              <Col className="col" md={12}>
                <BootForm.Label>Уровень активности</BootForm.Label>
                <BootForm.Control
                  name="activityLevel"
                  as="select"
                  value={this.state.activite}
                  onChange={this.handleChange}
                >
                  <option value={""}>...</option>
                  <option value={0}>Очень низкий</option>
                  <option value={1}>Низкий</option>
                  <option value={2}>Средний</option>
                  <option value={3}>Высокий</option>
                  <option value={4}>Очень высокий</option>
                </BootForm.Control>
                </Col>
              </BootForm.Group>

              <Food
                selected_products={selected_products}
                handleProducts={this.handleProducts}
              />
              <Button
                type="submit"
                variant="primary"
                style={{ marginTop: "10%" }}
              >
                Отправить
              </Button>
            </Form>
          </Formik>
          <Modal
            show={success}
            onHide={() => {
              this.setState({ success: !success });
            }}
            centered={true}
          >
            <Modal.Header closeButton>
              <Success success={success} />
            </Modal.Header>
          </Modal>
        </div>
      );
    }
  }
}
