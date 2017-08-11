import React,{ Component } from 'react';
import { Button , Icon , Modal , message } from 'antd';
const confirm = Modal.confirm;
export default class ModalDel extends Component{
      //删除
    delConfirm = () => {
		const selectedRowKeys = this.props.selectedRowKeys;
		console.log(this.props);
        confirm({
			title: '确定删除这些数据吗',
			content: `被选中行的ID：【${selectedRowKeys.join(', ')}】`,
			onOk: () => {
				this.props.DelDataSubmit(event); 
				 
				// this.setState({ loading: true });
				// const hideMsg = message.loading('删除中...', 0);

				// const lists = [...this.state.lists];
				// // 根据已选择的 key 筛选 lists 中的索引并删除
				// selectedRowKeys.forEach((val) => {
				// lists.splice(findIndexByKey('key', val, lists), 1);
				// });

				// // 模拟 ajax
				// setTimeout(() => {
				// 	this.setState({
				// 		loading: false,
				// 		lists,
				// 		selectedRowKeys: [],
				// 	}, () => {
				// 		hideMsg();
				// 		notification.success({
				// 		message: '成功',
				// 		description: '删除数据成功',
				// 		});
				// 	});
				// }, 1000);
			},
        });
	}
    render(){
        const selectedLen = this.props.selectedRowKeys.length;
        return(
            <Button type="primary" disabled={selectedLen < 1} onClick={this.delConfirm}><Icon type="delete" />{selectedLen > 1 ? '批量删除' : '删除'}</Button>
        )
    }
}