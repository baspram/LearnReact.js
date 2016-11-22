import {applyMiddleware, combineReducers, createStore} from 'redux';
import reducer from "./reducers"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

const middleware = applyMiddleware(promise(), thunk, logger());

export default createStore(reducer, middleware);