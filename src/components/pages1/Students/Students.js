import React, { useEffect, useState } from 'react';
import classes from './Students.module.scss';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Aux from '../../../hoc/Aux';

const AddStudent = (props) => {
	const [state, setState] = useState({
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
		groupId: 'state.groupId',
		classId: 'state.classId'
	});

	const [parents, setParent] = useState();

	const getParents = async () => {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
			try {
				const res = await axios.get('http://localhost:5000/parents', {
					headers: {
						'Test-Header': 'test-value',
						'authToken': token.token.authToken,
						'userType': token.token.userType
					}
				})
				// setState({...state, parents: res.data})
				setParent(res.data);
			}
			catch(err) {console.error(err.message)}
		}
	}

	useEffect(() => {
		getParents();
	}, []);

	const onSubmit = (e) => {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
			e.preventDefault();
			const student = {
				nid: state.nid,
				sid: state.sid,
				username: state.username,
				firstName: state.firstName,
				lastName: state.lastName,
				dateOfBirth: state.dateOfBirth,
				startYear: state.startYear,
				gender: state.gender,
				address: state.address,
				numTel: state.numTel,
				email: state.email,
				parentId: state.parentId,
				groupId: state.groupId,
				classId: state.classId
			}

			console.log(student);
			
			axios.post('http://localhost:5000/students/add', student, {
				headers: {
					'Test-Header': 'test-value',
					'authToken': token.token.authToken,
					'userType': token.token.userType
				}
			})
			.then(res => props.getStudents());
		}
	}

	return (
		<Aux>
			<div onClick={props.setstate} className={classes.CardModalBackDrop} ></div>
			<div className={classes.AddStudent} >
				<form className={classes.EditTable} onSubmit={onSubmit} >
					<div className={classes.EditTableTabs}>
						<div className="form-group">
							<label>school ID: </label>
							<input className="form-control" type="text" value={state.sid} onChange={(e) => {setState({...state,sid: e.target.value})}} />
						</div>
						<div className="form-group">
							<label>national ID: </label>
							<input className="form-control" type="text" value={state.nid} onChange={(e) => {setState({...state,nid: e.target.value})}} />
						</div>
						<div className="form-group">
							<label>username: </label>
							<input className="form-control" type="text" value={state.username} onChange={(e) => {setState({...state,username: e.target.value})}} />
						</div>
						<div className="form-group">
							<label>first name: </label>
							<input className="form-control" type="text" value={state.firstName} onChange={(e) => {setState({...state,firstName: e.target.value})}} />
						</div>
						<div className="form-group">
							<label>last name: </label>
							<input className="form-control" type="text" value={state.lastName} onChange={(e) => {setState({...state,lastName: e.target.value})}} />
						</div>
						<div className="form-group">
							<label>starting year: </label>
							<input className="form-control" type="number" value={state.startYear} onChange={(e) => {setState({...state,startYear: e.target.value})}} />
						</div>
						<div className="form-group">
							<DatePicker className="form-control" 
								selected={state.dateOfBirth}
								onChange={date => {setState({...state, dateOfBirth: date})}} />
						</div>
						<div className="form-group">
							<label>gender: </label>
							<input className="form-control" type="gender" value={state.gender} onChange={(e) => {setState({...state,gender: e.target.value})}} />
						</div>
					</div>
					<div className={classes.EditTableTabs}>
						<div className="form-group">
							<label>address: </label>
							<input className="form-control" type="text" value={state.address} onChange={(e) => {setState({...state,address: e.target.value})}} />
						</div>
						<div className="form-group">
							<label>tel: </label>
							<input className="form-control" type="tel" format="[0-9]{10}" 
								placeholder='0696969696' onChange={(e) => {setState({...state,numTel: e.target.value})}} />
						</div>
						<div className="form-group">
							<label>email: </label>
							<input className="form-control" type="text" value={state.email} onChange={(e) => {setState({...state,email: e.target.value})}} />
						</div>
						<div className="form-group">
							<label>parent: </label>
							<select className="form-control"  type="text" 
								value='select' 
								onChange={(e) => {setState({...state, parentId: e.target.value})}} >
								{parents && parents.map((parent, key) => (
									<option key={key} value={parent._id} >Mr. {parent.lastName} {parent.firstName}</option>
								))}
							</select>
						</div>
						<div className="form-group">
							<label>class: </label>
							<input className="form-control" type="text" value={state.classId} onChange={(e) => {setState({...state,classId: e.target.value})}} />
						</div>
						<div className="form-group">
							<label>group: </label>
							<input  className="form-control"type="text" value={state.groupId} onChange={(e) => {setState({...state,groupId: e.target.value})}} />
						</div>
						<div className={classes.Actions} >
							<input type="submit"
							// onClick={() => onSubmit()}
							value="create new parent" 
							className="btn btn-success" />
							<button onClick={props.setstate} className="btn btn-warning">cancel</button>
						</div>
					</div>
				</form>
			</div>
		</Aux>)
}

