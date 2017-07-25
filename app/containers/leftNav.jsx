import React,{Component} from "react";
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;
export default class LeftNav extends Component {
    render() {
    return (
        <div>
            <div className="logo" />
            <Menu className="colorWhite" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark" >
                <Menu.Item key="1">
                    <Icon type="pie-chart" /><span><Link to="/houseManage">第一导航</Link></span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="desktop" /><span><Link to="/test">test导航</Link></span>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="inbox" /><span>Option 3</span>
                </Menu.Item>
            </Menu>
        </div>
    );
  }
}
