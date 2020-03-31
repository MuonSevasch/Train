import React, { Component } from "react";

import { Button, Form as BootForm, Col, Row } from "react-bootstrap";
import { Checkbox } from "antd";

import Api from "../global/api";

import { foodTypes } from "../../utils/utils";
import "bootstrap/dist/css/bootstrap.css";
import "../../App.css";
import "antd/dist/antd.css";

export default class Food extends Component {
  state = {
    count: 5,
    defaultCount: 5,
    groupedFood: {}
  };
  componentDidMount() {
    const getAllFood = async () => {
      console.log("hehe");
      await Api.getAllFood().then(food => {
        this.setState({ groupedFood: this.groupBy(food, "type") });
      });
    };
    getAllFood();
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

  handleCount = () => {
    let count = this.state.defaultCount;
    count = count + this.state.count;
    this.setState({ count });
  };

  // sortFood = () => {
  //   const { food } = this.state;
  //   const foodTypes = food
  //     .map(item => item.type)
  //     .filter((value, index, self) => self.indexOf(value) === index);

  //   const groupedFood = food.reduce(
  //     (entryMap, e) =>
  //       entryMap.set(e.type, [...(entryMap.get(e.type) || []), e]),
  //     new Map()
  //   );
  //   this.setState({ groupedFood });
  // };

  render() {
    const { groupedFood, count } = this.state;
 
    const foodToRender = Object.keys(groupedFood).map(type => {
      return (
        <>
          <h6 key={type}>{foodTypes[type]}</h6>
          {groupedFood[type].map((foodItem, index) => {
            return (
              <>
                {index < count ? (
                  <Col key={index}>
                    <Checkbox
                      name=" selected_products"
                      value={foodItem._id}
                      onChange={(event) =>
                        this.props.handleProducts(event, type)
                      }
                    >
                      {foodItem.name}
                    </Checkbox>
                  </Col>
                ) : (
                  <></>
                )}
              </>
            );
          })}
          <Button onClick={this.handleCount}>Показать больше</Button>
        </>
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
        // value={this.state.result}
        // onChange={this.handleChange}
      >
        <BootForm.Label>
          {" "}
          <h4> Ваши предпочтения на завтрак:</h4>
        </BootForm.Label>
        {/* {this.state.food.map((obj, index) => {
          return (
            <Col key={index}>
              <Checkbox value={obj.id}>{obj.id}</Checkbox>
            </Col>
          );
        })} */}
        {foodToRender}
      </Checkbox.Group>
    );
  }
}