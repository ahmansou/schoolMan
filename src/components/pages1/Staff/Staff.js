import React, { Component, useState } from 'react';
import axios from 'axios';
import classes from '../Parents/Parents.module.scss';
import Aux from '../../../hoc/Aux';

const Staff = (props) => {
	const [action, setAction] = useState(0);

	return (
		<Aux>
			<tr>
				<th scope="row" >{props.staff.staffId}</th>
				<td>{props.staff.username}</td>
				<td>{props.staff.firstName}</td>
				<td>{props.staff.lastName}</td>
				<td>{props.staff.role}</td>
				<td className={classes.Actions} >
				{
					action !== 3 ?
					<Aux>
						<button 
							type="button"
							onClick={() => setAction(1)}
							className="btn btn-success" >Other details</button>
						<button 
							type="button"
							onClick={() => setAction(3)}
							className="btn btn-danger" >Delete</button>
					</Aux>
					: action === 3 ?
					<Aux>
						<button 
							type="button"
							onClick={() => setAction(0)}
							className="btn btn-success" >Cancel</button>
						<button 
							type="button"
							onClick={() => props.deleteStaff(props.staff._id)} 
							className="btn btn-danger" >Delete</button>
					</Aux>
					: null
				}
				</td>
			</tr>
		</Aux>
	)
}

class Staffs extends Component {
	state = {
		staffs: []
	}

	componentDidMount() {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
			axios.get('http://localhost:5000/staff', {
				headers: {
					'authToken': token.token.authToken,
					'userType': token.token.userType
				}
			})		
				.then(res => {
					console.log(res.data);
					this.setState({staffs: res.data})
				})
				.catch(err => console.error(err.message));
			console.log(this.state.staffs);
		}
	}
	
	staffList = () => {
		return this.state.staffs && this.state.staffs.map((staff, key) => {
			return <Staff deleteStaff={this.deleteStaff} key={key} staff={staff} />
		})
	}

	deleteStaff = (id) => {
		let token = JSON.parse(localStorage.getItem('authToken'));
		axios.delete('http://localhost:5000/staff/' + id, {
			headers: {
				'authToken': token.token.authToken,
				'userType': token.token.userType
			}
		})
		.then(res => console.log('deleted successfuly ' + res.data))
		.catch(err => console.error(err.message));
		this.setState({staffs: this.state.staffs.filter(el => el._id !== id)})
	}
	
	render() {
		let token = JSON.parse(localStorage.getItem('authToken'));

		if (!token || token.token.userType !== 0)
			return (
				<div className={classes.Parents} >
					<br/>
					<div className="alert alert-danger" role="alert">
						Unauthorized Access : Access Denied
					</div>
				</div>
			);
		return (
			<div>
				<h1>Staffs</h1>
				<table className="table">
					<thead>
						<tr>
						<th scope="col">staffId</th>
						<th scope="col">username</th>
						<th scope="col">first name</th>
						<th scope="col">last name</th>
						<th scope="col">role</th>
						<th scope="col">actions</th>
						</tr>
					</thead>
					<tbody>
						{this.staffList()}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Staffs;