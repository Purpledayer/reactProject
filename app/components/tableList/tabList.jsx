import React , { Component } from 'react';
import { Table, Button, Icon,Pagination, notification, message ,Tooltip ,Modal} from 'antd';
export default class TableList extends Component{
    onChange = (page) => {
        console.log(page);
    }
    render(){
        return(
            <div>
                <Table className="standard-table" scroll={{ y: "30.6rem",}} rowSelection={this.props.rowSelection} columns={this.props.columns} dataSource={this.props.dataSource} size="middle" pagination={false}/>
            </div>
        )
    }
}
