var React = require('react');

var About = React.createClass({
	render: function(){
		return (
			<div className="about">
				<h1 className="about-header"> This is About Page </h1>
				<p className="about-content">
					This is a project that I made to learn a little bit about React.js framerwork. This web apps implements
					some basic functihonalities such as routing (using react-router), requesting stored data (using  react-redux),
					realtime adding & deleting data (as shown in book comments), mimicking loading image and so on.
				</p>
			</div>
		)
	}
});

module.exports = About;