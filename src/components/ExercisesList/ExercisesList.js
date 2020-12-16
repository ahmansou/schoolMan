import classes from './ExercisesList.module.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Aux from '../../hoc/Aux';

const EditExercise = (props) => {
	const [state, setState] = useState({
		username: props.ex.username,
		description: props.ex.description,
		duration: props.ex.duration,
		date: new Date(),
		users: [],
	});

	const getUsers = async () => {
		try {
			const res = await axios.get('http://localhost:5000/users')
			setState({...state, users: res.data.map(user => user.username), username: res.data[0].username,});
		}
		catch (err) {
			console.error(err.message);
		}
	}

	useEffect(()=>{
		getUsers();
	},[]);


	const EditEx = (id) => {
		const exercise = {
			username: state.username,
			description: state.description,
			duration: state.duration,
			date: state.date
		}
		axios.post('http://localhost:5000/exercises/update/' + id, exercise)
			.then(res => console.log('updated successfuly ' + res.data));
		props.setAction();
		// window.location = '/';
	}

	return (
		<Aux>
			<td>
				<div className="form-group">
					<select className="form-control" type="text" 
						onChange={(e) => {setState({...state, username: e.target.value})}}
						value={state.username} >
						{state.users && state.users.map((user, key) => (
							<option key={key} value={user}>{user}</option>
						))}
					</select>
				</div>
			</td>
			<td>
				<div className="form-group">
					<input className="form-control" type="text"
						value={state.description}
						onChange={(e) => {setState({...state, description: e.target.value})}} />
				</div>
			</td>
			<td>
				<div className="form-group">
					<input className="form-control" type="number" 
						value={state.duration}
						onChange={(e) => {setState({...state, duration: e.target.value})}} />
				</div>
			</td>
			<td>
				<div className="form-group">
					<DatePicker className="form-control" selected={state.date} 
						onChange={date => {setState({...state, date: date})}} />
				</div>
			</td>
			<td className={classes.Actions} >
					<button 
						type="button"
						onClick={() => EditEx(props.ex._id)} 
						className="btn btn-success" >Save</button>
					<button 
						type="button"
						onClick={() => props.setAction(!props.action)}
						className="btn btn-danger" >Cancel</button>
				</td>
		</Aux>
	)
}

const Exercise = (props) => {
	const [action, setAction] = useState(false);

	return (
		<Aux>
			<tr>
				<th scope="row">{props.ex._id}</th>
				{	
				action === true ?
				<EditExercise ex={props.ex} setAction={setAction} action={action} />
				:
				<Aux>
					<td>{props.ex.username}</td>
					<td>{props.ex.description}</td>
					<td>{props.ex.duration}</td>
					<td>{props.ex.date}</td>
					<td className={classes.Actions} >
						<button 
							type="button"
							onClick={() => setAction(!action)}
							className="btn btn-warning" >Edit</button>
						<button 
							type="button"
							onClick={() => props.deleteEx(props.ex._id)} 
							className="btn btn-danger" >Delete</button>
					</td>
				</Aux>
				}
			</tr>
		</Aux>
	)
}

const ExercisesList = () => {

	const [state, setState] = useState({
		exercises: []
	})

	const getUsers = async () => {
		try {
			const usersG = await axios.get('http://localhost:5000/exercises')
			setState({...state, exercises: usersG.data});
		}
		catch (err) {
			console.error(err.message);
		}
	}

	const deleteEx = (id) => {
		axios.delete('http://localhost:5000/exercises/' + id)
			.then(res => console.log('deleted successfuly ' + res.data));
		setState({...state, exercises: state.exercises.filter(el => el._id !== id)})
	}

	useEffect(()=>{
		getUsers()
	},[])

	return (
	  <div className={classes.ExercisesList}>
		<h2>Exercises List</h2>
		<table className="table">
			<thead>
				<tr>
				<th scope="col">_id</th>
				<th scope="col">username</th>
				<th scope="col">description</th>
				<th scope="col">duration</th>
				<th scope="col">date</th>
				<th scope="col">actions</th>
				</tr>
			</thead>
  			<tbody>
			{
				state.exercises && state.exercises.map((ex, key) => (
					<Exercise key={key} ex={ex} deleteEx={deleteEx} />
				))
			}
  			</tbody>
		</table>
	  </div>
	);
}

export default ExercisesList;