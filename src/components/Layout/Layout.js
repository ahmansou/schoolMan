import classes from './Layout.module.scss';
import Signin from '../pages/Signin/Signin';
import Profile from '../pages/Profile/Profile';
import Students from '../pages/Students/Students';
import NewStudent from '../pages/Students/NewStudent/NewStudent';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import StudentDetails from '../pages/Students/StudentDetails/StudentDetails';
import Parents from '../pages/Parents/Parents';
import Groups from '../pages/Groups/Groups';
import MainSideBar from './MainSideBar/MainSideBar';
import { Context } from '../../hooks/Store';
import { accents } from '../UIElements/Values';

const Layout = () => {
	const [state, dispatch] = useContext(Context);
	let token = JSON.parse(localStorage.getItem('authToken'));

	useEffect(() => {
		let token = JSON.parse(localStorage.getItem('schoolManColorAccent'));

		if (token)
			dispatch({type: 'SET_ACCENT', payload: token.accent});
		else
			dispatch({type: 'SET_ACCENT', payload: accents.light});
	}, []);

	return (
		<Router>
			{!token ? <Redirect to="/sign-in" /> : null}
			<div className={classes.Layout} 
			style={{backgroundColor: state.accent.secondary}} >
				{token ? <MainSideBar /> : null}
				{
					token ?
					<div className={classes.Main}  >
						<Route path="/profile" exact>
							<Profile />
						</Route>
						<Route path="/students" exact>
							<Students />
						</Route>
						<Route path="/groups" exact>
							<Groups />
						</Route>
						<Route path="/new-student" exact>
							<NewStudent />
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
	// }
}

export default Layout;