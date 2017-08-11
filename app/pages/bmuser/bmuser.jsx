import React, { Component } from 'react';
import { Table, Button, Icon,Pagination, notification, message ,Tooltip ,Modal} from 'antd';
import FormModal from './../../components/modal/FormModal';
import { findIndexByKey } from './../../components/util/util';
import getSqlData from './sqlData';
import sqlData from './sqlConfig';
//button的额外属性
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
export default class Bmuser extends Component{
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
    //修改
    editRows = () => {
        const selectedRowKeys = [...this.state.selectedRowKeys];
        const lists = [...this.state.lists];
        const currentRows = lists[findIndexByKey('key', selectedRowKeys[0], lists)];
        const isSingle = selectedRowKeys.length === 1;
        this.setState({
            showFormModal: true,
            formModalTitle: isSingle ? '修改' : '批量修改',
            formModalType: isSingle ? 'edit' : 'editMul',
            formValues: isSingle ? currentRows : {},
        });
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
    render(){
        const { selectedRowKeys,formModalTitle ,columns,lists,loading,showFormModal,confirmLoading,newsFormConfigs,formValues,datalength} = this.state;
        const selectedLen = selectedRowKeys.length;
        const rowSelection = {selectedRowKeys,onChange: this.onSelectChange,};
        return(
            <div className="page content-box">
				<div className="title">用户管理</div>
                <div style={{ margin: '10px 0' ,position:'fixed',bottom:'2rem' , left:'13.5rem' , zIndex: '1'}}>
					<ButtonGroup size="small">
						<Button type="primary" onClick={this.addRows}><Icon type="plus-circle-o" />新增</Button>
                        <Button type="primary" disabled={selectedLen < 1} onClick={this.editRows}><Icon type="edit" />{selectedLen > 1 ? '批量修改' : '修改'}</Button>
                        <Button type="primary" disabled={selectedLen < 1} onClick={this.delConfirm}><Icon type="delete" />{selectedLen > 1 ? '批量删除' : '删除'}</Button>
					</ButtonGroup>
				</div>
				<Table className="standard-table" scroll={{ y: "27.5rem",}} rowSelection={rowSelection} columns={columns} dataSource={lists} pagination={true} loading={loading}  pagination={{showQuickJumper: true, showSizeChanger: true, pageSizeOptions: ['10', '20', '40', '50'],showTotal(total) { return `共 ${total} 条`; },}} />
				<FormModal formModalTitle={formModalTitle} newsFormConfigs={newsFormConfigs} formValues={formValues} showFormModal={showFormModal} submitFormModal={this.submitFormModal} cancelFormModal={this.cancelFormModal} confirmLoading={confirmLoading} onChange={this.formOnChange} />	
                 {/* <div className="footer">   
                    <div className="operating">
                        <Tooltip placement="topLeft" title="添加注册" arrowPointAtCenter>
                            <a onClick={this.addRows}><Icon type="plus" /></a>
                        </Tooltip>
                        <Tooltip placement="topLeft" title="修改注册" arrowPointAtCenter>
                            <a><Icon type="edit" /></a>
                        </Tooltip>
                        <Tooltip placement="topLeft" title="删除注册" arrowPointAtCenter>
                            <a><Icon type="delete" /></a>
                        </Tooltip>
                        <Tooltip placement="topLeft" title="刷新" arrowPointAtCenter>
                                <a><Icon type="reload" /></a>
                        </Tooltip>  
                    </div>
                     <Pagination showSizeChanger  showQuickJumper defaultCurrent={1} total={this.state.datalength} className="mar-spacing-right" showTotal={showTotal} /> 
                </div> */}
			</div>
        )
    }
}

Bmuser.propTypes = {
  tableName: React.PropTypes.string,
};
// function showTotal(total) {
//   return `共 ${total} 条`;
// }

const myconfigtable = [
    {tableKey: 'user_code',name: '用户名',type: 'text',width: 80,validators: ['required',],},
    {tableKey: 'user_name',name: '用户姓名',type: 'text',width: 50,},
    {tableKey: 'nick_name',name: '用户昵称',type: 'text',width: 50,validators: ['required',],},
    {tableKey: 'id_number',name: '身份证号',type: 'text',width: 70,validators: ['required',],},
    {tableKey: 'mobile_tel;',name: '手机号码',type: 'text',width: 50,validators: ['required',],},
    {tableKey: 'e_mail',name: '邮件地址',type: 'text',width: 50,validators: ['required',],},
    {tableKey: 'remark',name: '备注',type: 'text',width: 50,validators: ['required',],},
];