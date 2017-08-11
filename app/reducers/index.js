import {  routerReducer as routing,} from 'react-router-redux'
import {  combineReducers,} from 'redux'

// import tabListResult from './tabList'

 
const rootReducer = combineReducers({
  routing,
  config: (state = {}) => state,
  // tabListResult,
 
});

export default rootReducer;
