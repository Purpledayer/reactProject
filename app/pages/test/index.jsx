/*
 * @Author(作者) : Avalon 
 * @Create Time(创建时间): 2017-7-24
 * @Last Modified by(最后修改者): Avalon 
 * @Last Modified time(最后修改事件): 2017-7-25
 */

import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Table, Button, Icon,Pagination, notification, message ,Tooltip ,Modal} from 'antd';

/**组件引用 */
import { findIndexByKey } from './../../components/util/util';
import TableList from './../../components/tableList/tabList';
import Operating from './operating';


 //button的额外属性
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;



/**mock数据引用 */
import getSqlData from './../../mock/role/mockdate/sqlData';
import sqlData from './../../mock/role/sqlConfig';
export default class Test extends Component {
	 constructor() {
		super();
		this.state = {
			lists: [],
			// 默认 table 头为空
			columns: [{title: '',key: 'initial',}],
			loading: false,
			showFormModal: false,
            confirmLoading: false,
            formModalTitle: '新增',
			formModalType: 'add', // add, edit, editMul
            formConfigs: [],
            newsFormConfigs:myconfigtable,
            formValues: {},
            datalength:0,//总条数
            selectedRowKeys: [],
			addNum: 0,
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
				item.key = item.id;
			return item;
			}))
		
		))
	)
	// 按需渲染表数据
	renderLists(tableName) {
		tableName = 'role';
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
		this.getLists(tableName).then((lists) => {
			this.setState({
				lists,
				loading: false,
			}, hideMsg);
		}).catch(() => {
			this.setState({
				lists: [],
				loading: false,
			}, hideMsg);
		});
	}
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
	}
	/***更新数据*/
	UpdateData =(data)=>{
		console.log('更新数据');
		console.log(data);
		this.setState({
			lists:data
		})
	}
    render(){
        const { selectedRowKeys,formModalTitle ,columns,lists,loading,showFormModal,confirmLoading,newsFormConfigs,formValues,datalength} = this.state;
        const selectedLen = selectedRowKeys.length;
		const rowSelection = {selectedRowKeys,onChange: this.onSelectChange,};
        return(
            <div className="page content-box">
				<div className="title">用户1管理</div>
               
				<TableList 
				rowSelection={rowSelection} 
				columns={columns} 
				dataSource={lists} 
				pagination={true} 
				loading={loading}/>

				<Operating 
				UpdateData={this.UpdateData.bind(this)} 
				myconfigtable={newsFormConfigs} 
				selectedRowKeys={selectedRowKeys} 
				lists={this.state.lists}
				formValues={formValues}/> 
			</div>
        )
    }
}

Test.propTypes = {
	tableName: React.PropTypes.string,
  };
  
const myconfigtable = [
    {tableKey: 'user_code',name: '用户名',type: 'text',width: 80,validators: ['required',],},
	{tableKey: 'user_name',name: '用户姓名',type: 'text',width: 50,},
	{tableKey: 'nick_name',name: '机构名称',type: 'text',width: 50,validators: ['required',],},
];