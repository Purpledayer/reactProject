import React,{Component} from "react";
import ReactDOM from 'react-dom';
import {Button } from 'antd';
import {Link} from 'react-router-dom'
 export default class popCheck extends Component {
  render() {
    return (
      <div class="page">
        <Button link="/form">点击按钮</Button>
      </div>
    )
  }
}
