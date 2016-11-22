import _ from 'lodash';

const commentInitialState = {
	comments : [],
	fetching : false,
	fetched : false,
	error : null,
	adding: false,
	deleting: false,
};

export default function reducer (state=commentInitialState, action) {
	switch(action.type){
		case "FETCH_COMMENTS" : {
			// comments:[] for reseting comments store in case of different object
			state = Object.assign({}, state, {comments: [], fetching: true});
			break;
		}
		case "FETCH_COMMENTS_COMPLETED" : {
			state = Object.assign({}, state, {fetching: false, fetched: true, comments : action.value});
			break;
		}
		case "FETCH_COMMENTS_ERROR" : {
			state = Object.assign({}, state, {fetching: false, error: action.value});
			break;
		}
		case "ADD_COMMENT" : {
			state = Object.assign({}, state,
			{
				adding: true
			});
			break;
		}
		case "ADD_COMMENT_COMPLETED" : {
			state = Object.assign({}, state,
			{
				adding: false,
				comments : state.comments.concat(action.value)
			});
			break;
		}
		case "DELETE_COMMENT" : {
			state = Object.assign({}, state,
			{
				deleting : true
			});
			break;
		}
		case "DELETE_COMMENT_COMPLETED" : {
			var allComments = Object.assign([], state.comments);
			allComments = _.without(allComments, action.value);
			state = Object.assign({}, state,
			{
				deleting : false,
				comments : allComments
			});
			break;
		} 
	}
	return state;
};