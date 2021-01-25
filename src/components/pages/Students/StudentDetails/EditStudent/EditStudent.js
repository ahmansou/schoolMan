import classes from './EditStudent.module.scss';
import { Component } from 'react';
import { Alert, DateParser, FormInput, ParentSelect } from '../../../../UIElements/UIElements';
import axios from 'axios';
import { classArray, gender, groupArray } from '../../../../UIElements/Values';

class EditStudent extends Component {
	state = {
		parents: [],
		classes: [],
		groups: [],
		nid: this.props.student.nid,
		sid: this.props.student.sid,
		username: this.props.student.username,
		firstName: this.props.student.firstName,
		lastName: this.props.student.lastName,
		dateOfBirth: this.props.student.dateOfBirth,
		startYear: this.props.student.startYear,
		gender: this.props.student.gender,
		address: this.props.student.address,
		numTel: this.props.student.numTel,
		email: this.props.student.email,
		parentId: this.props.student.parentId,
		groupId: this.props.student.groupId,
		classId: this.props.student.classId,
		edited: false,
		error: false,
		errmsg: ''
	}

	getParents = () => {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
			axios.get('http://localhost:5000/parents', {
				headers: {
					'Test-Header': 'test-value',
					'authToken': token.token.authToken,
					'userType': token.token.userType
				}
			})
			.then(res => this.setState({parents: res.data}))
			.catch(err => console.error(err.message));
		}
	}

	getGroups = () => {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
			axios.get('http://localhost:5000/group/', {
				headers: {
					'Test-Header': 'test-value',
					'authToken': token.token.authToken,
					'userType': token.token.userType
				}
			})
			.then(res => this.setState({groups: res.data}))
			.catch(err => console.error(err.message));
		}
	}

	componentDidMount() {
		this.getParents();
		this.getGroups();
	}

	onSubmit = (e) => {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
			e.preventDefault();
			const student = {
				nid: this.state.nid,
				sid: this.state.sid,
				username: this.state.username,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				dateOfBirth: this.state.dateOfBirth,
				startYear: this.state.startYear,
				gender: this.state.gender,
				address: this.state.address,
				numTel: this.state.numTel,
				email: this.state.email,
				parentId: this.state.parentId,
				groupId: this.state.groupId,
				classId: this.state.classId
			}

			console.log(student);
			
			axios.post('http://localhost:5000/students/update/' + this.props.student._id, student, {
				headers: {
					'Test-Header': 'test-value',
					'authToken': token.token.authToken,
					'userType': token.token.userType
				}
			})
			.then(res => this.setState({edited: true}))
			.catch(err => this.setState({error: true, errmsg: err}));
		}
	}

	render () {
		let student = this.props.student;
		let parent = this.props.parent;

		return (
			<form className={classes.NewStudentForm} onSubmit={this.onSubmit} >
				{
				this.state.edited ? 
					<Alert alert='success' onClick={() => this.setState({edited: false})} >Student saved successfuly</Alert>
				: null
				}
				<div className={classes.Grid} >
					<FormInput type='text' label='Student ID' required={true}
						default={this.state.sid}
						onChange={(e) => this.setState({sid: e.target.value})} />

					<FormInput type='text' label='National ID' required={true}
						default={this.state.nid}
						onChange={(e) => this.setState({nid: e.target.value})}  />

					<FormInput type='text' label='Username' required={true}
						default={this.state.username}
						onChange={(e) => this.setState({username: e.target.value})} />

					<FormInput type='email' label='E-mail Address' required={true}
						default={this.state.email}
						onChange={(e) => this.setState({email: e.target.value})}  />

					<FormInput type='text' label='First name' required={true}
						default={this.state.firstName}
						onChange={(e) => this.setState({firstName: e.target.value})}  />

					<FormInput type='text' label='Last name' required={true}
						default={this.state.lastName}
						onChange={(e) => this.setState({lastName: e.target.value})}  />

					<FormInput type='text' label='Gender' required={true}
						default={this.state.gender === 'F' ? {value: 'F', name: 'Female'} : {value: 'M', name: 'Male'}}
						isSelect={true} coll={gender}
						onChange={(e) => this.setState({gender: e.target.value})}  />

					<FormInput type='number' label='Phone' required={true}
						default={this.state.numTel}
						onChange={(e) => this.setState({numTel: e.target.value})}  />

					<FormInput type='text' label='Address' required={true}
						default={this.state.address}
						onChange={(e) => this.setState({address: e.target.value})}  />

					<FormInput type='date' label='Date of birth ' required={true}
						default={DateParser(this.state.dateOfBirth)}
						onChange={(e) => this.setState({dateOfBirth: e.target.value})}  />

					<FormInput type='number' label='Starting year' required={true}
						default={this.state.startYear}
						onChange={(e) => this.setState({startYear: e.target.value})}  />

					<FormInput type='text' label='Class' required={true}
						isSelect={true} coll={classArray}
						default={{value: this.state.classId, name: this.state.classId}}
						onChange={(e) => this.setState({classId: e.target.value})}  />

					{
						console.log('groups: ', this.state.groups)
					}
					<FormInput type='text' label='Group' required={true}
						isSelect={true} coll={this.state.groups}
						default={{value: this.state.groupId, name: this.state.groupId}}
						onChange={(e) => this.setState({groupId: e.target.value})}  />

					<ParentSelect type='text' label='Parent' required={true}
						isSelect={true} coll={this.state.parents}
						default={parent}
						onChange={(e) => this.setState({parentId: e.target.value})}  />

					<input type='submit' value='Save' />
					<div className={classes.Cancel} onClick={this.props.cancel} >Cancel</div>
				</div>
				<div className={classes.Actions} >
				</div>
			</form>
		)
	}
}

export default EditStudent;
