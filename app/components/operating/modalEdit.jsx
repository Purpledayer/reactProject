import React,{ Component } from 'react';
import { Button , Icon , Modal , message } from 'antd';
import { findIndexByKey } from './../../components/util/util';
import FormModal from './../modal/FormModal'
const confirm = Modal.confirm;
export default class ModalEdit extends Component{
	 constructor() {
		super();
		this.state = {
			confirmLoading: false,
			formModalTitle: '新增',
			newsFormConfigs:myconfigtable,
			formValues: {},
			showFormModal: false,
		};
	 }
	cancelFormModal = () => {
		this.setState({
		showFormModal: false,
		formValues: {},
		});
	}
	 // 处理 <FormModal /> 中不同类型的表单事件
	formOnChange = {
		inputOnChange: (event, key) => {
		const formValues = { ...this.state.formValues };
		formValues[key] = event.target.value.trim();
		this.setState({ formValues });
		},
	}
	editRows = () => {
        const selectedRowKeys = [...this.props.selectedRowKeys];
        const lists = [...this.props.lists];
        const currentRows = lists[findIndexByKey('key', selectedRowKeys[0], lists)];
        const isSingle = selectedRowKeys.length === 1;
        this.setState({
            showFormModal: true,
            formModalTitle: isSingle ? '修改' : '批量修改',
            formModalType: isSingle ? 'edit' : 'editMul',
            formValues: isSingle ? currentRows : {},
        });
    }
	render(){
        const {formModalTitle ,newsFormConfigs ,showFormModal, confirmLoading, formValues } = this.state;
        const selectedLen = this.props.selectedRowKeys.length;
		return(
			<div>
                <Button type="primary" disabled={selectedLen < 1} onClick={this.editRows}><Icon type="edit" />{selectedLen > 1 ? '批量修改' : '修改'}</Button>
				<FormModal 
				formModalTitle={formModalTitle} 
				newsFormConfigs={newsFormConfigs}
				formValues={formValues} 
				showFormModal={showFormModal} 
				submitFormModal={this.props.submitFormModal} 
				cancelFormModal={this.cancelFormModal} 
				confirmLoading={confirmLoading} 
				onChange={this.formOnChange} />	
			</div>			
		)
	}
}

const myconfigtable = [
    {tableKey: 'user_code',name: '字典编码',type: 'text',width: 80,validators: ['required',],},
    {tableKey: 'user_name',name: '字典名称',type: 'text',width: 50,},
]