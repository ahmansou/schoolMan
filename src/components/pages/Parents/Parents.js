import React, { useEffect, useState } from 'react';
import classes from './Parents.module.scss';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import Aux from '../../../hoc/Aux';

const AddParent = (props) => {
	const [state, setState] = useState({
		nid: '',
		username: '',
		firstName: '',
		lastName: '',
		dateOfBirth: new Date(),
		gender: '',
		address: '',
		mobilePhone: 110,
		homePhone: 220,
		email: '',
		profession: ''
	});

	const onSubmit = (e) => {
		e.preventDefault();
		const parent = {
			nid: state.nid,
			username: state.username,
			firstName: state.firstName,
			lastName: state.lastName,
			dateOfBirth: state.dateOfBirth,
			gender: state.gender,
			address: state.address,
			mobilePhone: state.mobilePhone,
			homePhone: state.homePhone,
			email: state.email,
			profession: state.profession
		}
		console.log(parent);
		axios.post('http://localhost:5000/parents/add', parent)
		.then(res => props.getParents());
		props.setstate();
	}

	return (
		<Aux>
			<div onClick={props.setstate} className={classes.CardModalBackDrop} ></div>
			<div className={classes.AddParent} >
				<form className={classes.EditTable} onSubmit={onSubmit}>
					<div className={classes.EditTableTabs}>
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
							<label>Date of birth: </label>
							<DatePicker className="form-control" 
								selected={Date.parse(state.dateOfBirth)}
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
							<label>mobile phone: </label>
							<input className="form-control" type="number" value={state.mobilePhone} onChange={(e) => {setState({...state,mobilePhone: e.target.value})}} />
						</div>
						<div className="form-group">
							<label>home phone: </label>
							<input className="form-control" type="number" value={state.homePhone} onChange={(e) => {setState({...state,homePhone: e.target.value})}} />
						</div>
						<div className="form-group">
							<label>email: </label>
							<input className="form-control" type="text" value={state.email} onChange={(e) => {setState({...state,email: e.target.value})}} />
						</div>
						<div className="form-group">
							<label>profession: </label>
							<input className="form-control" type="text" value={state.profession} onChange={(e) => {setState({...state,profession: e.target.value})}} />
						</div>
						<div className={classes.Actions} >
							<input type="submit"
								value="create new parent" 
								className="btn btn-success" />
							<button onClick={props.setstate} className="btn btn-warning">cancel</button>
						</div>
					</div>
				</form>
			</div>
		</Aux>
	)
}

