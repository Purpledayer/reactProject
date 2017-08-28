import React, { Component } from 'react';
import { Menu, Icon ,Button } from 'antd';

export default class LeftTabsNav extends Component {
  	render() {
		return (
			<div className="leftTabsNav mar-spacing-right border borderRadius">
				<div className="ColumnTitle">
					<h4>角色管理</h4>
				</div>
				<Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
					<Menu.Item key="1"><Icon type="pie-chart" /><span>Option 1</span></Menu.Item>
					<Menu.Item key="2"><Icon type="desktop" /><span>Option 2</span></Menu.Item>
					<Menu.Item key="3"><Icon type="inbox" /><span>Option 3</span></Menu.Item>
				</Menu>
			</div>
		);
  	}
}
