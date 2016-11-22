import React from 'react';
import {IndexLink} from 'react-router';
import {connect} from 'react-redux';
import Path from 'path';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import * as commentAction from './commentAction.js'

export default class SingleBook extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			bookId : "",
			allBooks : []
		}
	}
	componentWillMount(){
		this.setState({
			bookId : this.props.params.book,
			allBooks : require('./books.json')
		});
	}
	render(){	
		var book = this.state.allBooks[this.state.bookId];
		return (
			<div className="book">
				<div className="book-header">
					<IndexLink to="" className="btn back-button">
						<span className="glyphicon glyphicon-menu-left"></span>
						Back to Home
					</IndexLink>
				</div>
				<BookContent 
					book = {book}/>
				<BookComment
					bookId = {this.state.bookId}/>
			</div>
		)
	}
};

class BookContent extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			fetching: true
		}
	}
	loadCover(){
		//for mimicking realtime loading
		setTimeout(function(){
			this.setState({
				fetching : false,
			})
		}.bind(this), 3000);
	}
	render(){
		var cover = Path.format({
			dir : '/assets' , 
			base : this.props.book.cover
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
			<div className="book-content">
				<div className="book-main-content">
					<div className="col-xs-4">
						<div className="book-cover">
							{loadCover()}
							<img className={(!this.state.fetching) ? 'loaded' : ''} src={cover} onLoad={this.loadCover.bind(this)} alt=""></img>
						</div>
						
					</div>
					<div className="col-xs-8">
						<div className="book-detail">
							<div className="book-title">
								<h1>{this.props.book.title}</h1>
							</div>
							<div className="book-author">
								<p>
									by {this.props.book.author}
								</p>
							</div>
							<div className="book-rating">
								<p>
									Rating:{this.props.book.rating}/5<span className="glyphicon glyphicon-star"></span> (from {this.props.book.ratingCount} reviewers)
								</p>
							</div>
							<div className="book-summary">
								<p>
									{this.props.book.summary}
								</p>
							</div>
						</div>	
					</div>
				</div>
			</div>
		)
	}
};

@connect(function(store){
	return ({
		allComments :  store.commentReducer.comments,
		fetching : store.commentReducer.fetching,
		adding : store.commentReducer.adding
	})
})
class BookComment extends React.Component{
	constructor(props){
		super(props);
		this.state = ({
			addBook : false,
			username : ""
		})
	}
	componentWillMount(){
		this.props.dispatch(commentAction.fetchComments(this.props.bookId));
	}
	handleAddForm(){
		var addBook = !this.state.addBook;
		this.setState({
			addBook : addBook
		})
	}
	addComment(newComment){
		this.props.dispatch(commentAction.addComment(newComment));
		this.setState({
			username : newComment.username,
			addBook : false
		})
	}
	deleteComment(thisComment){
		this.props.dispatch(commentAction.deleteComment(thisComment));
	}
	render(){
		var commentList = this.props.allComments;

		commentList = commentList.map(function(item, index){
			return (
				<CommentList 
					key = {index} 
					comment = {item}
					username = {this.state.username}
					onDelete = {this.deleteComment.bind(this)}
					thisItem = {item}/>
			)
		}.bind(this)); 

		var showAddForm = function(){
			if(this.state.addBook){
				return (
					<AddComment 
						key = "1"
						bookId = {this.props.bookId}
						addNewComment = {this.addComment.bind(this)}/>
				)
			}
		}.bind(this);

		var commentsHeader = function(){
			if(this.props.fetching){
				return (
					<div className="book-comments-header">
					<h1> Loading Comments </h1>
					</div>
				)
			} else {
				if(this.props.adding){
					return (
						<div className="book-comments-header">
						<h1>Comments</h1>
						<div className="btn add-comments-button" onClick={this.handleAddForm.bind(this)}>
							Adding comment....
						</div>
						</div>
					)
				} else {
					return (
						<div className="book-comments-header">
						<h1>Comments</h1>
						<div className="btn add-comments-button" onClick={this.handleAddForm.bind(this)}>
							<span className="glyphicon glyphicon-pencil"></span>
						</div>
						</div>
					)
				}
				
			}
		}.bind(this);
		return (
			<div className="book-comments">
				{commentsHeader()}
				<div className="add-form-container">
					<ReactCSSTransitionGroup
	          transitionName="fadeDown"
	          transitionEnterTimeout={500}
	          transitionLeaveTimeout={500}>
	          {showAddForm()}
	        </ReactCSSTransitionGroup>
	       </div>
				<div className="book-comments-list">
					<ReactCSSTransitionGroup
	          transitionName="fadeUp"
	          transitionEnterTimeout={500}
	          transitionLeaveTimeout={500}>
							{commentList}
	        </ReactCSSTransitionGroup>
	        
				</div>
			</div>
		)
	}
};

