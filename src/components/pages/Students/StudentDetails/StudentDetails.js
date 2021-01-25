import React, { Component } from 'react';
import axios from 'axios';
import classes from './StudentDetails.module.scss';
import { Link, useParams } from 'react-router-dom';
import { Alert, DateParser } from '../../../UIElements/UIElements';
import me from '../../../../assets/me.jpeg';
import Aux from '../../../../hoc/Aux';
import { CloudDownload, Delete, Edit, Print } from '@material-ui/icons';
import EditStudent from './EditStudent/EditStudent';

class StudentDetails extends Component {
	state = {
		studentId: undefined,
		student: undefined,
		parent: undefined,
		edit: false
	}

	componentDidMount() {
			const id = this.props.match.params.id;
			this.setState({studentId: id})
			let token = JSON.parse(localStorage.getItem('authToken'));
			if (token) {
				axios.get('http://localhost:5000/students/' + id, {
					headers: {
						'Test-Header': 'test-value',
						'authToken': token.token.authToken,
						'userType': token.token.userType
					}
				})
				.then((res) => {
					this.setState({student: res.data})
					axios.get('http://localhost:5000/parents/' + res.data.parentId, {
					headers: {
						'Test-Header': 'test-value',
						'authToken': token.token.authToken,
						'userType': token.token.userType
					}
					})
					.then(res => this.setState({parent: res.data}))
					.catch(err => console.error(err.message))
				})
				.catch(err => console.error(err.message))

			}
	}

	render () {
		let token = JSON.parse(localStorage.getItem('authToken'));

		if (!token || token.token.userType !== 0)
			return (
				<div className={classes.Students} >
					<Alert alert="fail" >Unauthorized Access : Access Denied</Alert>
				</div>
		);

		return (
			<div className={classes.StudentDetails} >
				<div className={classes.StudentsTitle} >
					<h4>Student's details</h4>
				</div>
				<div className={classes.StudentDetailsMain} >
					<div className={classes.StudentDetailsPicture} >
						{/* <img src={me} alt=''/>            */}
					</div>
					<div className={classes.StudentDetailsInfo} >
						<div className={classes.InfoHeader} >
							<h3>{this.state.student ? 
								this.state.student.lastName + ' ' + this.state.student.firstName
								:null}</h3>
							<div className={classes.InfoHeaderActions} >
								{!this.state.edit ? <div className={classes.InfoHeaderAction} onClick={() => this.setState({edit: true})} ><Edit /></div> : null}
								<Link className={classes.InfoHeaderAction} to='/'><Print /></Link>
								<Link className={classes.InfoHeaderAction} to='/'><CloudDownload /></Link>
								<Link className={[classes.InfoHeaderAction, classes.InfoHeaderDelete].join(' ')} to='/'><Delete /></Link>
							</div>
						</div>
					{
					this.state.student ?
					<div className={classes.MainInfo} >
						{
							!this.state.edit ?
							<Aux>
								<div>
									<p>Student ID:</p>
									<p>National ID:</p>
									<p>Username:</p>
									<p>Full name:</p>
									<p>Date of birth:</p>
									<p>Email:</p>
									<p>Phone Number:</p>
									<p>Gender:</p>
									<p>Address:</p>
									<p>Parent's name:</p>
									<p>Starting Year:</p>
									<p>Current Class:</p>
									<p>Current Group:</p>
								</div>
								<div className={classes.Info} >
									<p>#{this.state.student.sid}</p>
									<p>{this.state.student.nid}</p>
									<p>{this.state.student.username}</p>
									<p className={classes.FullName} >{this.state.student.lastName + ' ' + this.state.student.firstName}</p>
									<p>{DateParser(this.state.student.dateOfBirth)}</p>
									<p>{this.state.student.email}</p>
									<p>{this.state.student.numTel}</p>
									<p>{this.state.student.gender === 'M' ? 'Male' : 'Female'}</p>
									<p>{this.state.student.address}</p>
									<p className={classes.FullName} >{this.state.parent && this.state.parent.lastName + ' ' + this.state.parent.firstName}</p>
									<p>{this.state.student.startYear}</p>
									<p>{this.state.student.classId}</p>
									<p>{this.state.student.groupId}</p>
								</div>

							</Aux>
							:
							<EditStudent 
								student={this.state.student} 
								parent={this.state.parent}
								cancel={() => this.setState({edit: false})}
							/>
						}

					</div>
					: null
					}
					</div>
					
				</div>
			</div>
		)
	}
}

export default StudentDetails;