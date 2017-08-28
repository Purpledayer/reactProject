import React,{ Component } from 'react';
import { Button , Icon , Modal , message ,notification  } from 'antd';
const confirm = Modal.confirm;
export default class ModalDel extends Component{
      //删除
    delConfirm = () => {
		const selectedRowKeys = this.props.selectedRowKeys;
        confirm({
			title: '确定删除这些数据吗',
			content: `被选中行的ID：【${selectedRowKeys.join(', ')}】`,
			onOk: () => {
				const lists = this.props.DelDataSubmit(event);
			},
        });
	}
    render(){
        const selectedLen = this.props.selectedRowKeys.length;
        return(
			<div>
            <Button className="mar-spacing-right" type="primary" disabled={selectedLen < 1} onClick={this.delConfirm}><Icon type="delete" />{selectedLen > 1 ? '批量删除' : '删除'}</Button>
			</div>
        )
    }
}