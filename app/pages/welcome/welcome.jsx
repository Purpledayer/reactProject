/*
 * @Author(作者) : Avalon 
 * @Create Time(创建时间): 2017-7-24
 * @Last Modified by(最后修改者): Avalon 
 * @Last Modified time(最后修改事件): 2017-7-25
 */

import React, { Component } from 'react';
import { Menu,Table ,Icon ,Card, Col, Row , Select} from 'antd';

import ReactHighcharts from 'react-highcharts';
import Tablelist from './table';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class welcome extends Component {
	constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            hasMore: false,
            isLoadingMore: false,
            page: 0
        }
    }
	static displayName = 'PieDemo';
    handleClick = (e) => {
    	console.log('click ', e);
  	}
  	render() {
	    return (
			<div>
				<Menu onClick={this.handleClick} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" className="borderRadius border-bottom">
					<SubMenu key="sub1" title={<span><Icon type="bell" /><span>待办事项</span></span>}>
						<Tablelist></Tablelist>
					</SubMenu>
				</Menu>
				<div className="mar-spacing-top">
					<div className="halfwidth display-line border  mar-spacing-right borderRadius vertical-align statistics" style={{background:'#fff',}}>
						<div className="welcome-title-header">
							<h5><Icon type="setting" />统计指标</h5>
						</div>
						<Row gutter={16} className="pad-spacing statistics-First">
							<Col span={8}>
								<Card noHovering={true}>
									<div><Icon type="file-text" /></div>
									<div>
										<ul>
											<li>32</li>
											<li>处理工单</li>
										</ul>
									</div>	
								</Card>
							</Col>
							<Col span={8}>
								<Card noHovering={true}>
									<div><Icon type="file-text" /></div>
									<div>
										<ul>
											<li>32</li>
											<li>发现缺陷</li>
										</ul>
									</div>
								</Card>
							</Col>
							<Col span={8}>
								<Card noHovering={true}>
									<div><Icon type="file-text" /></div>
									<div>
										<ul>
											<li>32</li>
											<li>案例编写</li>
										</ul>
									</div>
								</Card>
							</Col> 
						</Row>
						<Row gutter={16} className="pad-spacing statistics-Second">
							<Col span={8}>
								<Card noHovering={true}>
									<div><Icon type="file-text" /></div>
									<div>
										<ul>
											<li>32</li>
											<li>案例执行</li>
										</ul>
									</div>
								</Card>
							</Col>
							<Col span={8}>
								<Card noHovering={true}>
									<div><Icon type="file-text" /></div>
									<div>
										<ul>
											<li>32</li>
											<li>本周空闲</li>
										</ul>
									</div>
								</Card>
							</Col>
							<Col span={8}>
								<Card noHovering={true}>
									<div><Icon type="file-text" /></div>
									<div>
										<ul>
											<li>32</li>
											<li>月绩效</li>
										</ul>
									</div>
								</Card>
							</Col> 
						</Row>
						<Row gutter={16} className="pad-spacing statistics-Third">
							<Col span={8}>
								<Card noHovering={true}>
									<div><Icon type="file-text" /></div>
									<div>
										<ul>
											<li>任务处理</li>
											<li>已完成</li>
										</ul>
									</div>
								</Card>
							</Col>
							<Col span={8}>
								<Card noHovering={true}>
									<div><Icon type="file-text" /></div>
									<div>
										<ul>
											<li>协同处理</li>
											<li>32</li>
										</ul>
									</div>
								</Card>
							</Col>
							<Col span={8}>
								<Card noHovering={true}>
									<div><Icon type="file-text" /></div>
									<div>
										<ul>
											<li>附件下载</li>
											<li>32</li>
										</ul>
									</div>
								</Card>
							</Col> 
						</Row>
					</div>
					<div className="halfwidth display-line border borderRadius vertical-align" style={{background:'#fff',}}>
						<div className="welcome-title-header clearfix">
							<h5><Icon type="pie-chart" />项目组订单金额</h5>
							<Select defaultValue="本年" style={{ width: 120 }} onChange={handleChange}>
								<Option value="year ">本年</Option>
								<Option value="month">本月</Option>
								<Option value="week">本周</Option>
							</Select>
						</div>
						<div className="highchart-box"><ReactHighcharts config={config} ref="chart" /></div>
					</div>
				</div>
			</div>
		);

  	}	
}


const data1 = [
  { name: 'iphone4', value: 120, fill: '#ff7300' },
  { name: 'iphone4s', value: 500, fill: '#e5671a' },
  { name: 'iphone5', value: 600, fill: '#907213' }
];
function handleChange(value) {
  console.log(`selected ${value}`);
}
const config={	
	chart: {//绘图区样式设置
		height:266,
	},
	title:{text:null,floating:true,},
	credits: {enabled: false},
	plotOptions: {
		pie: {
			allowPointSelect: true,
			cursor: true,
			showInLegend: true,
			dataLabels: {
				enabled: false
			}
		},
		series: {//饼状图位置
			animation: true,
			center: [250, 100],
			size:230,
		}
	},
	legend: {//图例设置
			floating: true,
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			// y: 54
		},
	series: [{//数据类型设置
		type: 'pie',
		name: 'SLICE',
		data: [
			['Safari',    8.5],
			['Opera',     6.2],
			['Others',   0.7]
		]
	}]
};