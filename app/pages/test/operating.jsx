import React, { Component } from 'react';
import {Pagination ,message ,notification} from 'antd';


import ModalTest from './../../components/operating/modalTest';
import ModalTestEdit from './../../components/operating/modalTestEdit'
import FormModal from './../../components/modal/FormModal';
 

import {findIndexByKey} from './../../components/util/util'
export default class Operating extends Component{
    constructor() {
		super();
		this.state = {
            formValues: {},//获取modal弹窗里input的输入值
            formModalTitle: '新增',
            addNum: 0,
            confirmLoading:false,
            showFormModal:false,
            formModalType:'add',
        }
    }
    PrivateAddRows = (v) => {
        this.setState({showFormModal: true,formModalTitle: '新增',formValues:v,formModalType:'add'});
    }
    PrivateEdit =(isSingle,currentRows) =>{
        this.setState({
            showFormModal: true,
            formModalTitle: isSingle ? '修改' : '批量修改',
            formModalType:'edit',
            formValues: isSingle ? currentRows : {},
        });
    }
  
	submitFormModal = () => {
        this.setState({ confirmLoading: true });
		const hideMsg = message.loading('提交中...', 0);
		const lists = [...this.props.lists];
        const type =this.state.formModalType;
        const formValues = this.state.formValues;
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
		        this.props.UpdateData(lists);
				notification.success({
				message: '成功',
				description: `${type === 'add' ? '新增' : '修改'}数据完成`,
				});
			});
		}, 2000);
    }
    /**点击遮罩层关闭 */
    handleCancel = (e) => {
        this.setState({showFormModal: false,});
    }
     // 处理 <FormModal /> 中不同类型的表单事件
	formOnChange = {
		inputOnChange: (event, key) => {
        const formValues = { ...this.state.formValues };
        if(event.target === undefined){
            formValues[key] =event;
        }else{
            formValues[key] = event.target.value.trim();
        }
		this.setState({ formValues });
		},
	}
    render(){
        const {confirmLoading, showFormModal,formModalTitle} =this.state;
        return(
            <div className='displayFlex operating'>
                <ModalTest PrivateAddRows={this.PrivateAddRows}  /> 
                <ModalTestEdit PrivateEdit={this.PrivateEdit} selectedRowKeys={this.props.selectedRowKeys} lists={this.props.lists} />
                <FormModal newsFormConfig ={this.props.myconfigtable}
				formModalTitle={formModalTitle} 
				formValues={this.state.formValues} 
                newsFormConfigs={this.props.myconfigtable}
				showFormModal={showFormModal} 
				submitFormModal={this.submitFormModal} 
				cancelFormModal={this.cancelFormModal} 
				confirmLoading={confirmLoading} 
				onChange={this.formOnChange} 
				onCancel={this.handleCancel}/>	

                <Pagination showQuickJumper showSizeChanger 
                showTotal={total => `共 ${total} 条`} 
                onChange={this.onChange}  defaultCurrent={1} 
                total={this.props.lists.length}/>
            </div>
        )
    }
}