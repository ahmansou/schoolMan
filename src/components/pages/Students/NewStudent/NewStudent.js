import { Component } from 'react';
import { FormInput, ParentSelect } from '../../../UIElements/UIElements';
import classes from './NewStudent.module.scss';
import axios from 'axios';
import { classArray, gender, groupArray } from '../../../UIElements/Values';

class NewStudent extends Component {
	state = {
		parents: [],
		classes: [],
		groups: [],
		nid: '',
		sid: '',
		username: '',
		firstName: '',
		lastName: '',
		dateOfBirth: new Date(),
		startYear: 0,
		gender: '',
		address: '',
		numTel: 0,
		email: '',
		parentId: '',
		groupId: 'testID',
		classId: 'testID'
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

	componentDidMount() {
		this.getParents();
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
			
			axios.post('http://localhost:5000/students/add', student, {
				headers: {
					'Test-Header': 'test-value',
					'authToken': token.token.authToken,
					'userType': token.token.userType
				}
			})
			// .then(res => this.getStudents());
		}
	}

	render() {

		return (
			<div className={classes.NewStudent} >
				<div className={classes.NewStudentTitle} >
					<h4>Add a new student</h4>
				</div>
				<form className={classes.NewStudentForm} onSubmit={this.onSubmit} >
					<div className={classes.Grid} >
						<FormInput type='text' label='Student ID' required={true}
							onChange={(e) => this.setState({sid: e.target.value})} />

						<FormInput type='text' label='National ID' required={true}
							onChange={(e) => this.setState({nid: e.target.value})}  />

						<FormInput type='text' label='Username' required={true}
							onChange={(e) => this.setState({username: e.target.value})} />

						<FormInput type='email' label='E-mail Address' required={true}
							onChange={(e) => this.setState({email: e.target.value})}  />

						<FormInput type='text' label='First name' required={true}
							onChange={(e) => this.setState({firstName: e.target.value})}  />

						<FormInput type='text' label='Last name' required={true}
							onChange={(e) => this.setState({lastName: e.target.value})}  />

						<FormInput type='text' label='Gender' required={true}
							isSelect={true} coll={gender}
							onChange={(e) => this.setState({gender: e.target.value})}  />
							{/* {console.log(this.state.gender)} */}

						<FormInput type='number' label='Phone' required={true}
							onChange={(e) => this.setState({numTel: e.target.value})}  />

							<FormInput type='text' label='Address' required={true}
								onChange={(e) => this.setState({address: e.target.value})}  />

						<FormInput type='date' label='Date of birth' required={true}
							onChange={(e) => this.setState({dateOfBirth: Date(e.target.value)})}  />

						<FormInput type='number' label='Starting year' required={true}
							onChange={(e) => this.setState({startYear: e.target.value})}  />
						{/* {console.log(this.state.dateOfBirth)} */}

						<FormInput type='text' label='Class' required={true}
							isSelect={true} coll={classArray}
							onChange={(e) => this.setState({classId: e.target.value})}  />
							{/* {console.log(this.state.classId)} */}

						<FormInput type='text' label='Group' required={true}
							isSelect={true} coll={groupArray}
							onChange={(e) => this.setState({groupId: e.target.value})}  />
							{/* {console.log(this.state.groupId)} */}

						<ParentSelect type='text' label='Parent' required={true}
							isSelect={true} coll={this.state.parents}
							onChange={(e) => this.setState({parentId: e.target.value})}  />
							{/* {console.log(this.state.parentId)} */}
					</div>
					<input type='submit' value='Save' />
				</form>
			</div>
		)
	}
}

export default NewStudent;