class AddComment extends React.Component{
	username: ""
	comment: ""
	constructor(props){
		super(props);
		this.state = ({
			retry: false
		});
	}
	storeUsernameValue(value){
		this.username = value;
	}
	storeCommentValue(value){
		this.comment = value;
	}
	handleAddComment(e){
		e.preventDefault();
		if(this.username.length && this.comment.length){
			var newComment = {
				"bookId" : this.props.bookId,
				"username" : this.username,
				"date" : Date.now(),
				"comment" : this.comment
			}
			this.props.addNewComment(newComment);	
		} else {
			this.setState({
				retry: true
			})
		}
	}
	render(){
		var showSubmitButton = function(){
			if(this.state.retry){
				return <input type="submit" className="btn submit-comment-button" value="Check Your input and Try Again"></input>
			} else {
				return <input type="submit" className="btn submit-comment-button" value="Add Comment"></input> 
			}
		}.bind(this);
		return (
			<div className="add-comments-form">
				<form action="" onSubmit={this.handleAddComment.bind(this)}>
					<InputText 
						typeInput = "input"
						labelInput = "Username"
						regexInput = {/^[a-zA-Z0-9._-]{3,}$/} 
						hintInput = "min. 3 characters. Allowed unique characters: .(dot) _(underscore) -(dash)"
						getValue = {this.storeUsernameValue.bind(this)}/>
					<InputText 
						typeInput = "textarea"
						labelInput = "Comment"
						regexInput = {/^(.|\n){30,}$/} 
						hintInput = "min. 30 characters."
						getValue = {this.storeCommentValue.bind(this)}/>

					{showSubmitButton()}
				</form>
			</div>
		)
	}
};

class InputText extends React.Component{
	constructor(props){
		super(props);
		this.state = ({
			verified: false,
			typeInput: "",
			labelInput: "",
			regex: "",
			hint: ""
		});
	}
	componentWillMount(){
		this.setState({
			typeInput : this.props.typeInput,
			labelInput : this.props.labelInput,
			regex : this.props.regexInput,
			hint : this.props.hintInput
		})
	}
	verifyInput(e){
		var input = e.target.value;
		var regex = this.state.regex;
		if (regex.test(input)){
			this.props.getValue(input);
			this.setState({
				verified: true
			});
		} else {
			this.props.getValue("");
			this.setState({
				verified: false
			});
		}
	}
	render(){
		var showInput = function(){
			if(this.state.typeInput == "input"){
				return <input className="form-control" type="text" onChange={this.verifyInput.bind(this)}></input>;
			}
			if(this.state.typeInput == "textarea"){
				return <textarea className="form-control" name="" id="" cols="30" rows="10" onChange={this.verifyInput.bind(this)}></textarea>;
			}
		}.bind(this);

		var showHints = function(){
			if(!this.state.verified){
				return <i> {this.state.hint} </i>
			}
		}.bind(this);

		return (
			<div className="form-group">
				<label for="">{this.state.labelInput}</label>
				{showInput()}
				{showHints()}
			</div>
		);
	}
};

@connect(function(store){
	return ({
		deleting : store.commentReducer.deleting
	})
})
class CommentList extends React.Component{
	handleDeleteComment(){
		this.props.onDelete(this.props.thisItem);
	}
	render(){
		var showDeleteButton = function(){
			if( this.props.comment.username == this.props.username){
				if (this.props.deleting){
					return (
						<button className="btn book-comments-remove" onClick={this.handleDeleteComment.bind(this)}>
							deleting....
						</button>
					);	
				}
				return (
					<button className="btn book-comments-remove" onClick={this.handleDeleteComment.bind(this)}>
						<span className="glyphicon glyphicon-remove"></span>
					</button>
				);
			}
		}.bind(this);

		return (
			<div className="book-comments-item">
				<div className="book-comments-user">
					<b>@{this.props.comment.username}</b>	 
					{showDeleteButton()}		
				</div>
				<div className="book-comments-content">
					{this.props.comment.comment}
				</div>
			</div>
		)
	}
};

