import classes from './Signin.module.scss';
import React, {Component, useState} from 'react';
import { Alert } from '../../UIElements/UIElements';
import axios from 'axios';

class Signin extends Component {
	state = {
		username: '',
		password: '',
		loginSuccess: 0,
	};

	onSubmit = (e) => {
		e.preventDefault();
		const user = {
			username: this.state.username,
			password: this.state.password,
		}

		console.log(user);

		axios.post('http://localhost:5000/users/signin', user, {
			headers: {
				'action': 'signin'
			}
		})
		.then(res => {
			if (res.status === 200) {
				localStorage.setItem('authToken', JSON.stringify({
					login: true,
					token: res.data
				}));
				this.setState({loginSuccess: 1});
				// props.setusername(res.data.username);
				window.location = '/sign-in';
			}
		})
		.catch (err => {
			this.setState({loginSuccess: 2})
		})
	}

	render () {

		return (
			<div className={classes.Signin} >
				<h2>Sign-in</h2>
				{
				this.state.loginSuccess === 1 ?
					<Alert 
					onClick={() => this.this.setState({loginSuccess: 0})} 
					alert="success" >Signing-in successfuly</Alert>
				: this.state.loginSuccess === 2 ?
					<Alert 
						onClick={() => this.setState({loginSuccess: 0})} 
						alert="fail" >Signing-in faild</Alert>
				: this.state.loginSuccess === 3 ?
					<Alert 
						onClick={() => this.setState({loginSuccess: 0})} 
						alert="warning" >Internal error please try again</Alert>
				: null
				}
				<form className={classes.SigninForm} onSubmit={this.onSubmit} >
					<label>Usernamne</label>
					<input type="text" placeholder="Username" 
						onChange={(e) => {this.setState({username: e.target.value})}} 
						required />
					<label>
						<p>Password</p>
						<p className={classes.ForgotPW} >Forgot your password?</p>
					</label>
					<input type="password" placeholder="Password" 
						onChange={(e) => {this.setState({password: e.target.value})}} 
						required />
					<input type="submit" value="Sign-in" />
				</form>
				<Alert alert="warning" >If you dont have an account, reach out to one of the staff members</Alert>
			</div>
		)
	}
}

export default Signin;
