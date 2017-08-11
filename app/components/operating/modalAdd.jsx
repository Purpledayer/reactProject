import React,{ Component } from 'react';
import { Button , Icon , Modal , message } from 'antd';
import { findIndexByKey } from './../../components/util/util';
import FormModal from './../modal/FormModal'
const confirm = Modal.confirm;
export default class ModalAdd extends Component{
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
	//增加数据
	addRows = () => {
		this.setState({showFormModal: true,formModalTitle: '新增',formModalType: 'add',});
	}
	componentDidMount(){
		console.info('this.pore',this.props);
		//  this.setState({ selectedLen : this.props.selectedLen.length });
	}
	render(){
		const {formModalTitle ,newsFormConfigs ,showFormModal, confirmLoading, formValues } = this.state;
		return(
			<div>
				<Button type="primary" onClick={this.addRows}><Icon type="plus-circle-o" />新增</Button>
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