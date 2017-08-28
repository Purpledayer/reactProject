import React, { Component } from 'react';
import { Table, Button, Icon,Pagination, notification, message ,Tooltip ,Modal} from 'antd';
import FormModal from './../../components/modal/FormModal';
import { findIndexByKey } from './../../components/util/util';
import SearchTree from './../../components/searchTree/searchTree';

import Operating from './operating'
import getSqlData from './sqlData';
import sqlData from './sqlConfig';

/**引用组件 */
import TableList from './../../components/tableList/tabList';
import ModalAdd from './../../components/operating/modalAdd';
import ModalEdit from './../../components/operating/modalEdit';
import ModaleDel from './../../components/operating/modalDel';
//button的额外属性
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

 
export default class Dict extends Component {
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

	submitFormModal = () => {
		this.setState({ confirmLoading: true });
		const hideMsg = message.loading('提交中...', 0);
		const formValues = { ...this.state.formValues };
		const lists = [...this.state.lists];
        const type = this.state.formModalType;
        const selectedRowKeys = [...this.state.selectedRowKeys];
		let addNum = this.state.addNum;
		if (type === 'add') {
            addNum = this.state.addNum + 1;
            formValues.id = formValues.id || (lists[lists.length - 1].id + addNum);
            formValues.key = formValues.id;
            lists.unshift(formValues);
        } else {
            selectedRowKeys.forEach((key) => {
                const index = findIndexByKey('key', key, lists);
                lists[index] = {...lists[index], ...formValues};
            });
        }
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
		this.setState({
			lists:data
		})
	}
    render(){
        const { selectedRowKeys,formModalTitle ,columns,lists,loading,showFormModal,confirmLoading,newsFormConfigs,formValues,datalength} = this.state;
        const selectedLen = selectedRowKeys.length;
		const rowSelection = {selectedRowKeys,onChange: this.onSelectChange,};
        return(
            <div className="content-box displayFlex">
                <SearchTree></SearchTree>
                <div style={{width : '100%'}}>
					<TableList rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.lists} pagination={false} loading={loading}/> 
					<Operating  UpdateData={this.UpdateData.bind(this)} myconfigtable={this.state.newsFormConfigs} selectedRowKeys={selectedRowKeys} lists={this.state.lists}></Operating>
                </div>
            </div>
        )
    }
}

Dict.propTypes = {
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