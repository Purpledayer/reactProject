import React from 'react'
import { Route,  IndexRoute} from 'react-router'
import Containers from './containers';
import Login from './pages/login/login';
import Welcome from './pages/welcome';
import Company from './pages/company/company';
import Test from './pages/test/index'; 
/* 进入路由的判断*/
function isLogin(nextState, replaceState) {
  const token = sessionStorage.getItem('token')
  console.info('token',token);
  if (!token) {
    replaceState('/login')
  }
}
const router = (
  <Route>
     <Route path="/" component={Containers} onEnter={isLogin}> 
      <IndexRoute component={Welcome} />
      <Route path="/company" component={Company} />
      <Route path="/test" component={Test} />
    </Route>
     <Route path="/login" component={Login}></Route>
  </Route>
);

export default router
