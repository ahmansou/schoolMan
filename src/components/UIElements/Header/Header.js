import React, { Component } from 'react';
import axios from 'axios';
import classes from './Header.module.scss';
import { Link } from 'react-router-dom';
import Aux from '../../../hoc/Aux';

import { 
	NotificationsNoneOutlined, 
	ChatOutlined, 
	AccountCircleOutlined,
	ExitToAppOutlined,
	Assignment,
	Settings,
 } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { BackDrop } from '../UIElements';

class Header extends Component {
	state = {
		profileDrop: false,
		user: undefined,
		student: undefined,
		staff: undefined
	}

	signout = () => {
		localStorage.removeItem('authToken');
		window.location = '/sign-in';
	}
	
	toggleProfileDrop = () => {
		this.setState({profileDrop: !this.state.profileDrop});
	}

	componentDidMount() {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
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

		let dropCls = [classes.ProfileDrop];
		if (this.state.profileDrop)
			dropCls.push(classes.ProfileDropOpen);
		else
			dropCls.push(classes.ProfileDropClosed);
		return (
			<div className={classes.Header}>
				<div className={classes.Icons} >
					<Badge badgeContent={4} color="secondary">
						<NotificationsNoneOutlined />
					</Badge>
				</div>
				<div className={classes.Icons} >
					<Badge badgeContent={100} color="secondary">
						<ChatOutlined />
					</Badge>
				</div>
				<div className={classes.Icons} onClick={this.toggleProfileDrop} >
						<AccountCircleOutlined />
				</div>
				<div className={[classes.Icons, classes.UserSection].join(' ')} onClick={this.toggleProfileDrop} >
					<p>
						{this.state.staff && this.state.staff.firstName + ' ' + this.state.staff.lastName}
						{this.state.student && this.state.student.firstName + ' ' + this.state.student.lastName}
					</p>
					<p>{token && token.token.username}</p>
				</div>
				<Aux>
					{token && this.state.profileDrop ? 
						<BackDrop onClick={this.toggleProfileDrop} />
					: null}
					<div className={dropCls.join(' ')} >
						<div className={classes.User} >
							{this.state.staff && this.state.staff.firstName + ' ' + this.state.staff.lastName}
							{this.state.student && this.state.student.firstName + ' ' + this.state.student.lastName}
						</div>
						<Link to="profile" className={classes.ProfileDropAction} >
							<AccountCircleOutlined />
							My profile
						</Link>
						<Link to="tasks" className={classes.ProfileDropAction} >
							<Assignment />
							Tasks
						</Link>
						<Link to="account" className={classes.ProfileDropAction} >
							<Settings />
							Account Settings
						</Link>
						<div className={classes.ProfileDropAction} onClick={this.signout} >
							<ExitToAppOutlined />
							Sign-out
						</div>
					</div> 

				</Aux>
			</div>
		)
	}
}

export default Header;