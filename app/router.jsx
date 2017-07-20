import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import popCheck from './pages/login'
 

/* 进入路由的判断*/
function isLogin(nextState, replaceState) {
    const token = sessionStorage.getItem('token')
    if (!token) {
        replaceState('/login')
    }
}
const router = (
	<Router>
     	<Route exact path="/" component={popCheck}/>
   	</Router>
  );
  export default router
