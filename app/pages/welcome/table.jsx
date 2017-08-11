import React, { Component } from 'react';
import { Table ,Icon ,Pagination } from 'antd';
import {selecthomewosdata} from './../../fetch/welcome/wlecome';
 
export default class Tablelist extends  Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            pagination:{},
            hasMore: false,
            isLoadingMore: false,
            page: 0
        }
    }
    ceshifenye = (pageNumber) => {
        console.log('Page: ', pageNumber);
    }
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={this.state.data} size="small" className="welcome-table" pagination={false} bordered />
                <Pagination showQuickJumper defaultPageSize={5} defaultCurrent={this.state.pagination.page} total={this.state.pagination.rows} onChange={this.ceshifenye} className="mar-spacing-right textAlign-right"/>
            </div>
        )
    }
    componentDidMount(){
        // 获取首页数据
        const result = selecthomewosdata(1,1000, 'asd','asad','asda')
        result.then(res => {
            return res.json()
        }).then(json => {
            const data = json.root;
            const pagination = json;
            this.setState({
                // 注意，这里讲最新获取的数据，拼接到原数据之后，使用 concat 函数
                data: this.state.data.concat(data),
                pagination:pagination,
            })
        }) 
    }
}
 

const columns = [ 
  	{ title: '', dataIndex: ' ', key: ' ', render: text => <Icon type="hourglass" />, }, 
  	{ title: '类型名称', dataIndex: 'todo_type', key: 'name', }, 
  	{ title: '待办事项', dataIndex: 'todo_name', key: '2', }, 
	{ title: '期望处理时间',dataIndex: 'hope_deal_date', key: '3', }, 
	{ title: '责任人',dataIndex: 'liable_user', key: '4', }, 
	{ title: '发起人',dataIndex: 'sponsor_user', key: '5', }, 
	{ title: '发起日期',dataIndex: 'sponsor_date', key: '6', }, 
	{ title: '备注',dataIndex: 'remark', key: '7', }, 
];
