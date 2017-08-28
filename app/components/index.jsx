
import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import MyHeader from './header';
import LeftNav from './leftNav';
import TabList from './tabList'
import 'antd/dist/antd.less';
import './../style/base.less';
const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
export default class Containers extends Component {
    state = {collapsed: false,};
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    render() {
        const {location,children } = this.props
        return (
            <Layout id="react-box" className="position-fixed">
                <Sider collapsible collapsed={this.state.collapsed}  onCollapse={this.onCollapse}>
                    <LeftNav location={location}/>
                </Sider>
                <Layout>
                    <Header className= "MyHeader" style={{ padding: 0 }} >
                        <MyHeader/>
                    </Header>
                    <Content className="mar-spacing contont-box">
                        <TabList />
                        {children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
