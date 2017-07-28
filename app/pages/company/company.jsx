/*
 * @Author(作者) : Avalon 
 * @Create Time(创建时间): 2017-7-24
 * @Last Modified by(最后修改者): Avalon 
 * @Last Modified time(最后修改事件): 2017-7-25
 */

import React, { Component } from 'react';
import { Table, Icon ,Pagination ,Input, Button ,Tooltip, Modal ,Spin} from 'antd';
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
export default class Company extends Component {
     state = {
        filterDropdownVisible: false,
        data,
        searchText: '',
        filtered: false,
    };
    onInputChange = (e) => {
        this.setState({ searchText: e.target.value });
    }
    onSearch = () => {
        const { searchText } = this.state;
        const reg = new RegExp(searchText, 'gi');
        this.setState({
        filterDropdownVisible: false,
        filtered: !!searchText,
        data: data.map((record) => {
            const match = record.name.match(reg);
            if (!match) {
            return null;
            }
            return {
            ...record,
            name: (
                <span>
                {record.name.split(reg).map((text, i) => (
                    i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
                ))}
                </span>
            ),
            };
        }).filter(record => !!record),
        });
    }
    render() {
        const columns = [
            { title: 'asdasd', dataIndex: ' ', key: ' ', render: text => <Icon type="hourglass" />, width: 50, }, 
            {
                title: '类型名称',
                dataIndex: 'name',
                key: 'name',
                width: 150,
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                    <Input ref={ele => this.searchInput = ele} placeholder="Search name" value={this.state.searchText} onChange={this.onInputChange} onPressEnter={this.onSearch}/>
                    <Button type="primary" onClick={this.onSearch}>Search</Button>
                    </div>
                ),
                filterIcon: <Icon type="search" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
                filterDropdownVisible: this.state.filterDropdownVisible,
                onFilterDropdownVisibleChange: (visible) => {
                    this.setState({
                    filterDropdownVisible: visible,
                    }, () => this.searchInput.focus());
                },  
            }, 
            { title: '待办事项', dataIndex: 'age', key: 'age',width: 150,
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                    <Input ref={ele => this.searchInput = ele} placeholder="Search name" value={this.state.searchText} onChange={this.onInputChange} onPressEnter={this.onSearch}/>
                    <Button type="primary">Search</Button>
                    </div>
                ),
                filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            }, 
            { title: '期望处理时间',dataIndex: 'address', key: 'address', width: 150,}, 
            { title: '责任人',dataIndex: 'address1', key: 'address1', width: 150,}, 
            { title: '发起人',dataIndex: 'address2', key: 'address2', width: 150,}, 
            { title: '发起日期',dataIndex: 'address3', key: 'address3', width: 150,}, 
            { title: '备注',dataIndex: 'address4', key: 'address4',width: 150,}
        ];
        return (
			<div className="page content-box">
				<div className="title">公司管理</div>
                <Spin>
				    <Table columns={columns} dataSource={this.state.data} pagination={false} scroll={{ y: true }}/>		
                </Spin>
				<div className="footer">
                    <div className="operating">
                        <Tooltip placement="topLeft" title="添加注册" arrowPointAtCenter>
                            <a><Icon type="plus" /></a>
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
                    </div>
					<Pagination showSizeChanger defaultCurrent={2} total={500} className="mar-spacing-right" showTotal={showTotal} />
				</div>			
			</div>
    	);
    }
}

const data = [
  	{    key: '1',    name: 'John Brown',age: 32, address: 'mock信息', address1: 'mock信息', address2: 'mock信息', address3: 'mock信息', address4: 'mock信息'  },
   	{    key: '2',    name: 'Jim Green', age: 42, address: 'mock信息', address1: 'mock信息', address2: 'mock信息', address3: 'mock信息', address4: 'mock信息'  }, 
   	{    key: '3',    name: 'Joe Black', age: 32, address: 'mock信息', address1: 'mock信息', address2: 'mock信息', address3: 'mock信息', address4: 'mock信息'  },
   	{    key: '4',    name: 'Joe Black', age: 32, address: 'mock信息', address1: 'mock信息', address2: 'mock信息', address3: 'mock信息', address4: 'mock信息'  },
   	{    key: '5',    name: 'Joe Black', age: 32, address: 'mock信息', address1: 'mock信息', address2: 'mock信息', address3: 'mock信息', address4: 'mock信息'  },
   	{    key: '6',    name: 'Joe Black', age: 32, address: 'mock信息', address1: 'mock信息', address2: 'mock信息', address3: 'mock信息', address4: 'mock信息'  },
   	{    key: '7',    name: 'Joe Black', age: 32, address: 'mock信息', address1: 'mock信息', address2: 'mock信息', address3: 'mock信息', address4: 'mock信息'  },
   	{    key: '8',    name: 'Joe Black', age: 32, address: 'mock信息', address1: 'mock信息', address2: 'mock信息', address3: 'mock信息', address4: 'mock信息'  },
   	{    key: '9',    name: 'Joe Black', age: 32, address: 'mock信息', address1: 'mock信息', address2: 'mock信息', address3: 'mock信息', address4: 'mock信息'  },
   	{    key: '10',    name: 'Joe Black', age: 32, address: 'mock信息', address1: 'mock信息', address2: 'mock信息', address3: 'mock信息', address4: 'mock信息'  },
	{    key: '11',    name: 'Joe Black', age: 32, address: 'mock信息', address1: 'mock信息', address2: 'mock信息', address3: 'mock信息', address4: 'mock信息'  }
];

function showTotal(total) {
  return `共 ${total} 条`;
}