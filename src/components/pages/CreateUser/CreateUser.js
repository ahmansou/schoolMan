import React, { useEffect, useState } from 'react';
import classes from './CreateUser.module.scss';
import Aux from '../../../hoc/Aux';
import axios from 'axios';

const GetStudents = (props) => {

	const [state, setState] = useState({
		students: [],
	});

	const getStudents = async () => {
		try {
			const res = await axios.get('http://localhost:5000/students');
			setState({...state, students: res.data})
		}
		catch(err) {console.error(err.message)}
	}

	useEffect(() => {
		getStudents();
	}, []);

	return (
		<Aux>
		{
		props.edit === true ?
			<select className="form-control" required
				value={props.userId}
				onChange={(e) => {props.setState({...props.state, userId: e.target.value})}} >
				{
					state.students && state.students.map((student, key) => (
						<option key={key} value={student._id} > {student.firstName} {student.lastName} </option>
					))
				}
			</select>
		:
			<select className="form-control" required
				onChange={(e) => {props.setState({...props.state, userId: e.target.value})}} >
				{
					state.students && state.students.map((student, key) => (
						<option key={key} value={student._id} > {student.firstName} {student.lastName} </option>
					))
				}
			</select>
		}
		</Aux>
	)
}

const GetParents = (props) => {

	const [state, setState] = useState({
		parents: [],
	});

	const getParents = async () => {
		try {
			const res = await axios.get('http://localhost:5000/parents');
			setState({...state, parents: res.data})
		}
		catch(err) {console.error(err.message)}
	}

	useEffect(() => {
		getParents();
	}, []);

	return (
		<Aux>
		{
		props.edit === true ?
			<select className="form-control" required 
				onChange={(e) => {props.setState({...props.state, userId: e.target.value})}} >
				{
					state.parents && state.parents.map((parent, key) => (
						<option key={key} value={parent._id} > {parent.firstName} {parent.lastName} </option>
					))
				}
			</select>
		:
			<select className="form-control" required 
				value={props.userId}
				onChange={(e) => {props.setState({...props.state, userId: e.target.value})}} >
				{
					state.parents && state.parents.map((parent, key) => (
						<option key={key} value={parent._id} > {parent.firstName} {parent.lastName} </option>
					))
				}
			</select>
		}
		</Aux>
	)
}

const EditUser = (props) => {

	const [state, setState] = useState({
		username: props.user.username,
		password: props.user.password,
		userType: props.user.userType,
		userId: props.user.userId,
	});

	const EditUsr = (id) => {
		const user = {
			username: state.username,
			password: props.user.password,
			userType: state.userType,
			userId: state.userId,
		}
		axios.post('http://localhost:5000/users/update/' + id, user)
			.then(res => props.getUsers());
		props.setAction(0);
	}

	return (
		<Aux>
			<th scope="row">{props.user._id}</th>
			<td>
				<input className="form-control" type="text" value={state.username} required maxLength='8' minLength='8'
					onChange={(e) => {setState({...state, username: e.target.value})}} />
			</td>
			<td>
				<select className="form-control" required value={state.userType}
					onChange={(e) => {setState({...state, userType: e.target.value})}} >
					<option value={0} >Admin</option>
					<option value={1} >Staff</option>
					<option value={2} >Teacher</option>
					<option value={3} >Student</option>
					<option value={4} >Parent</option>
				</select>
			</td>
			<td>
			{
			state.userType === 3 ?
				<GetStudents state={state} setState={setState} edit={true} userId={props.user.userId} />
			: state.userType === 4 ?
				<GetParents state={state} setState={setState} edit={true}  userId={props.user.userId} />
			: null
			}
			</td>
			<td className={classes.Actions} >
				<button 
					type="button"
					onClick={() => EditUsr(props.user._id)}
					className="btn btn-success" >Save</button>
				<button 
					type="button"
					onClick={() => props.setAction(0)}
					className="btn btn-warning" >Cancel</button>
			</td>
		</Aux>
	)

}

