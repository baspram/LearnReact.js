console.log('App loaded');

require('../css/bootstrap.css');
require('../css/style.css');

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import {Router, Route, IndexRoute, hashHistory, Link, IndexLink} from 'react-router';
import  _ from 'lodash';
import BooksList from './bookList';
import SingleBook from './singleBook';
import About from './about'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import axios from 'axios';

// var Pokedex = require('pokedex-promise-v2');
// var P = new Pokedex();

//  P.getPokemonByName('eevee') // with Promise
//     .then(function(response) {
//       console.log(response);
//     })
//     .catch(function(error) {
//       console.log('There was an ERROR: ', error);
//     });

// var config = {
//   headers: {'User-Agent': 'cheese', 'Origin': '*'}
// };


// axios.get('http://www.pokeapi.co/api/v2/pokemon/', config)
// 	.then(function(response){
// 		console.log("POKEAPI", response);
// 	}).catch(function (error) {
//     console.log("POKEAPI",error);
//   });



// var Pokedex = require('pokedex-promise-v2');

// var options = {
//   protocol: 'https',
//   hostName: 'pokeapi.co',
//   versionPath: '/api/v2/'
// }

// var P = new Pokedex(options);

// P.getPokemonByName('eevee') // with Promise
//     .then(function(response) {
//       console.log(response);
//     })
//     .catch(function(error) {
//       console.log('There was an ERROR: ', error);
//     });



class MainLayout extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isSearching : false,
			searchQuery : ""
		}
	}

	searchBook(query){
		if(query.length != 0){
			this.setState({
				isSearching: true,
				searchQuery: query
			})
		} else {
			this.setState({
				isSearching: false,
				searchQuery: ""
			})
		}
	}

	cloneChildren() {
    var path = this.props.location.pathname;
    if (this.props.children) {
      return React.cloneElement(this.props.children, { key: path })
    }
  }

  toggleIsSearching(){
  	var isSearching = !this.state.isSearching;
  	this.setState({
  		isSearching: isSearching,
  		searchQuery: ""
  	})
  }

	render() {
		var booklist = function(){
			if(this.props.location.pathname == "/" || this.state.isSearching){
				return (
					<BooksList 
							key = {this.props.location.pathname}
							isSearching = {this.state.isSearching}
							searchQuery = {this.state.searchQuery}
							changeSearchStatus = {this.toggleIsSearching} />
				)
			} 
			const clone = React.cloneElement(this.props.children, { key: this.props.location.pathname  });
			return clone;
		}.bind(this);

		return (
			<div className="row">
				<div className="main-left-column col-md-3">
					<MainNavigation 
						onSearch = {this.searchBook.bind(this)}/>				
				</div>
				<div className="main-right-column col-md-9">
					<div className="main-content">
	          {booklist()}
					</div>
				</div>
			</div>
		)
	}
}

class MainNavigation extends React.Component{
	handleSearch(e){
		e.preventDefault();
		var query = this.refs.searchInput.value;
		this.props.onSearch(query);
	}
	render(){
		var logo = require('../images/libria-w.png');
		return (
			<div className="main-navigation">
				<IndexLink  activeClassName="active" to="/">
					<div className="header">
						<img src={logo} alt=""></img>
					</div>
				</IndexLink>
				
				<div className="search">
					<div className="search-bar">
						<form action="" className="form-group has-feedback" onChange={this.handleSearch.bind(this)}>
							<input type="text" className="form-control" placeholder="Search Book" ref="searchInput"></input>
							<span className="glyphicon glyphicon-search form-control-feedback" aria-hidden="true"></span>
							<input type="submit" className="btn" value=""></input>
						</form>
					</div>
				</div>
				<div className="navigation">
					<Link activeClassName="active" to="about" className="navigation-item">about</Link>
				</div>
			</div>
		)
	}
};


ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={MainLayout}>
				<IndexRoute ></IndexRoute>
				<Route path="books/:book" component={SingleBook}></Route>
				<Route path="about" component={About}></Route>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('main-container')
);