import React, { Component } from 'react';
import axios from 'axios';


class Profile extends Component {
	state = {
		user: undefined,
		student: undefined,
		staff: undefined
	}

	componentDidMount() {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
			console.log("_id ", token.token._id);
			axios.get('http://localhost:5000/users/' + token.token._id, {
				headers: {
					'authToken': token.token.authToken,
					'userType': token.token.userType,
					'action': 'profile'
				}})
				.then(res => {
					this.setState({user: res.data});
					console.log('user : ', res.data);
					if (token.token.userType === 3)
					{
						axios.get('http://localhost:5000/students/' + res.data.userId, {
							headers: {
								'authToken': token.token.authToken,
								'userType': token.token.userType,
								'action': 'profile'
							}})
						.then(res => {
							this.setState({student: res.data});
						})
						.catch (err => console.error(err.message))
					}
					else if (token.token.userType === 0 || token.token.userType === 1)
					{
						axios.get('http://localhost:5000/staff/' + res.data.userId, {
							headers: {
								'authToken': token.token.authToken,
								'userType': token.token.userType,
								'action': 'profile'
							}})
						.then(res => {
							this.setState({staff: res.data});
						})
						.catch (err => console.error(err.message))
					}
				})
				.catch (err => console.error(err.message))
		}
	}
	
	render () {
		let token = JSON.parse(localStorage.getItem('authToken'));
	
		if (!token)
			return (
				<div>
					<br/>
					<div className="alert alert-danger" role="alert">
						Unauthorized Access : You're not logged in
					</div>
				</div>
			);
			
		return (
			<div>
			<h1>My profile</h1>
			<p> {token.token._id} </p>
			{/* <p> {this.state.user.userType} </p> */}
			{this.state.user && this.state.user.userType === 3 ? 
				<p>{this.state.student && this.state.student.username}</p>
			: this.state.user && (this.state.user.userType === 0 || this.state.user.userType === 1) ? 
				<p>{this.state.staff && this.state.staff.username}</p>
			 : null}
		</div>
		)
	}
}

export default Profile;