const User = (props) => {
	const [action, setAction] = useState(0);

	const showUserType = (userType) => {
		switch(userType) {
			case 0 : return 'Admin [0]';
			case 1 : return 'Staff [1]';
			case 2 : return 'Teacher [2]';
			case 3 : return 'Student [3]';
			case 4 : return 'Parent [4]';
			default: return 'N/A'
		}
	}

	return (
		<tr >
			{
			action === 0 || action === 2 ?
			<Aux>
				<th scope="row">{props.user._id}</th>
				<td>{props.user.username}</td>
				<td>{showUserType(props.user.userType)}</td>
				<td>{props.user.userId}</td>
				<td className={classes.Actions} >
					{
						action === 0 ?
						<Aux>
							<button 
								type="button"
								onClick={() => setAction(1)}
								className="btn btn-warning" >Edit</button>
							<button 
								type="button"
								onClick={() => setAction(2)}
								className="btn btn-danger" >Delete</button>
						</Aux>
						: action === 2 ?
						<Aux>
							<button 
								type="button"
								onClick={() => props.deleteUser(props.user._id)}
								className="btn btn-danger" >Delete</button>
							<button 
								type="button"
								onClick={() => setAction(0)}
								className="btn btn-success" >Cancel</button>
						</Aux>
						: null
					}
				</td>
			</Aux>
			:
			action === 1 ? <EditUser getUsers={props.getUsers} setAction={setAction} user={props.user} />
			: null
			}
		</tr>
	)
}

const CreateUser = () => {
	const [state, setState] = useState({
		username: '',
		password: '',
		userType: 0,
		userId: 'undefined',
		users: [],
		action: 0
	});

	const getUsers = async () => {
		try {
			const usersG = await axios.get('http://localhost:5000/users')
			setState({...state, users: usersG.data});
		}
		catch (err) {
			console.error(err.message);
		}
	}

	const onSubmit = (e) => {
		e.preventDefault();
		const user = {
			username: state.username,
			password: state.password,
			userType: state.userType,
			userId: state.userId,
		}

		console.log(user);

		axios.post('http://localhost:5000/users/add', user)
			.then(res => getUsers());
			// .then(res => console.log(res.data));


		// setState({...state, username: ''});
		getUsers();
	}

	const deleteUser = (id) => {
		axios.delete('http://localhost:5000/users/' + id)
			.then(res => console.log('deleted successfuly ' + res.data));
		setState({...state, users: state.users.filter(user => user._id !== id)})
	}

	useEffect(() => {
		getUsers();
	}, []);


	console.log(state.users);
	
	return (
	  <div>
		<h2>Create User</h2>
		<form onSubmit={onSubmit} >
			<div className="form-group">
				<label className="form-label" >username:</label> 
				<input className="form-control" type="text" value={state.username} required maxLength='8' minLength='8'
					onChange={(e) => {setState({...state, username: e.target.value})}} />
			</div>
			<div className="form-group">
				<label className="form-label" >password:</label> 
				<input className="form-control" type="password" value={state.password} required minLength='8'
					onChange={(e) => {setState({...state, password: e.target.value})}} />
			</div>
			<div className="form-group">
				<label className="form-label" >username:</label> 
					<select className="form-control" required 
						onChange={(e) => {setState({...state, userType: e.target.value})}} >
						<option value={0} >Admin</option>
						<option value={1} >Staff</option>
						<option value={2} >Teacher</option>
						<option value={3} >Student</option>
						<option value={4} >Parent</option>
					</select>
			</div>
			<div className="form-group">
				<label className="form-label" >UserID:</label> 
				<p>{state.userId}</p>
				{
					state.userType === "3" ?
					<GetStudents state={state} setState={setState} edit={false} />
					: state.userType === "4" ?
					<GetParents state={state} setState={setState} edit={false} />
					: null
				}
			</div>
			<div className="form-group">
				<input type="submit" value="create new user" className="btn btn-primary" />
			</div>
		</form>
		<table className="table">
			<thead>
				<tr>
				<th scope="col">_id</th>
				<th scope="col">username</th>
				<th scope="col">user type</th>
				<th scope="col">userId</th>
				<th scope="col">actions</th>
				</tr>
			</thead>
  			<tbody>
			{
				state.users && state.users.map((user, key) => (
					<User getUsers={getUsers} key={key} user={user} deleteUser={deleteUser} />
				))
			}
  			</tbody>
		</table>
	  </div>
	);
}

export default CreateUser;