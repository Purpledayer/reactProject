import React,{Component} from "react";
import {Link} from 'react-router';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux'

import { Menu, Icon, Button } from 'antd';
import { updateTabList } from './../actions/tabList'
const SubMenu = Menu.SubMenu;
@connect(
    (state, props) => ({ config: state.config }),
    (dispatch) => ({ actions: bindActionCreators(routerActions, dispatch), dispatch: dispatch })
)
export default class LeftNav extends Component {
    constructor(props, context) {
		super(props, context)
		const { pathname } = props.location
		this.state = {
			current: pathname,
			openKeys: ['sub1'],
		}
        this._handleClick = this._handleClick.bind(this)
        this.renderLeftNav = this.renderLeftNav.bind(this);
        this.dddd =this.dddd.bind(this);
	}
    	//初始化左侧菜单
	componentWillMount(e) {
        //初始化加载首页tab标签页面
       this.props.dispatch(updateTabList({ title: 'welcome', content: '', key: '/' }))
   }
//    //菜单点击事件
   _handleClick(e) {
        const { actions } = this.props;
        this.setState({
            current: e.key,
            openKeys: e.keyPath.slice(1),
        },() => {
            actions.push(e.key)
            this.props.dispatch(updateTabList({ title: e.item.props.name, content: '', key: e.key }))
        })
    }

    //生成菜单
    renderLeftNav(options) {
        const self = this;
        const newOptions = fun2(options);
        return newOptions.map((item, index) => {
            if(!item.children){
                return(
                    <Menu.Item name={item.model_name} key={item.model_url}>
                        <Icon type={item.icon} title={item.model_name} />
                        <span className="menu-name">{item.model_name}</span>
                    </Menu.Item>
                )
            }else{
                return (
                    <SubMenu  title={<span className="menu-name">{item.model_name}</span>}>
                        {item.children && item.children.length > 0 ? self.dddd(item.children) : null}
                    </SubMenu>    
                )
            }
        })
    }
    dddd(op){
        return op.map((item, index) => {
            return (
                <Menu.Item key={item.model_url} name={item.model_name}>
                    <span className="menu-name">{item.model_name}</span>
                </Menu.Item>
            )
        })
    }
    render() {
        return (
            <div>
                <div className="logo" />
                <Menu  onClick={this._handleClick} theme="dark" className="colorWhite" defaultOpenKeys={['sub1']}  defaultOpenKeys={['sub1']} mode="inline">
                    { this.renderLeftNav(this.props.config.NAVIGATION || []) }
                </Menu>
            </div>
        );
    }
}
 
function fun2(options) {
    var result = [];
    for(var i =0;i<options.length;i++){
        var value = options[i];
        if(!value.parent_code || "undefined"==typeof(value.parent_code)) {
            var node = copy(value);
            for(var j = 0;j<options.length;j++) {
                var item = options[j];
                if(item.parent_code&&"undefined"!=typeof(item.parent_code)) {
                    if (item.parent_code == node.model_code) {
                        if("undefined" == typeof(node.children)){
                            node.children=[];
                        }
                        node.children.push(item);
                    }
                } 
            }
            result.push(node);
        } else {
            continue;
        }
    }
    return result;
}
function copy(obj){
    var newobj = {};
    for ( var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}
