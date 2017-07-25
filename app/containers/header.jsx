import React ,{Component} from 'react';
import { Menu, Icon, Dropdown } from 'antd';
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a target="_blank" rel="noopener noreferrer" >用户信息</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a target="_blank" rel="noopener noreferrer" >用户信息</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">注销</Menu.Item>
  </Menu>
);
export default class MyHeader extends Component{
    render() {  
        return (
             <Dropdown overlay={menu}>
                <span className="ant-dropdown-link operating" href="#">
                    用户名<Icon type="down" />
                </span>
            </Dropdown>
        );
    }
}



 