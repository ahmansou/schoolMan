import classes from './Layout.module.scss';
import Signin from '../pages/Signin/Signin';
import Profile from '../pages/Profile/Profile';
import SideBar from '../UIElements/SideBar/SideBar';
import Header from '../UIElements/Header/Header';
import Students from '../pages/Students/Students';
import Students1 from '../pages1/Students/Students';
import NewStudent from '../pages/Students/NewStudent/NewStudent';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, useRouteMatch } from 'react-router-dom';
import StudentDetails from '../pages/Students/StudentDetails/StudentDetails';
import Parents from '../pages/Parents/Parents';

const RequireAuth = (props, activeOnlyWhenExact) => {
	let match = useRouteMatch({
		path: props.to,
		exact: activeOnlyWhenExact
	  });
	// if (!match && props.username === undefined)
	if (!match)
		window.location = '/sign-in';
	return false;
}

class Layout extends Component {
	state = {
		username: undefined
	}

	
	componentDidMount() {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token)
			this.setState({username: token.token.username});
	}

	componentDidUpdate() {
		
	}
	
	render() {
		let token = JSON.parse(localStorage.getItem('authToken'));

		return (
			<Router>
				{!token ? <Redirect to="/sign-in" /> : null}
				<div className={classes.Layout} >
					{token ? <SideBar /> : null}
					{
						token ?
						<div className={classes.Main} >
							{token ? <Header /> : null}
							<Route path="/profile" exact>
								<Profile requireAuth={RequireAuth} />
							</Route>
							<Route path="/students" exact>
								<Students requireAuth={RequireAuth} />
							</Route>
							<Route path="/new-student" exact>
								<NewStudent />
							</Route>
							<Route path="/new-parent" exact>
								<Students1 requireAuth={RequireAuth} />
							</Route>
							<Route path="/parents" exact>
								<Parents />
							</Route>

							<Route path="/student-details/student=:id" component={StudentDetails} />
						</div>
						: null
					}
					<Route path="/sign-in" exact>
						<Signin />
					</Route>
				</div>
			</Router>
		)
	}
}

export default Layout;