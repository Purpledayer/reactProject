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
            <Menu className="colorWhite" defaultOpenKeys={['sub1']} mode="inline" theme="dark" >
                <Menu.Item key="1">
                    <Link to="/company"><Icon type="pie-chart" /><span>公司管理</span></Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/test"><Icon type="desktop" /><span>test导航</span></Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="inbox" /><span>角色管理</span>
                </Menu.Item>
            </Menu>
        </div>
    );
  }
}
