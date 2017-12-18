import React,{Component} from "react";
import ReactDOM from 'react-dom';
// import {Button } from 'antd';
 
export default class NameForm extends Component {
	constructor() {
		super();
		this.state = {
			value: '',
			a:'',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		// alert('A name was submitted: ' + this.state.value);
		this.setState({a:this.state.value});
		this.state.a = this.state.value;
		event.preventDefault();
	}

	render() {
		const adb= this.state.a;
		return (
			<div>
			<form onSubmit={this.handleSubmit}>
				<label>
				Name:
				<input type="text" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
			{adb}
			</div>
		);
	}
}