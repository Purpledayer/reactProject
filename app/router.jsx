import React, { Component } from 'react';
import {  BrowserRouter as Router,  Route,  Link,  Redirect,  Switch} from 'react-router-dom'

import Containers from './pages/index';
import Login from './pages/login/login';
import Welcome from './pages/welcome';
import Company from './pages/company/company';
import Test from './pages/test/index'; 
 
export default class Crouter extends Component {
	constructor(){
		super();
		// const token = sessionStorage.getItem('token')
		// if (!token) {
		// 	replaceState('/login')
		// }
	}
	render(){
		return(
			<Router>
				<div>
          			<Switch>
						{/* <Route exact path="/" component={Containers} /> */}
						<Route  path="/Login" component={Login} />
						<Containers>
							<Switch> 
								<Route path="/home" component={Company}/>
								<Route path="/test" component={Test}/>
								<Redirect from="/" to="/home"/>
							</Switch>
						</Containers>
					</Switch>
        		</div>
			</Router>
		)
	}
}
