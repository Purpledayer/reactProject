import React from 'react'
import { Route,  IndexRoute} from 'react-router'
import components from './components';
import Login from './pages/login/login';
import Welcome from './pages/welcome/welcome';
import Company from './pages/company/company';
import Bmuser from './pages/bmuser/bmuser';
import Role from './pages/role/role';
import Dictsrc from './pages/dictsrc/dictsrc';
import Dict from './pages/dict/Dict';
import Sysgrid from './pages/Sysgrid/Sysgrid';
import Importconfig from './pages/importconfig/importconfig'
import Sysworkflow from './pages/sysworkflow/Sysworkflow'
import Systable from './pages/systable/Systable'
import Manager from './pages/manager/Manager'
import Test from './pages/test/index'; 

/* 进入路由的判断*/
function isLogin(nextState, replaceState) {
  	const token = sessionStorage.getItem('token')
	if (!token) {
		replaceState('/login')
	}
}
const router = (
	<Route>
		<Route path="/" component={components} onEnter={isLogin}> 
			<IndexRoute component={Welcome} />
			<Route path="/Company" component={Company} />
			<Route path="/Bmuser" component={Bmuser} />
			<Route path="/Role" component={Role} />
			<Route path="/Dict" component={Dict} />
			<Route path="/Dictsrc" component={Dictsrc} />
			<Route path="/Sysgrid" component={Sysgrid} />
			<Route path="/Importconfig" component={Importconfig} />
			<Route path="/Sysworkflow" component={Sysworkflow} />
			<Route path="/Systable" component={Systable} />
			<Route path="/Manager" component={Manager} />
			<Route path="/test" component={Test} />
		</Route>
		<Route path="/login" component={Login}></Route>
	</Route>
);

export default router
