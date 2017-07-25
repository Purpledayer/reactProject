
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import MyHeader from './header';
import LeftNav from './leftNav';
import 'antd/dist/antd.less';
import './../style/base.less';
const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
export default class Containers extends Component {
    state = {collapsed: false,};
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }
    render() {
        const {children } = this.props
        return (
        <Layout id="react-box">
            <Sider collapsible collapsed={this.state.collapsed}  onCollapse={this.onCollapse}>
                <LeftNav/>
            </Sider>
            <Layout>
                 <Header className= "MyHeader" style={{ background: '#fff', padding: 0 }} >
                    <MyHeader/>
                 </Header>
                <Content style={{ margin: '0 16px' }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
        )
    }
}
