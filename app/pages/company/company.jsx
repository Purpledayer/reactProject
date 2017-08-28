/*
 * @Author(作者) : Avalon 
 * @Create Time(创建时间): 2017-7-24
 * @Last Modified by(最后修改者): Avalon 
 * @Last Modified time(最后修改事件): 2017-7-25
 */

import React, { Component } from 'react';
import { Table, Icon ,Pagination ,Input, Button ,Tooltip, Modal ,message } from 'antd';
import { getListData }from './../../fetch/company/company';

import TableList from './../../components/tableList/tabList';
import Operating from './operating'
export default class Company extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: [],
            pagination:{},
            hasMore: false,
            isLoadingMore: false,
            page: 0,
            selectedRowKeys: [],   
            loading: false,
            newsFormConfigs:myconfigtable,
        }
    }
    start = () => {
	    this.setState({ loading: true });
	    // ajax request after empty completing
	    setTimeout(() => {
	      this.setState({
	        selectedRowKeys: [],
	        loading: false,
	      });
	    }, 1000);
	}
	onSelectChange = (selectedRowKeys) => {
	    console.log('selectedRowKeys changed: ', selectedRowKeys);
	    this.setState({ selectedRowKeys });
	}   
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
    /***更新数据*/
	UpdateData =(data)=>{
		this.setState({
			lists:data
		})
	}
    render() {
        const columns = [
            {
                title: '公司名称',
                dataIndex: 'cmp_name',
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
            { title: '拼音简码', dataIndex: 'cmp_enname', key: 'cmp_enname',width: 100,
                filterDropdown: (
                    <div className="custom-filter-dropdown">
                    <Input ref={ele => this.searchInput = ele} placeholder="Search name" value={this.state.searchText} onChange={this.onInputChange} onPressEnter={this.onSearch}/>
                    <Button type="primary">Search</Button>
                    </div>
                ),
                filterIcon: <Icon type="smile-o" style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }} />,
            }, 
            { title: '所属地域',dataIndex: 'cmp_area', key: 'cmp_area', width: 100,}, 
            { title: '公司地址',dataIndex: 'cmp_addr', key: 'cmp_addr', width: 150,}, 
            { title: '管理员账号',dataIndex: 'cmp_admin', key: 'cmp_admin', width: 100,}, 
            { title: '创建时间',dataIndex: 'reg_date', key: 'reg_date', width: 150,}, 
            { title: '更新时间',dataIndex: 'update_date', key: 'update_date', width: 150,}, 
            { title: '备注',dataIndex: 'remark', key: 'remark',width: 150,}
        ];
        const { selectedRowKeys,formModalTitle ,lists,loading,showFormModal,confirmLoading,newsFormConfigs,formValues,datalength} = this.state;
        const hasSelected = selectedRowKeys.length > 0;
        const selectedLen = selectedRowKeys.length;
		const rowSelection = {selectedRowKeys,onChange: this.onSelectChange,};
        return (
			<div className="page content-box">
				<div className="title">角色管理</div>
                <TableList rowSelection={rowSelection} size="small" columns={columns} dataSource={this.state.data} pagination={false} scroll={{ y: 500,x:1400 }}/>		
                <Operating  UpdateData={this.UpdateData.bind(this)} myconfigtable={this.state.newsFormConfigs} selectedRowKeys={selectedRowKeys} lists={this.state.data}></Operating>
			</div>
    	);
    }
    componentDidMount(){
        // 获取首页数据
        const hideMsg = message.loading('正在查询...', 0);
        const result = getListData(false,1501562410079,20,1,'reg_date','desc');
        result.then(res => {
            return res.json()
        }).then(json => {
            const data = json.root;
            const pagination = json;
            this.setState({
                //这里讲最新获取的数据 
                data: this.state.data.concat(data),
                pagination:pagination,
            }, hideMsg)
        }) 
    }
} 
 

const myconfigtable = [
    {title: '公司名称',dataIndex: 'cmp_name',key: 'name',width: 150,    }, 
    { title: '拼音简码', dataIndex: 'cmp_enname', key: 'cmp_enname',width: 100,}, 
    { title: '所属地域',dataIndex: 'cmp_area', key: 'cmp_area', width: 100,}, 
    { title: '公司地址',dataIndex: 'cmp_addr', key: 'cmp_addr', width: 150,}, 
    { title: '管理员账号',dataIndex: 'cmp_admin', key: 'cmp_admin', width: 100,}, 
    { title: '创建时间',dataIndex: 'reg_date', key: 'reg_date', width: 150,}, 
    { title: '更新时间',dataIndex: 'update_date', key: 'update_date', width: 150,}, 
    { title: '备注',dataIndex: 'remark', key: 'remark',width: 150,}
];



