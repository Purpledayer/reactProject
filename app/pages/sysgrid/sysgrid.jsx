import { } from 'antd';


import React, { Component } from 'react';
import { message  ,Select , Tabs ,Icon} from 'antd';
import FormModal from './../../components/modal/FormModal';
import { findIndexByKey } from './../../components/util/util';
import Operating from './operating'
const Option = Select.Option;
import getSqlData from './mockdate/sqlData';
import sqlData from './sqlConfig';
const TabPane = Tabs.TabPane;
export default class Sysgrid extends Component{
    constructor() {
		super();
		this.state = {
			lists: [],
			// 默认 table 头为空
			showFormModal: false,
            confirmLoading: false,
            newsFormConfigs:myconfigtable,
            formValues: {},
            selectedRowKeys: [],
			addNum: 0,
		};
	}
 
	DelDataSubmit = (event) =>  {
		console.log(event);
	}
	submitFormModal = () => {
		this.setState({ confirmLoading: true });
		const hideMsg = message.loading('提交中...', 0);
		const formValues = { ...this.state.formValues };
		const lists = [...this.state.lists];
        const type = this.state.formModalType;
        const selectedRowKeys = [...this.state.selectedRowKeys];
		let addNum = this.state.addNum;
        addNum = this.state.addNum + 1;
        formValues.id = formValues.id || (lists[lists.length - 1].id + addNum);
        formValues.key = formValues.id;
        lists.unshift(formValues);
       
		// 模拟 ajax 添加
		setTimeout(() => {
			this.setState({lists,addNum,formValues: {},confirmLoading: false,showFormModal: false,}, () => {
				hideMsg();
				notification.success({
					message: '成功',
					description: `${type === 'add' ? '新增' : '修改'}数据完成`,
				});
			});
		}, 1000);
	}

	cancelFormModal = () => {
		this.setState({
		showFormModal: false,
		formValues: {},
		});
	}
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }
    handleChange =(value)=> {
        console.log(`selected ${value}`);
    }
    callback =(key)=> {
        console.log(key);
      }  
    render(){
        const { selectedRowKeys ,lists,showFormModal,confirmLoading,newsFormConfigs,formValues,datalength} = this.state;
        const selectedLen = selectedRowKeys.length;
        return(
            <div className="page content-box displayFlex ">
                <div className="leftTabsNav mar-spacing-right border borderRadius">
                     <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择"
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="tom">Tom</Option>
                    </Select>
                    <div className="ColumnTitle">
                        <h4>角色管理</h4>
                    </div>
				    <Operating myconfigtable={myconfigtable} selectedRowKeys={selectedRowKeys} lists={this.state.lists} />
                </div>
                <Tabs onChange={this.callback} type="card">
                    <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1">
                        Content of Tab Pane 1
                        </TabPane>
                    <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
                        Content of Tab Pane 2
                    </TabPane>
                </Tabs>
			</div>
        )
    }
}

Sysgrid.propTypes = {
    tableName: React.PropTypes.string,
  };
  
  const myconfigtable = [
      {tableKey: 'user_code',name: '字典编码',type: 'text',width: 80,validators: ['required',],},
      {tableKey: 'user_name',name: '字典名称',type: 'text',width: 50,},
  ]