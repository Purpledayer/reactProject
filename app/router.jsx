import React from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router,  Route,  Link,  Redirect,  Switch} from 'react-router-dom'
import popCheck from './pages/login';
import popCheck1 from './pages/form' ;

// /* 进入路由的判断*/
// function isLogin(nextState, replaceState) {
//     const token = sessionStorage.getItem('token')
//     if (!token) {
//         replaceState('/login')
//     }
// }
const router = (
	<Router>
		<Switch>
			<Route exact path="/" component={popCheck}/> 
			<Route exact path="/form" component={popCheck1}/>
		</Switch>
	</Router>
  );
  export default router
