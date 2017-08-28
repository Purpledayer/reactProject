import React,{ Component } from 'react';
import { Button , Icon } from 'antd';
import { findIndexByKey } from './../../components/util/util';
export default class ModalTest extends Component{
	constructor() {
		super();
		this.state = {
			formValues: {},
		};
	 }
	//增加数据
	addRows = () => {
		this.props.PrivateAddRows(this.state.formValues);
	}
	render(){
		const {formValues} = this.state;
		return(
			<div>
				<Button className="mar-spacing-right" type="primary" onClick={this.addRows}><Icon type="plus-circle-o" />新增</Button>
			</div>			
		)
	}
}
 