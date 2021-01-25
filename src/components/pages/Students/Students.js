import { MoreVert } from '@material-ui/icons';
import axios from 'axios';
import React, { Component, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import { Alert, BackDrop, FilterSelect } from '../../UIElements/UIElements';
import classes from './Students.module.scss';
import pp from '../../../assets/me.jpeg';

class Student extends Component {
	state = {
		action: false,
		parent: undefined
	}

	componentDidMount() {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
			axios.get('http://localhost:5000/parents/' + this.props.student.parentId, {
				headers: {
					'Test-Header': 'test-value',
					'authToken': token.token.authToken,
					'userType': token.token.userType
				}
			})
			.then(res => this.setState({parent: res.data}))
			.catch(err => console.error(err.message))
		}
	}

	render () {
		return (
			<tr>
				<td>#{this.props.student.sid}</td>
				<td className={classes.StudentImage} style={{backgroundImage: `url(${pp})`}} ></td>
				<td>{this.props.student.nid}</td>
				<td>{this.props.student.username}</td>
				<td>{this.props.student.lastName} {this.props.student.firstName}</td>
				<td>{this.props.student.email}</td>
				<td>{this.props.student.gender}</td>
				<td>{this.props.student.startYear}</td>
				<td>{this.state.parent && 
					this.state.parent.firstName + ' ' + this.state.parent.lastName}</td>
				<td>SM</td>
				<td>SM1</td>
				<td onClick={() => this.setState({action : !this.state.action})} className={classes.OptionToggle} >
					<MoreVert />
					{ this.state.action  ? <BackDrop onClick={() => this.setState({action : !this.state.action})} /> : null }
					{
					this.state.action ? 
					<div className={classes.Actions} >
						<Link className={classes.Action} 
						to={{pathname: `student-details/student=${this.props.student._id}`}}
						>View details</Link>
						<div className={[classes.Action, classes.DeleteAction].join(' ')} onClick={() => this.props.deleteStudent(this.props.student._id)} >Delete</div>
					</div>
					: null
					}
				</td>
			</tr>
		)
	}
}

class Students extends Component {
	state = {
		students: [],
		action: 0,
		searchQuery: '',
		classArray: [
			{value: 'SM', name: 'SM'},
			{value: 'PC', name: 'PC'},
			{value: 'SVT', name: 'SVT'}
		],
		groupArray: [
			{value: 'SM1', name: 'SM1'},
			{value: 'SM2', name: 'SM2'},
			{value: 'SM3', name: 'SM3'},
			{value: 'SM4', name: 'SM4'},
			{value: 'PC1', name: 'PC1'},
			{value: 'PC2', name: 'PC2'},
			{value: 'PC3', name: 'PC3'},
			{value: 'SVT1', name: 'SVT1'},
			{value: 'SVT2', name: 'SVT2'}
		]
	}

	getStudents = () => {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
			axios.get('http://localhost:5000/students', {
				headers: {
					'Test-Header': 'test-value',
					'authToken': token.token.authToken,
					'userType': token.token.userType
				}
			})
			.then(res => this.setState({students: res.data}))
			.catch(err => console.error(err.message));
		}
	}
	
	componentDidMount() {
		this.getStudents();
	}
	
	componentDidUpdate() {
		this.getStudents();
	}

	deleteStudent = (id) => {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
			axios.delete('http://localhost:5000/students/' + id, {
				headers: {
					'Test-Header': 'test-value',
					'authToken': token.token.authToken,
					'userType': token.token.userType
				}
			})
			.then(res => console.log('deleted successfuly ' + res.data))
			.catch(err => console.error(err.message));
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
			<div className={classes.Students}>
				<div className={classes.StudentsTitle} >
					<h4>Students list</h4>
					<Link className={classes.StudentsNewStudent} to='/new-student'>Add new Student</Link>
				</div>
				<div className={classes.StudentsList} >
					<h4>All students</h4>
					<div className={classes.Filters} >
						<FilterSelect itemArray={this.state.classArray} msg='class' />
						<FilterSelect itemArray={this.state.groupArray} msg='group' />
						<input type="text" placeholder="Search by name" onChange={(e) => this.setState({searchQuery: e.target.value})}/>
						<button>Search</button>
					</div>
					<table className="table">
						<thead>
							<th scope="col">Sid</th>
							<th scope="col"></th>
							<th scope="col">Nid</th>
							<th scope="col">Username</th>
							<th scope="col">Full name</th>
							<th scope="col">Email</th>
							<th scope="col">Gender</th>
							<th scope="col">Start year</th>
							<th scope="col">Parent</th>
							<th scope="col">Class</th>
							<th scope="col">Group</th>
							<th scope="col"></th>
						</thead>
						<tbody>
							{
							this.state.students && this.state.students.map((student, key) => (

								student.firstName.includes(this.state.searchQuery)
							|| student.lastName.includes(this.state.searchQuery)
							|| student.username.includes(this.state.searchQuery) ?
								<Student key={key} 
								deleteStudent={this.deleteStudent}
								student={student} />
								: null
							))
							}
							{/* {
							this.state.students && this.state.students.map((student, key) => (
								<Student key={key} 
								student={student} 
								/>
							))
							}
							{
							this.state.students && this.state.students.map((student, key) => (
								<Student key={key} 
								student={student} />
							))
							}
							{
							this.state.students && this.state.students.map((student, key) => (
								<Student key={key} 
								student={student} />
							))
							} */}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default Students;