const EditStudent = (props) => {

	const [state, setState] = useState(props.student);
	const [parents, setParent] = useState();

	const getParents = async () => {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
			try {
				const res = await axios.get('http://localhost:5000/parents', {
					headers: {
						'Test-Header': 'test-value',
						'authToken': token.token.authToken,
						'userType': token.token.userType
					}
				})
				// setState({...state, parents: res.data})
				setParent(res.data);
			}
			catch(err) {console.error(err.message)}
		}
	}

	useEffect(() => {
		getParents();
	}, []);

	const EditSt = (id) => {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
			const student = {
				nid: state.nid,
				sid: state.sid,
				username: state.username,
				firstName: state.firstName,
				lastName: state.lastName,
				dateOfBirth: state.dateOfBirth,
				startYear: state.startYear,
				gender: state.gender,
				address: state.address,
				numTel: state.numTel,
				email: state.email,
				parentId: state.parentId,
				groupId: state.groupId,
				classId: state.classId
			}
			axios.post('http://localhost:5000/students/update/' + id, student, {
				headers: {
					'Test-Header': 'test-value',
					'authToken': token.token.authToken,
					'userType': token.token.userType
				}
			})
				.then(res => console.log('updated successfuly ' + res.data));
			props.setAction(0);
			props.getStudents();
		}
	}

	return (
		<Aux>
			<div className={classes.EditTable} >
				<div className={classes.EditTableTabs}>
					<div> <strong>_id: </strong> {props.student._id}</div>
					<div> <strong>school ID: </strong> {props.student.sid}</div>
					<div> <strong>national ID: </strong> {props.student.nid}</div>

					<div className="form-group">
						<label>username: </label>
						<input className="form-control" type="text" value={state.username} onChange={(e) => {setState({...state,username: e.target.value})}} />
					</div>
					<div className="form-group">
						<label>first name: </label>
						<input className="form-control" type="text" value={state.firstName} onChange={(e) => {setState({...state,firstName: e.target.value})}} />
					</div>
					<div className="form-group">
						<label>last name: </label>
						<input className="form-control" type="text" value={state.lastName} onChange={(e) => {setState({...state,lastName: e.target.value})}} />
					</div>
					<div className="form-group">
						<label>starting year: </label>
						<input className="form-control" type="number" value={state.startYear} onChange={(e) => {setState({...state,startYear: e.target.value})}} />
					</div>
					<div className="form-group">
						<DatePicker className="form-control" 
							selected={Date.parse(props.student.dateOfBirth)}
							onChange={date => {setState({...state, dateOfBirth: date})}} />
					</div>
					<div className="form-group">
						<label>gender: </label>
						<input className="form-control" type="gender" value={state.gender} onChange={(e) => {setState({...state,gender: e.target.value})}} />
					</div>
				</div>
				<div className={classes.EditTableTabs}>
					<div className="form-group">
						<label>address: </label>
						{state.address}
						<input className="form-control" type="text" value={state.address} onChange={(e) => {setState({...state,address: e.target.value})}} />
					</div>
					<div className="form-group">
						<label>tel: </label>
						<input className="form-control" type="number" value={state.numTel} onChange={(e) => {setState({...state,numTel: e.target.value})}} />
					</div>
					<div className="form-group">
						<label>email: </label>
						<input className="form-control" type="text" value={state.email} onChange={(e) => {setState({...state,email: e.target.value})}} />
					</div>
					<div className="form-group">
						<label>parent: </label>
						<select className="form-control"  type="text" 
							value={state.parentId} 
							// value='select'
							onChange={(e) => {setState({...state, parentId: e.target.value})}} >
							{parents && parents.map((parent, key) => (
								<option key={key} value={parent._id} >Mr. {parent.lastName} {parent.firstName}</option>
							))}
						</select>
					</div>
					<div className="form-group">
						<label>class: </label>
						<input className="form-control" type="text" value={state.classId} onChange={(e) => {setState({...state,classId: e.target.value})}} />
					</div>
					<div className="form-group">
						<label>group: </label>
						<input  className="form-control"type="text" value={state.groupId} onChange={(e) => {setState({...state,groupId: e.target.value})}} />
					</div>
					<div className={classes.Actions} >
						<button 
							type="button"
							onClick={() => EditSt(props.student._id)}
							className="btn btn-success" >Save</button>
						<button 
							type="button"
							onClick={() => props.setAction(0)}
							className="btn btn-danger" >Cancel</button>
					</div>
				</div>
			</div>
		</Aux>
	)
}

