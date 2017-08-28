import React, { Component } from 'react';
import {Pagination ,message ,notification} from 'antd';



import ModalAdd from './../../components/operating/modalAdd';
import ModalEdit from './../../components/operating/modalEdit';
import ModaleDel from './../../components/operating/modalDel';

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
        }
    }
    PrivateAddRows = () => {
        this.setState({showFormModal: true,formModalTitle: '新增',});
    }
    PrivateEdit =(isSingle) =>{
        this.setState({
            showFormModal: true,
            formModalTitle: isSingle ? '修改' : '批量修改',
        });
    }
      //删除
    DelDataSubmit= () => {
        const selectedRowKeys = [...this.props.selectedRowKeys];
        this.setState({ loading: true });
        const hideMsg = message.loading('删除中...', 0);
        const lists = [...this.props.lists];
        // 根据已选择的 key 筛选 lists 中的索引并删除
        selectedRowKeys.forEach((val) => {
            lists.splice(findIndexByKey('key', val, lists), 1);
        });
        // 模拟 ajax
        setTimeout(() => {
            this.setState({loading: false,lists,selectedRowKeys: [],}, () => {
                hideMsg();
                notification.success({
                message: '成功',
                description: '删除数据成功',
                });
            });
        }, 1000);
        this.props.UpdateData(lists);
    }
	submitFormModal = (formModalType,formValues) => {
        this.setState({ confirmLoading: true });
		const hideMsg = message.loading('提交中...', 0);
		const lists = [...this.props.lists];
        const type =formModalType;
        console.log(formModalType);
        const selectedRowKeys = [...this.props.selectedRowKeys];
        let addNum = this.state.addNum;
		if (type === 'add') {
            addNum = this.state.addNum + 1;
            console.log(formValues);
            return false;
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
				notification.success({
				message: '成功',
				description: `${type === 'add' ? '新增' : '修改'}数据完成`,
				});
			});
		}, 2000);
		this.props.UpdateData(lists);
    }
    /**点击遮罩层关闭 */
    handleCancel = (e) => {
        this.setState({showFormModal: false,});
    }
    render(){
        const {confirmLoading, showFormModal,formModalTitle} =this.state;
        return(
            <div className='displayFlex operating'>
                <ModalAdd 
                confirmLoading={confirmLoading} 
                PrivateAddRows={this.PrivateAddRows} 
                showFormModal={showFormModal} 
                formModalTitle={formModalTitle}
                newsFormConfigs={this.props.myconfigtable}
                submitFormModal={this.submitFormModal}
                onCancel={this.handleCancel}></ModalAdd>

                <ModalEdit 
                confirmLoading={confirmLoading} 
                PrivateEdit= {this.PrivateEdit}
                showFormModal={showFormModal} 
                formModalTitle={formModalTitle}
                selectedRowKeys={this.props.selectedRowKeys} 
                lists={this.props.lists} 
                newsFormConfigs={this.props.myconfigtable} 
                submitFormModal={this.submitFormModal}
                onCancel={this.handleCancel}></ModalEdit> 

                <ModaleDel 
                confirmLoading={confirmLoading} 
                selectedRowKeys={this.props.selectedRowKeys} 
                DelDataSubmit = { this.DelDataSubmit }
                onCancel={this.handleCancel}></ModaleDel>

                <Pagination showQuickJumper showSizeChanger 
                showTotal={total => `共 ${total} 条`} 
                onChange={this.onChange}  defaultCurrent={1} 
                total={this.props.lists.length}/>
            </div>
        )
    }
}