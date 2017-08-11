import React, { Component } from 'react';
import {Icon ,Input, Button ,Tooltip, Modal } from 'antd';
import Addmodal from './modal'
const confirm = Modal.confirm;
function showConfirm() {
  confirm({
    title: '删除',
    content: '是否确定删除？',
    onOk() {
      console.log('确定');
    },
    onCancel() {
      console.log('取消');
    },
  });
}
export default class FooterOperating extends Component{
    state = { visible: false,mainModalKey:0, }
    showModal = () => {
        this.setState({
            visible: true,
            mainModalKey:this.state.mainModalKey+1
        });
    }
    handleOk = (e) => {console.log(e);this.setState({visible: false,});}
    handleCancel = (e) => {console.log(e);this.setState({visible: false,});}
    render(){
        return(
            <div className="operating">
                <Tooltip placement="topLeft" title="添加注册" arrowPointAtCenter>
                    <a><Icon type="plus"  onClick={this.showModal} /></a>
                </Tooltip>
                <Tooltip placement="topLeft" title="修改注册" arrowPointAtCenter>
                    <a><Icon type="edit" /></a>
                </Tooltip>
                <Tooltip placement="topLeft" title="删除注册" arrowPointAtCenter>
                    <a onClick={showConfirm}><Icon type="delete" /></a>
                </Tooltip>
                <Tooltip placement="topLeft" title="刷新" arrowPointAtCenter>
                        <a><Icon type="reload" /></a>
                </Tooltip>  
                 <Modal title="新增注册" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
                    <Addmodal handleOk={this.handleOk.bind(this)} />
                </Modal>
            </div>
           
        )
    }
} 