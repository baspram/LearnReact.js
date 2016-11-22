export function fetchBookListCover(bookId, bookCoverSrc){
	return function(dispatch){
		dispatch({type: "FETCH_BOOKLIST_COVER", value: bookId});
		setTimeout(function(){
			dispatch({
				type:"FETCH_BOOKLIST_COVER_COMPLETED", 
				value: {bookId: bookId, bookSrc: bookCoverSrc}
			});
		}, 3000	);
	};
};