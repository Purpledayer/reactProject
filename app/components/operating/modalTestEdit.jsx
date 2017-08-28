import React,{ Component } from 'react';
import { Button , Icon } from 'antd';
import { findIndexByKey } from './../../components/util/util';
import FormModal from './../modal/FormModal'
export default class ModalTestEdit extends Component{
	 constructor() {
		super();
		this.state = {
			formValues: {},
		};
	 }
	editRows = () => {
        const selectedRowKeys = [...this.props.selectedRowKeys];
        const lists = [...this.props.lists];
        const currentRows = lists[findIndexByKey('key', selectedRowKeys[0], lists)];
		const isSingle = selectedRowKeys.length === 1;
		this.props.PrivateEdit(isSingle,currentRows);
    }
	render(){
		const {formValues} = this.state;
		const selectedLen = this.props.selectedRowKeys.length;
		return(
			<div>
                <Button className="mar-spacing-right" type="primary" disabled={selectedLen < 1} onClick={this.editRows}><Icon type="edit" />{selectedLen > 1 ? '批量修改' : '修改'}</Button>
			</div>			
		)
	}
}
 