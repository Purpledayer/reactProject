import React, { Component } from 'react';
import { Table, Button, Icon,Pagination, notification, message ,Tooltip ,Modal} from 'antd';
import FormModal from './../../components/modal/FormModal';
import { findIndexByKey } from './../../components/util/util';
 
import getSqlData from './mockdate/sqlData';
import sqlData from './sqlConfig';

import Operating from './operating'
//button的额外属性
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
export default class Dictsrc extends Component{
    constructor() {
		super();
		this.state = {
			lists: [],
			// 默认 table 头为空
			columns: [{
				title: '',
				key: 'initial',
			}],
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
	
	DelDataSubmit = (event) =>  {
		console.log(event);
	}
	submitFormModal = () => {
		this.setState({ confirmLoading: true });
		const hideMsg = message.loading('提交中...', 0);
		const formValues = { ...this.state.formValues };
		const lists = [...this.state.lists];
        const type = this.state.formModalType;
        const selectedRowKeys = [...this.state.selectedRowKeys];
		let addNum = this.state.addNum;
        addNum = this.state.addNum + 1;
        formValues.id = formValues.id || (lists[lists.length - 1].id + addNum);
        formValues.key = formValues.id;
        lists.unshift(formValues);
       
		// 模拟 ajax 添加
		setTimeout(() => {
			this.setState({lists,addNum,formValues: {},confirmLoading: false,showFormModal: false,}, () => {
				hideMsg();
				notification.success({
					message: '成功',
					description: `${type === 'add' ? '新增' : '修改'}数据完成`,
				});
			});
		}, 1000);
	}

	cancelFormModal = () => {
		this.setState({
		showFormModal: false,
		formValues: {},
		});
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
    render(){
        const { selectedRowKeys,formModalTitle ,columns,lists,loading,showFormModal,confirmLoading,newsFormConfigs,formValues,datalength} = this.state;
        const selectedLen = selectedRowKeys.length;
		const rowSelection = {selectedRowKeys,onChange: this.onSelectChange,};
        return(
            <div className="page content-box">
				<div className="title">代码生成</div>
				<Table className="standard-table" scroll={{ y: "27.5rem",}} rowSelection={rowSelection} columns={columns} dataSource={lists} pagination={false} loading={loading}/>
				<Operating myconfigtable={columns} selectedRowKeys={selectedRowKeys} lists={this.state.lists} />
			</div>
        )
    }
}

Dictsrc.propTypes = {
  tableName: React.PropTypes.string,
};

const myconfigtable = [
    {tableKey: 'user_code',name: '字典编码',type: 'text',width: 80,validators: ['required',],},
    {tableKey: 'user_name',name: '字典名称',type: 'text',width: 50,},
]