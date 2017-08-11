import React, { Component } from 'react';
import { Tabs } from 'antd';
function callback(key) {
  console.log(key);
}
const TabPane = Tabs.TabPane;
export default class TabList extends Component {
    render(){
        return(
             <Tabs onChange={callback} type="card">
                <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
        )
    }
}