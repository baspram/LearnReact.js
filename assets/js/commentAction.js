export function fetchComments(bookId){
	return function(dispatch){
		dispatch({type: "FETCH_COMMENTS"});
		var comments = require('./comments.json');
		var filteredComments = _.filter(comments, function(item){
			return (item.bookId == bookId);
		});
		setTimeout(function(){
			dispatch({
				type:"FETCH_COMMENTS_COMPLETED",
				value : filteredComments
			});
		}, 3000	);
	};
};

export function addComment(newComment){
	return function(dispatch){
		dispatch({
				type:"ADD_COMMENT"
			});
		setTimeout(function(){
			dispatch({
				type:"ADD_COMMENT_COMPLETED",
				value:newComment
			});
		}, 3000	);
	};
};

export function deleteComment(thisComment){
	return function(dispatch){
		dispatch({
				type:"DELETE_COMMENT"
			});
		setTimeout(function(){
			dispatch({
				type:"DELETE_COMMENT_COMPLETED",
				value : thisComment
			});
		}, 3000	);
	};
};