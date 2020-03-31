import React, { Component } from "react";
import axios from "axios";

const baseURL = "http://25.48.59.169:8080/public/api";

class Api {
  async getAllFood() {
    let allFood = [];
    await axios
      .get(`${baseURL}/food`)
      .then(function(response) {
        allFood = response.data;
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });

    return allFood;
  }

  async getTime(category, activity, date) {
    let time = [];
    await axios
      .get(`${baseURL}/services_v2/${activity}/${date}`, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origins": "*",
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(function(response) {
        time = response.data;
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
    return time;
  }

  async sendInfo(info) {
    let data = {};
    await axios
      .post(`${baseURL}/userform`, info)
      .then(response => {
        data = response;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    return data;
  }
}

export default new Api();
