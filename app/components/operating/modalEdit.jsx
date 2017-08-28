import React,{ Component } from 'react';
import { Button , Icon } from 'antd';
import { findIndexByKey } from './../../components/util/util';
import FormModal from './../modal/FormModal'
export default class ModalEdit extends Component{
	 constructor() {
		super();
		this.state = {
			formValues: {},
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
            formValues: isSingle ? currentRows : {},
		});
		this.props.PrivateEdit(isSingle);
    }
	submitFormModal = (isSingle) => {
		this.props.submitFormModal(this.state.formValues);
		this.setState({formValues: {},});
	}
	handleCancel = (e) => {
		this.setState({formValues: {},});
		this.props.onCancel();
    }
	render(){
		const {formValues} = this.state;
		const {newsFormConfigs ,submitFormModal,confirmLoading,showFormModal ,formModalTitle,onCancel} = this.props;
		const selectedLen = this.props.selectedRowKeys.length;
		return(
			<div>
                <Button className="mar-spacing-right" type="primary" disabled={selectedLen < 1} onClick={this.editRows}><Icon type="edit" />{selectedLen > 1 ? '批量修改' : '修改'}</Button>
				<FormModal 
				formModalTitle={formModalTitle} 
				newsFormConfigs={newsFormConfigs}
				formValues={formValues} 
				showFormModal={showFormModal} 
				submitFormModal={this.submitFormModal} 
				cancelFormModal={this.cancelFormModal} 
				confirmLoading={confirmLoading} 
				onChange={this.formOnChange} 
				onCancel={this.handleCancel}/>	
			</div>			
		)
	}
}
 