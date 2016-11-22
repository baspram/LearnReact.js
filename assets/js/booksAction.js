export function fetchBooks(){
	return function(dispatch){
		dispatch({type: "FETCH_BOOKS"});
		setTimeout(function(){
			dispatch({type:"FETCH_BOOKS_COMPLETED", value: require('./books.json')});
		}, 5000	);
	};
};