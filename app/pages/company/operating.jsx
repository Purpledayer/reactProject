import React, { Component } from 'react';
import {Icon ,Input, Button ,Tooltip, Modal ,Pagination} from 'antd';
import Addmodal from './modal';



import ModalAdd from './../../components/operating/modalAdd';
import ModalEdit from './../../components/operating/modalEdit';
import ModaleDel from './../../components/operating/modalDel';
const confirm = Modal.confirm;
function showConfirm() {
  confirm({
    title: '删除',
    content: '是否确定删除？',
    onOk() {
      console.log('确定');
    },
    onCancel() {
      console.log('取消');
    },
  });
}
export default class FooterOperating extends Component{
  	constructor() {
		super();
		this.state = {
            formValues: {},//获取modal弹窗里input的输入值
            formModalTitle: '新增',
            addNum: 0,
            confirmLoading:false,
            showFormModal:false,
        }
    }
      //删除
    DelDataSubmit= () => {
        const selectedRowKeys = [...this.props.selectedRowKeys];
        this.setState({ loading: true });
        const hideMsg = message.loading('删除中...', 0);
        const lists = [...this.props.lists];
        // 根据已选择的 key 筛选 lists 中的索引并删除
        selectedRowKeys.forEach((val) => {
            lists.splice(findIndexByKey('key', val, lists), 1);
        });
        // 模拟 ajax
        setTimeout(() => {
            this.setState({loading: false,lists,selectedRowKeys: [],}, () => {
                hideMsg();
                notification.success({
                message: '成功',
                description: '删除数据成功',
                });
            });
        }, 1000);
        this.props.UpdateData(lists);
    }
	submitFormModal = (formModalType,formValues) => {
        this.setState({ confirmLoading: true });
		const hideMsg = message.loading('提交中...', 0);
		const lists = [...this.props.lists];
        const type =formModalType;
        const selectedRowKeys = [...this.props.selectedRowKeys];
        let addNum = this.state.addNum;
		if (type === 'add') {
            addNum = this.state.addNum + 1;
            formValues.id = formValues.id || (lists[lists.length - 1].id + addNum);
            formValues.key = formValues.id;
            lists.unshift(formValues);
        }else {
            selectedRowKeys.forEach((key) => {
                const index = findIndexByKey('key', key, lists);
                lists[index] = {...lists[index], ...formValues};
            });
        }
        setTimeout(() => {
	 	    this.setState({confirmLoading: false,showFormModal: false,}, () => {
				hideMsg();
				notification.success({
				message: '成功',
				description: `${type === 'add' ? '新增' : '修改'}数据完成`,
				});
			});
		}, 2000);
		this.props.UpdateData(lists);
	}
    render(){
        return(
          <div className='displayFlex operating'>
                <ModalAdd
                confirmLoading={this.state.confirmLoading} 
                newsFormConfigs={this.props.myconfigtable} 
                submitFormModal={this.submitFormModal}></ModalAdd>
                <ModalEdit 
                confirmLoading={this.state.confirmLoading} 
                selectedRowKeys={this.props.selectedRowKeys} 
                lists={this.props.lists} 
                newsFormConfigs={this.props.myconfigtable} 
                submitFormModal={this.submitFormModal}></ModalEdit> 
                <ModaleDel 
                confirmLoading={this.state.confirmLoading} 
                selectedRowKeys={this.props.selectedRowKeys} 
                DelDataSubmit = { this.DelDataSubmit }></ModaleDel> 
                <Pagination showQuickJumper showSizeChanger showTotal={total => `共 ${total} 条`} onChange={this.onChange}  defaultCurrent={1} total={this.props.lists.length} />
            </div>
        )
    }
} 