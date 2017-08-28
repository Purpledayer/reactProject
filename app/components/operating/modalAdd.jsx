import React,{ Component } from 'react';
import { Button , Icon } from 'antd';
import { findIndexByKey } from './../../components/util/util';
import FormModal from './../modal/FormModal'
export default class ModalAdd extends Component{
	constructor() {
		super();
		this.state = {
			formValues: {},
			formModalType:'add',
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
	//增加数据
	addRows = () => {
		this.setState({
			formValues:{}
		})
		this.props.PrivateAddRows();
	}
	submitFormModal = () => {
		this.props.submitFormModal(this.state.formValues);
	}
	componentDidMount(){
		// console.info('this.pore',this.props);
		//  this.setState({ selectedLen : this.props.selectedLen.length });
	}
	handleCancel = (e) => {
		this.setState({formValues: {},});
		return false;
		this.props.onCancel();
    }
	render(){
		const {formValues} = this.state;
		const {formModalTitle, newsFormConfigs ,showFormModal, submitFormModal,confirmLoading,onCancel} = this.props;
		return(
			<div>
				<Button className="mar-spacing-right" type="primary" onClick={this.addRows}><Icon type="plus-circle-o" />新增</Button>
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
 