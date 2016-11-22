import React from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Path from 'path';
import {fetchBooks} from './booksAction.js'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

@connect(function(store){ 
	return {
		allBooks : store.bookReducer.allBooks,
		allBooksCount : store.bookReducer.allBooksCount,
		fetching : store.bookReducer.fetching,
		fetched : store.bookReducer.fetched
	}
})
export default class BooksList extends React.Component {
	constructor(props, context){
		super(props, context)
		this.state = {
			part : 1,
			booksPerPage : 8,
			booksCount : 8,
			orderBy : "title",
			orderDir : "asc"
		}
	}
	componentWillMount(){
		if (this.props.allBooksCount == 0){
			this.props.dispatch(fetchBooks());
		}
	}
	loadMore(){
		var part = this.state.part + 1;
		var booksCount = part * this.state.booksPerPage;
		this.setState({
			part : part,
			booksCount : booksCount
		});
	}
	handleSort(e){
		var orderBy = e.target.id;
		var orderDir = this.state.orderDir;
		if(orderBy == this.state.orderBy){
			if(orderDir == 'desc'){
				orderDir = 'asc';
			} else {
				orderDir = 'desc';
			}
		} else {
			orderDir =  'asc';
		}
		this.setState({
			orderBy :  orderBy,
			orderDir : orderDir
		});
	}

	render() {
		var allBooks = this.props.allBooks;
		var orderBy = this.state.orderBy;
		var orderDir = this.state.orderDir;
		var query = this.props.searchQuery.toLowerCase();
		var isSearh = this.props.isSearching;

		var displayBooks = [];
		var filteredBooks = [];

		allBooks = _.orderBy(allBooks, function(item){
			return item[orderBy].toLowerCase();
		}, orderDir);
		
		for (var i=0; i < this.state.booksCount; i ++){
			if(i < this.props.allBooksCount){
				displayBooks.push(allBooks[i]);	
			}
		}

		if(isSearh){
			displayBooks.forEach(function(item){
				if(
					(item.title.toLowerCase().indexOf(query) != -1) ||
					(item.author.toLowerCase().indexOf(query) != -1)
				) {
					filteredBooks.push(item);
				}
			});
		} else {
			filteredBooks = displayBooks;
		}
		
		filteredBooks = filteredBooks.map(function(item, index) {
			return(
				<BooksItem 
					key = {index}
					bookDetail = {item} />
			);
		}.bind(this));

		var isLoading = function(){
			if(this.props.fetching){
				return (
					<div className="bookLoading">
						<div id="circularG">
							<div id="circularG_1" className="circularG"></div>
							<div id="circularG_2" className="circularG"></div>
							<div id="circularG_3" className="circularG"></div>
							<div id="circularG_4" className="circularG"></div>
							<div id="circularG_5" className="circularG"></div>
							<div id="circularG_6" className="circularG"></div>
							<div id="circularG_7" className="circularG"></div>
							<div id="circularG_8" className="circularG"></div>
						</div>
					</div>
				)
			}	
		}.bind(this);

		var headerText = function(){
			if (this.props.isSearching){
				return "Search Results for: " + this.props.searchQuery;
			} else {
				return "Books List";
			}
		}.bind(this);

		var loadMoreButton = function(){
			if(this.state.booksCount < this.props.allBooksCount && filteredBooks.length >= this.state.booksCount){
				return (
					<button className="btn load-more-button" onClick={this.loadMore.bind(this)}> Load More </button>
				)
			}
		}.bind(this);

		return (
			<div className="books">
				<div className="books-header">
					<h1>{headerText()}</h1>
					Sort by: 
					<button id="title" onClick={this.handleSort.bind(this)} className={(this.state.orderBy == 'title') ? 'btn order-button active' : 'btn order-button'}>Title</button> 
					<button id="author" onClick={this.handleSort.bind(this)} className={(this.state.orderBy == 'author') ? 'btn order-button active' : 'btn order-button'}>Author</button> 
					<button id="rating" onClick={this.handleSort.bind(this)} className={(this.state.orderBy == 'rating') ? 'btn order-button active' : 'btn order-button'}>Rating</button>
				</div>
				<div className="books-list">
					{isLoading()}
					<div className="row">
						<ReactCSSTransitionGroup
		          transitionName="fadeUp"
		          transitionEnterTimeout={800}
		          transitionLeaveTimeout={300}>
		          {filteredBooks}
		        </ReactCSSTransitionGroup>
						<div className="col-md-12">
							{loadMoreButton()}
						</div>
					</div>
					<div className="row">
						
					</div>
				</div>
			</div>
		)
	}
}

class BooksItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			fetching: true
		}
	}
	componentWillMount(){
		var cover = Path.format({
			dir : '/assets' , 
			base : this.props.bookDetail.cover
		});
		// this.props.dispatch(fetchBookListCover(this.props.bookDetail.id, cover));
	}
	readDetailBook(){
		this.props.changeSearchStatus();
	}
	loadCover(){
		//for mimicking realtime loading image
		setTimeout(function(){
			this.setState({
				fetching : false
			});
		}.bind(this), 3000);
	}
	render(){
		
		var cover = Path.format({
			dir : '/assets' , 
			base : this.props.bookDetail.cover
		});

		var loadCover = function(){
			if(this.state.fetching){
				return (
					<div className="bookLoading">
						<div id="circularS">
							<div id="circularS_1" className="circularS"></div>
							<div id="circularS_2" className="circularS"></div>
							<div id="circularS_3" className="circularS"></div>
							<div id="circularS_4" className="circularS"></div>
							<div id="circularS_5" className="circularS"></div>
							<div id="circularS_6" className="circularS"></div>
							<div id="circularS_7" className="circularS"></div>
							<div id="circularS_8" className="circularS"></div>
						</div>
					</div>
				)
			}
		}.bind(this);
		return (
			<div className="books-list-item col-md-6">
				<div className="books-item">
					<div className="col-md-5">
						<div className="books-item-cover">
							{loadCover()}
							<img className={(!this.state.fetching) ? 'loaded' : ''} src={cover} onLoad={this.loadCover.bind(this)} alt=""></img>
						</div>
					</div>
					<div className="col-md-7">
						<div className="books-item-detail">
							<div className="books-item-title"><p>{this.props.bookDetail.title}</p></div>
							<div className="books-item-author">by {this.props.bookDetail.author}</div>
							<div className="books-item-rating">Rating: {this.props.bookDetail.rating}/5 <span className="glyphicon glyphicon-star"></span></div>
							<Link to={"books/"+this.props.bookDetail.id} className="books-item-button btn" onClick={this.readDetailBook.bind(this)}>	Read Detail	</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
};