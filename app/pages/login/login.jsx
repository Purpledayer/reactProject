/*
 * @Author(作者) : Avalon 
 * @Create Time(创建时间): 2017-7-24
 * @Last Modified by(最后修改者): Avalon 
 * @Last Modified time(最后修改事件): 2017-7-25
 */

import React,{Component} from "react";
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router-dom';
 

export default  class NormalLoginForm extends Component {
	constructor(props) {
		super(props)
       this.state = {
		   userName:'' ,
		   password:'',
		   value: ''
	   };
	   this.loginsubmit = this.loginsubmit.bind(this);
	   this.handleSubmit = this.handleSubmit.bind(this);
	  };
	  loginsubmit = (e) => {
		console.log(this.state.userName);
		debugger;
		// this.props.history.push('/login')
	  }
	handleSubmit= (e) => {
		console.log('A name was submitted: ' + this.state.value);
		event.preventDefault();
	}
	
	render() {
		return (
			<div>
				<form onSubmit={this.loginsubmit}>
					<input type="text" value={this.state.userName}/>
					<input type="password" value ={this.state.password}/>
					<input type="submit" value="点击"/>
				</form>
				<button onClick={this.loginsubmit}>aaaaa</button>
			</div>
			// <form onSubmit={this.handleSubmit}>
			// 	<label>
			// 	Name:
			// 		<input type="text" value={this.state.value} />
			// 	</label>
			// 	<input type="submit" value="Submit" />
			// </form>
		);
	}
}
 