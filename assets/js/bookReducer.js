const bookInitialState = {
	allBooks : [],
	allBooksCount : 0,
	fetching : false,
	fetched : false
};

export default function reducer(state=bookInitialState, action) {
	switch(action.type){
		case "FETCH_BOOKS" : {
			state = Object.assign({}, state, {fetching: true});
			break;
		}
		case "FETCH_BOOKS_COMPLETED" : {			
			state = Object.assign({}, state, {fetching: false, fetched: true, allBooks : Object.assign([], state.allBooks, action.value), allBooksCount : action.value.length});
			break;
		}
	}
	return state;
};

