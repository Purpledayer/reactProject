import React ,{Component} from 'react';
import {Avatar , Menu, Icon, Badge , Dropdown } from 'antd';
const menu = (
  <Menu>
    <Menu.Item key="0">
      <a target="_blank" rel="noopener noreferrer" >Avalon</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">注销</Menu.Item>
  </Menu>
);
export default class MyHeader extends Component{
    render() {  
        return (
            <ul>
                <li>
                    <span>
                        <Badge count={2}><Avatar shape="square" icon="bars" size="small" /></Badge>
                    </span>
                </li>
                <li> 
                    <span>
                        <Badge count={2}><Avatar shape="square" icon="bell" size="small" /></Badge>
                    </span>
                </li>
                <li>
                    <span>
                        <Badge count={2}><Avatar shape="square" icon="mail" size="small" /></Badge>
                    </span>
                </li>
                <li>
                    <Dropdown overlay={menu}>
                        <span className="ant-dropdown-link" href="#">
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            Avalon<Icon type="down" />
                        </span>
                    </Dropdown>
                </li>
                <li>
                    <Dropdown overlay={menu}>
                        <span className="ant-dropdown-link" href="#">
                             <Icon type="setting" />个性化
                        </span>
                    </Dropdown>
                </li>
            </ul>
            
        );
    }
}



 