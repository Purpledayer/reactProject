import React, { Component } from 'react';
import { message } from 'antd';

import getSqlData from './sqlData';
import sqlData from './sqlConfig';

/**引用组件 */
import TableList from './../../components/tableList/tabList';
import { findIndexByKey } from './../../components/util/util';
import Operating from './operating';
/**引用接口 */
import { queryPage }from './../../fetch/bmuser/bmuser' 
export default class Bmuser extends Component{
	constructor() {
		super();
		this.state = {
			lists: [],
			// 默认 table 头为空
			columns: [{title: '',key: 'initial',}],
			loading: false,
			formConfigs: [],
			newsFormConfigs:myconfigtable,
			selectedRowKeys: [],
		};
	}
	componentDidMount() {
		this.renderLists(this.props.tableName);
	}
	componentWillReceiveProps({ tableName }) {
		if (this.props.tableName === tableName) return;
		this.renderLists(tableName);
	}
	// 获取表数据
	getLists = tableName => (
		getSqlData[`getTable${tableName}`]().then(data => (
			Promise.resolve(data.map((item) => {
                this.setState({ datalength:data.length });
				item.key = item.id;
			return item;
            }))
        
		))
	)
	// 按需渲染表数据
	renderLists(tableName) {
        tableName = 'Users';
		const conf = sqlData[findIndexByKey('tableName', tableName, sqlData)];
        // 初始化 table 的 header 配置
		//配置匹配
		const columns = conf.headers.map(header => ({
			title: header.name,
			dataIndex: header.tableKey,
			width: header.width,
		}));
		//改变加载状态显示表格
		this.setState({
			columns,
			loading: true,
			formConfigs: conf.headers,
		});
		const hideMsg = message.loading('正在查询...', 0);
		//数据匹配
		const result = queryPage(false,1503890593824,20,1,'reg_date','asc');
		result.then(res => {
            return res.json()
        }).then(json => {
            const data = json.root;
			const pagination = json;
            this.setState({
                //这里讲最新获取的数据 
                lists: data,
                pagination:pagination,
            }, hideMsg)
		}) 
		
		// this.getLists(tableName).then((lists) => {
		// 	console.log(lists);
		// 	this.setState({
		// 		lists,
		// 		loading: false,
		// 	}, hideMsg);
		// }).catch(() => {
		// 	this.setState({
		// 		lists: [],
		// 		loading: false,
		// 	}, hideMsg);
		// });
	}
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
	}
	/***更新数据*/
	UpdateData =(data)=>{
		this.setState({
			lists:data
		})
	}
    render(){
		const { lists, columns, loading, newsFormConfigs , selectedRowKeys } = this.state;
        const selectedLen = selectedRowKeys.length;
		const rowSelection = {selectedRowKeys,onChange: this.onSelectChange,};
        return(
            <div className="page content-box">
				<div className="title">用户管理</div>
				<TableList rowSelection={rowSelection} columns={columns} dataSource={lists} pagination={true} loading={loading}/>
				<Operating 
				UpdateData={this.UpdateData.bind(this)} 
				myconfigtable={newsFormConfigs} 
				selectedRowKeys={selectedRowKeys} 
				lists={this.state.lists}/>
			</div>
        )
    }
}

Bmuser.propTypes = {
  tableName: React.PropTypes.string,
};
 
const myconfigtable = [
    {tableKey: 'user_code',name: '用户名',type: 'text',width: 80,validators: ['required',],},
    {tableKey: 'user_name',name: '用户姓名',type: 'text',width: 50,},
    {tableKey: 'nick_name',name: '用户昵称',type: 'text',width: 50,validators: ['required',],},
    {tableKey: 'id_number',name: '身份证号',type: 'text',width: 70,validators: ['required',],},
    {tableKey: 'mobile_tel;',name: '手机号码',type: 'text',width: 50,validators: ['required',],},
    {tableKey: 'e_mail',name: '邮件地址',type: 'text',width: 50,validators: ['required',],},
    {tableKey: 'remark',name: '备注',type: 'text',width: 50,validators: ['required',],},
];