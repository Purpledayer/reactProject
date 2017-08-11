/*
 * @Author(作者) : Avalon 
 * @Create Time(创建时间): 2017-7-24
 * @Last Modified by(最后修改者): Avalon 
 * @Last Modified time(最后修改事件): 2017-7-25
 */

import React,{Component} from "react";
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {LoginpostData } from './../../fetch/login/login'
const FormItem = Form.Item;

class NormalLoginForm extends Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		if (!err) {
			const result = LoginpostData(values);
			//登陆接口返回值处理
			// result.then(res => {
			// 	return res.json()
			// }).then(json => {
			// 	// const data = json.root;
			// 	// debugger;
			// 	console.info('page',json);
			// 	// const pagination = json;
			// 	// this.setState({
			// 	// })
			// }) 
			console.info('Received values of form: ', values);
			sessionStorage.setItem('token', 'token')
			/*react-router v4.0.x 新的链接方式 */
			this.props.history.push('/')
		}
		});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="Login-box">
				<Form onSubmit={this.handleSubmit} className="login-form login-from">
				<FormItem>
					{getFieldDecorator('userName', {
					rules: [{ required: true, message: '输入用户名!' }],
					})(
					<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
					rules: [{ required: true, message: '请输入密码!' }],
					})(
					<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
					)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('remember', {
					valuePropName: 'checked',
					initialValue: true,
					})(
					<Checkbox>记住密码</Checkbox>
					)}
					<a className="login-form-forgot" href="">忘记密码</a>
					<Button type="primary" htmlType="submit" className="login-form-button">
					Log in
					</Button>
					<a href="">现在注册</a>
				</FormItem>
				</Form>
			</div>
		);
	}
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm;

