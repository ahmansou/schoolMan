import classes from './Signin.module.scss';
import React, { useState } from 'react';
import axios from 'axios';

const Signin = (props) => {
	const [state, setState] = useState({
		username: '',
		password: '',
		loginSuccessful: 0,
		errmsg: ''
	});

	const onSubmit = (e) => {
		e.preventDefault();
		const user = {
			username: state.username,
			password: state.password,
		}

		console.log(user);

		axios.post('http://localhost:5000/users/signin', user)
		.then(res => {
			if (res.status === 200) {
				localStorage.setItem('authToken', JSON.stringify({
					login: true,
					token: res.data
				}))
				console.log(res.data);
				setState({...state, loginSuccessful: 1})
				props.history.push('/');
			}
		})
		.catch (err => {
			setState({...state, loginSuccessful: 2})
		}) 
		
	}

	return (
		<div className={classes.Signin} >
			<h2>Sign-in</h2>
			{/* <p>{state.username}</p>
			<p>{state.password}</p> */}
			{
				state.loginSuccessful === 1? 
				<div className="alert alert-success" role="alert">
					Signed-in successfuly
				</div>
				: state.loginSuccessful === 2? 
				<div className="alert alert-danger" role="alert">
					Signed-in failed
				</div>
				: state.loginSuccessful === 3? 
				<div className="alert alert-danger" role="alert">
					Internal error please try again
				</div>
				: null
			}
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label className="form-label" >username:</label> 
					<input className="form-control" type="text" required maxLength='8' minLength='8'
						placeholder="username"
						onChange={(e) => {setState({...state, username: e.target.value})}} 
						/>
				</div>
				<div className="form-group">
					<label className="form-label" >password:</label> 
					<input className="form-control" type="password" required minLength='8'
						placeholder="password"
						onChange={(e) => {setState({...state, password: e.target.value})}} 
						/>
				</div>
				<div className="form-group">
					<input type="submit" value="Sign-in" className="btn btn-primary" />
				</div>
			</form>
		</div>
	);
}

export default Signin;