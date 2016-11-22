import {combineReducers} from 'redux';

import bookReducer from "./bookReducer";
import commentReducer from "./commentReducer";

export default combineReducers({
	bookReducer,
	commentReducer
});