const EditParent = (props) => {

	const [state, setState] = useState(props.parent);

	const EditSt = (id) => {
		const parent = {
			nid: state.nid,
			username: state.username,
			firstName: state.firstName,
			lastName: state.lastName,
			dateOfBirth: state.dateOfBirth,
			gender: state.gender,
			address: state.address,
			mobilePhone: state.mobilePhone,
			homePhone: state.homePhone,
			email: state.email,
			profession: state.profession
		}
		axios.post('http://localhost:5000/parents/update/' + id, parent)
			.then(res => console.log('updated successfuly ' + res.data));
		props.setAction(0);
		window.location = '/parents';
	}

	return (
		<Aux>
			<div className={classes.EditTable} >
				<div className={classes.EditTableTabs}>
					<div> <strong>_id: </strong> {props.parent._id}</div>
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
						<label>date of birth: </label>
						<DatePicker className="form-control" 
							selected={Date.parse(props.parent.dateOfBirth)}
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
						<label>mobile phone: </label>
						<input className="form-control" type="number" value={state.mobilePhone} onChange={(e) => {setState({...state,mobilePhone: e.target.value})}} />
					</div>
					<div className="form-group">
						<label>home phone: </label>
						<input className="form-control" type="number" value={state.homePhone} onChange={(e) => {setState({...state,homePhone: e.target.value})}} />
					</div>
					<div className="form-group">
						<label>email: </label>
						<input className="form-control" type="text" value={state.email} onChange={(e) => {setState({...state,email: e.target.value})}} />
					</div>
					<div className="form-group">
						<label>profession: </label>
						<input className="form-control" type="text" value={state.profession} onChange={(e) => {setState({...state,profession: e.target.value})}} />
					</div>
					<div className={classes.Actions} >
						<button 
							type="button"
							onClick={() => EditSt(props.parent._id)}
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
	const [state, setstate] = useState(0)

	return (
		<Aux>
			<div onClick={() => props.setAction(0)} className={classes.CardModalBackDrop} ></div>
			<div className={classes.OtherDetails} >
				{
					state !== 1?
					<Aux>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >_id: </div> <div>{props.parent._id}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >national ID: </div> <div>{props.parent.nid}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >username: </div> <div>{props.parent.username}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >first name: </div> <div>{props.parent.firstName}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >last name: </div> <div>{props.parent.lastName}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >date of birth: </div>  <div>{props.parent.dateOfBirth}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >gender: </div>  <div>{props.parent.gender}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >address: </div>  <div>{props.parent.address}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >mobile phone: </div>  <div>{props.parent.mobilePhone}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >home phone: </div>  <div>{props.parent.homePhone}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >email: </div>  <div>{props.parent.email}</div></div>
						<div className={classes.OtherDetailsItem} ><div className={classes.OtherDetailsItemTitle} >profession: </div>  <div>{props.parent.profession}</div></div>
						<div className={classes.Actions} >
							{
							state === 2 ?
							<Aux>
								<button 
									type="button"
									onClick={() => setstate(0)}
									className="btn btn-warning" >cancel</button>
								<button 
									type="button"
									onClick={() => props.deleteParent(props.parent._id)}
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
						</div>
					</Aux>
					: state === 1?
					<EditParent parent={props.parent} setAction={setstate} />
					: null
				}
			</div>

		</Aux>
	)
}


const Parent = (props) => {
	const [action, setAction] = useState(0);

	return (
		<Aux>
			<tr>
				<th scope="row">{props.parent.nid}</th>
				<td>{props.parent.username}</td>
				<td>{props.parent.firstName}</td>
				<td>{props.parent.lastName}</td>
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
							onClick={() => props.deleteParent(props.parent._id)} 
							className="btn btn-danger" >Delete</button>
					</Aux>
					: null
				}
				</td>
			</tr>
			{
			action === 1 || action === 2?
			<OtherDetails setAction={setAction} action={action} deleteParent={props.deleteParent} parent={props.parent} />
			: null
			}
		</Aux>
	)
}

const Parents = () => {
	const [state, setState] = useState({
		parents: [],
		action: 0
	})

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

	const deleteParent = (id) => {
		axios.delete('http://localhost:5000/parents/' + id)
			.then(res => console.log('deleted successfuly ' + res.data));
		setState({...state, parents: state.parents.filter(el => el._id !== id)})
	}
	


	console.log(state.parents);

	return (

		<div className={classes.Parents} >
			<h2>Parent List</h2>
			<button 
				type="button"
				onClick={() => setState({...state, action: 1})}
				className="btn btn-success" >Add new parent</button>
			{
				state.action === 1 ?
					<AddParent setstate={() => setState({...state, action: 0})} getParents={getParents} />
				: null
			}
			<table className="table">
				<thead>
					<tr>
					<th scope="col">nid</th>
					<th scope="col">username</th>
					<th scope="col">first name</th>
					<th scope="col">last name</th>
					<th scope="col">actions</th>
					</tr>
				</thead>
				<tbody>
				{
					state.parents && state.parents.map((parent, key) => (
						<Parent key={key} 
							parent={parent} 
							deleteParent={deleteParent} 
							/>
					))
				}
				</tbody>
			</table>
		</div>
	)
}

export default Parents;