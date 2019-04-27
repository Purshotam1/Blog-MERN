import {createStore,applyMiddleware,combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import article from './reducers/article'
import user from './reducers/user'


const rootReducer=combineReducers({article,user,router:routerReducer})
export default createStore(rootReducer,applyMiddleware(thunkMiddleware,logger))