const OtherDetails = (props) => {

	const [parent, setParent] = useState([]);
	const [state, setstate] = useState(0);

	const getParent = async () => {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
			try {
				const res = await axios.get('http://localhost:5000/parents/' + props.student.parentId, {
					headers: {
						'Test-Header': 'test-value',
						'authToken': token.token.authToken,
						'userType': token.token.userType
					}
				})
				setParent(res.data);
			}
			catch(err) {console.error(err.message)}
		}
	}

	useEffect(() => {
		getParent();
	}, []);
	
	return (
		<Aux>
			<div onClick={() => props.setAction(0)} className={classes.CardModalBackDrop} ></div>
			<div className={classes.OtherDetails} >
				{
					state !== 1?
					<Aux>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >_id: </div> <div>{props.student._id}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >school ID: </div> <div>{props.student.sid}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >national ID: </div> <div>{props.student.nid}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >username: </div> <div>{props.student.username}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >first name: </div> <div>{props.student.firstName}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >last name: </div> <div>{props.student.lastName}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >date of birth: </div>  <div>{props.student.dateOfBirth}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >starting year: </div>  <div>{props.student.startYear}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >gender: </div>  <div>{props.student.gender}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >address: </div>  <div>{props.student.address}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >tel: </div>  <div>{props.student.numTel}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >email: </div>  <div>{props.student.email}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >parentId: </div><div>Mr. {parent && parent.lastName} {parent && parent.firstName}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >groupId: </div>  <div>{props.student.groupId}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >classId: </div>  <div>{props.student.classId}</div></div>
						<div className={classes.Actions} >
							<Aux>
								{
								state === 2 ?
								<Aux>
									<button 
										type="button"
										onClick={() => setstate(0)}
										className="btn btn-warning" >cancel</button>
									<button 
										type="button"
										onClick={() => props.deleteStudent(props.student._id)}
										className="btn btn-danger" >Delete</button>
								</Aux>
								: state === 0 ?
								<Aux>
									<button 
										type="button"
										onClick={() => setstate(1)}
										className="btn btn-warning" >Edit</button>
									<button 
										type="button"
										onClick={() => setstate(2)}
										className="btn btn-danger" >Delete</button>
								</Aux>
								: null
								}
								<button 
									type="button"
									onClick={() => props.setAction(0)}
									className="btn btn-success" >Close</button>
							</Aux>
						</div>
					</Aux>
					: state === 1?
					<EditStudent student={props.student} setAction={setstate} getStudents={props.getStudents} />
					: null
				}
			</div>

		</Aux>
	)
}


const Student = (props) => {
	const [action, setAction] = useState(0);

	return (
		<Aux>
			<tr>
				<Aux>
					<th scope="row">{props.student.sid}</th>
					<td>{props.student.nid}</td>
					<td>{props.student.username}</td>
					<td>{props.student.firstName}</td>
					<td>{props.student.lastName}</td>
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
								onClick={() => props.deleteStudent(props.student._id)} 
								className="btn btn-danger" >Delete</button>
						</Aux>
						: null
					}
					</td>
				</Aux>
			</tr>
			{
			action === 1 || action === 2?
			<OtherDetails 
				setAction={setAction} 
				action={action} 
				deleteStudent={props.deleteStudent}
				getStudents={props.getStudents}
			 	student={props.student} />
			: null
			}
		</Aux>
	)
}

const Students = () => {
	const [state, setState] = useState({
		students: [],
		action: 0
	})

	const getStudents = async () => {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
			try {
				const res = await axios.get('http://localhost:5000/students', {
					headers: {
						'Test-Header': 'test-value',
						'authToken': token.token.authToken,
						'userType': token.token.userType
					}
				});
				setState({...state, students: res.data})
			}
			catch(err) {console.error(err.message)}
		}
	}

	const deleteStudent = (id) => {
		let token = JSON.parse(localStorage.getItem('authToken'));
		if (token) {
			axios.delete('http://localhost:5000/students/' + id, {
				headers: {
					'Test-Header': 'test-value',
					'authToken': token.token.authToken,
					'userType': token.token.userType
				}
			})
				.then(res => console.log('deleted successfuly ' + res.data));
			setState({...state, students: state.students.filter(el => el._id !== id)})
		}
	}
	
	
	useEffect(() => {
		getStudents();
	}, []);

	console.log(state.students);

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

		<div className={classes.Students} >
			<h2>Student List</h2>
			<button 
				type="button"
				onClick={() => setState({...state, action: 1})}
				className="btn btn-success" >Add new student</button>
				{
					state.action === 1 ?
						<AddStudent setstate={() => setState({...state, action: 0})} getStudents={getStudents} />
					: null
				}
			<table className="table">
				<thead>
					<tr>
					{/* <th scope="col">_id</th> */}
					<th scope="col">sid</th>
					<th scope="col">nid</th>
					<th scope="col">username</th>
					<th scope="col">first name</th>
					<th scope="col">last name</th>
					<th scope="col">actions</th>
					</tr>
				</thead>
				<tbody>
				{
					state.students && state.students.map((student, key) => (
						<Student key={key} 
							student={student} 
							getStudents={getStudents}
							deleteStudent={deleteStudent} 
							/>
					))
				}
				</tbody>
			</table>
		</div>
	)
}

export default Students;