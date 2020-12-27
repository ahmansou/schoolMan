import classes from './Layout.module.scss';
import Signin from '../pages/Signin/Signin';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Layout extends Component {
	state = {
		username: undefined
	}

	componentDidMount() {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token)
			this.setState({username: token.token.username});
	}	

	render() {
		return (
			<Router>
				<div className={classes.Layout} >
					{/* {this.state.username} */}
					<Route path="/sign-in" exact>
						<Signin />
					</Route>
					{/* dsds */}
				</div>
			</Router>
		)
	}
}

export default Layout;