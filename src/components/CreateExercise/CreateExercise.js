import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 
import axios from 'axios';

const CreateExercise = () => {
	const [state, setState] = useState({
		username: '',
		description: '',
		duration: 0,
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
	},[])

	console.log(state.users);

	const onSubmit = (e) => {
		e.preventDefault();
		const exercise = {
			username: state.username,
			description: state.description,
			duration: state.duration,
			date: state.date
		}

		console.log(exercise);
		
		axios.post('http://localhost:5000/exercises/add', exercise)
		.then(res => console.log(res.data));
		
		window.location = '/create';
		setState({...state, 
			username: 'test',
			description: '',
			duration: 0,})
	}

	return (
	  <div>
		<h2>Create Exercise</h2>
		<form onSubmit={onSubmit} >
			<div className="form-group">
				<label className="form-label" >username:</label> 
				<select className="form-control" type="text" 
					onChange={(e) => {setState({...state, username: e.target.value})}}
					value={state.username} >
				{state.users && state.users.map((user, key) => (
					<option key={key} value={user}>{user}</option>
				))}
				</select>
			</div>
			<div className="form-group">
				<label className="form-label" >description:</label> 
				<input className="form-control" type="text" 
					onChange={(e) => {setState({...state, description: e.target.value})}} />
			</div>
			<div className="form-group">
				<label className="form-label" >duration:</label> 
				<input className="form-control" type="number" 
					onChange={(e) => {setState({...state, duration: e.target.value})}} />
			</div>
			<div className="form-group">
				<label className="form-label" >date:</label> 
				<DatePicker className="form-control" selected={state.date} 
					onChange={date => {setState({...state, date: date})}} />
			</div>
			<div className="form-group">
				<input type="submit" value="create new exercise" className="btn btn-primary" />
			</div>
		</form>
	  </div>
	);
}

export default CreateExercise;