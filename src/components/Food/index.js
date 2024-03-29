import React, { Component } from "react";

import { Button, Form as BootForm, Col, Row } from "react-bootstrap";
import { Checkbox } from "antd";

import Api from "../global/api";

import { foodTypes, foodLimiters } from "../../utils/utils";
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";
import "antd/dist/antd.css";
import "./food.css";

export default class Food extends Component {
  state = {
    groupedFood: {},
    foodLimiters: foodLimiters,
    productsRequired: {}
  };
  componentDidMount() {
    const getAllFood = async () => {
      await Api.getAllFood().then(food => {
        this.setState({ groupedFood: this.groupBy(food, "type") });
      });
      await Api.getProductsRequired().then(productsRequired => {
        this.setState({ productsRequired });
      });
    };
    const getProductsRequired = async () => {};
    getAllFood();
    getProductsRequired();
  }

  groupBy = (items, key) => {
    const result = items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [...(result[item[key]] || []), item]
      }),
      {}
    );
    return result;
  };

  handleCount = (event, type) => {
    const { foodLimiters } = this.state;
    let count = foodLimiters.default;
    count = count + foodLimiters[type];
    this.setState({ foodLimiters: { ...foodLimiters, [type]: count } });
  };

  render() {
    const { groupedFood, foodLimiters, productsRequired } = this.state;
    const { selected_products } = this.props;
    const foodToRender = Object.keys(groupedFood).map(type => {
      const array = selected_products[type] ? selected_products[type] : [];
      return (
        <div key={type}>
          <h6>{foodTypes[type]} </h6>
          <span className="span">
            {productsRequired[type] &&
            array.length < productsRequired[type].min ? (
              <>Выберите ещё {productsRequired[type].min - array.length}</>
            ) : (
              <></>
            )}
          </span>
          {groupedFood[type]
            .filter((food, index) => index < foodLimiters[type] + 1)
            .map((foodItem, index) => {
              return (
                <>
                  {index < foodLimiters[type] ? (
                    <Col key={index}>
                      <Checkbox
                        name="selected_products"
                        value={foodItem._id}
                        onChange={event =>
                          this.props.handleProducts(event, type)
                        }
                      >
                        {foodItem.name}
                      </Checkbox>
                    </Col>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="light"
                        onClick={event => this.handleCount(event, type)}
                      >
                        Показать больше
                      </Button>
                    </>
                  )}
                </>
              );
            })}
        </div>
      );
    });
    return (
      <Checkbox.Group
        name=""
        style={{
          width: "100%",
          margin: 0,
          padding: 0,
          textAlign: "left"
        }}
    
      >
        <BootForm.Label>
          {" "}
          <h4> Ваши предпочтения на завтрак:</h4>
        </BootForm.Label>

        {foodToRender}
      </Checkbox.Group>
    );
  }
}
