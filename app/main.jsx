import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'
import router from './router';
import configure from './store/configureStore';
import myhistory from './history'
// 测试 fetch 的功能
// import {getuser } from './fetch/test'
// getuser();
import './config/config'
const store = configure({ config: global.$GLOBALCONFIG })
const history = syncHistoryWithStore(myhistory, store)
history.listen(function (location) { return location })

ReactDOM.render(
  	<Provider store={store}>
		<Router history={history} >
			{ router }
		</Router>
  	</Provider>,
  	document.getElementById('root')
);
