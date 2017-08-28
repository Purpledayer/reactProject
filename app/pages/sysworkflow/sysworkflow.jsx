import React, { Component } from 'react';
import { Table, Button, Icon,Pagination, notification, message ,Tooltip ,Modal ,Tabs } from 'antd';
import FormModal from './../../components/modal/FormModal';
import { findIndexByKey } from './../../components/util/util';
 
import LeftTabsNav from './../../components/leftTabsNav/index';
import Operating from './operating';
import TableList from './../../components/tableList/tabList';
//button的额外属性
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
export default class Sysworkflow extends Component{
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
	
	
  // 处理 <FormModal /> 中不同类型的表单事件
	formOnChange = {
		inputOnChange: (event, key) => {
		const formValues = { ...this.state.formValues };
		formValues[key] = event.target.value.trim();
		this.setState({ formValues });
		},
	}
	//增加数据
	addRows = () => {
		this.setState({showFormModal: true,formModalTitle: '新增',formModalType: 'add',});
    }
    //删除
    delConfirm = () => {
        const selectedRowKeys = this.state.selectedRowKeys;
        confirm({
        title: '确定删除这些数据吗',
        content: `被选中行的ID：【${selectedRowKeys.join(', ')}】`,
        onOk: () => {
            this.setState({ loading: true });
            const hideMsg = message.loading('删除中...', 0);

            const lists = [...this.state.lists];
            // 根据已选择的 key 筛选 lists 中的索引并删除
            selectedRowKeys.forEach((val) => {
            lists.splice(findIndexByKey('key', val, lists), 1);
            });

            // 模拟 ajax
            setTimeout(() => {
            this.setState({
                loading: false,
                lists,
                selectedRowKeys: [],
            }, () => {
                hideMsg();
                notification.success({
                message: '成功',
                description: '删除数据成功',
                });
            });
            }, 1000);
        },
        });
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
            <div className="page content-box displayFlex Role" >
				<LeftTabsNav ></LeftTabsNav>
				<div style={{width: '100%'}}>
					<div className="title">导入配置</div>
					<TableList rowSelection={rowSelection} columns={this.state.columns} dataSource={this.state.lists} pagination={true} loading={loading}/>
					<Operating  UpdateData={this.UpdateData.bind(this)} myconfigtable={this.state.newsFormConfigs} selectedRowKeys={selectedRowKeys} lists={this.state.lists}></Operating>
				</div>
			</div>
        )
    }
}

Sysworkflow.propTypes = {
  tableName: React.PropTypes.string,
};

function callback(key) {
  console.log(key);
}

const myconfigtable = [
    {tableKey: 'user_code',name: '用户名',type: 'text',width: 80,validators: ['required',],},
    {tableKey: 'user_name',name: '用户姓名',type: 'text',width: 50,},
    {tableKey: 'nick_name',name: '机构名称',type: 'text',width: 50,validators: ['required',],},
]