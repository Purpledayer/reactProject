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
                    <Link to="/Company"><Icon type="pie-chart" /><span>公司管理</span></Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/Role"><Icon type="desktop" /><span>角色管理</span></Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/Bmuser"><Icon type="desktop" /><span>用户管理</span></Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/test"><Icon type="desktop" /><span>数据字典</span></Link>
                </Menu.Item>
                 <Menu.Item key="5">
                    <Link to="/Dictsrc"><Icon type="desktop" /><span>字典元</span></Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Link to="/test"><Icon type="desktop" /><span>动态列表配置</span></Link>
                </Menu.Item>
                 <Menu.Item key="7">
                    <Link to="/test"><Icon type="desktop" /><span>动态表单配置</span></Link>
                </Menu.Item>
                <Menu.Item key="8">
                    <Link to="/test"><Icon type="desktop" /><span>代码生成</span></Link>
                </Menu.Item>
                <Menu.Item key="9">
                    <Link to="/test"><Icon type="desktop" /><span>导入配置</span></Link>
                </Menu.Item>
                <Menu.Item key="10">
                    <Link to="/test"><Icon type="desktop" /><span>表结构管理</span></Link>
                </Menu.Item>
            </Menu>
        </div>
    );
  }
}
