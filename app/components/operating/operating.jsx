import React,{ Component } from 'react';
import { Button , Icon , Modal , message } from 'antd';
import { findIndexByKey } from './../../components/util/util';
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
export default class Operating extends Component{
	constructor() {
		super();
		this.state = { };
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
		return(
			<div style={{ margin: '10px 0' ,position:'fixed',bottom:'2rem' , right:'13.5rem' , zIndex: '1'}}>
				<ButtonGroup size="small">
					<Button type="primary" onClick={this.addRows}><Icon type="plus-circle-o" />新增</Button>
				</ButtonGroup>
			</div>
		)
	}
}