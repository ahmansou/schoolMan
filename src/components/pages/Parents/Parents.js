import classes from './Parents.module.scss';
import { useEffect, useState } from 'react';
import { GetAllData, useData, useDataRemove } from '../../../hooks/useData';
import Aux from '../../../hoc/Aux';
import { Link } from 'react-router-dom';
import { Alert, DateParser, FilterByValue } from '../../UIElements/UIElements';
import { Delete, RemoveRedEye } from '@material-ui/icons';

const Parent = (props) => {
	const parent = props.doc;
	
	return (
		<tr>
			<td>{parent.nid}</td>
			<td></td>
			<td>{parent.username}</td>
			<td>{parent.firstName} {parent.lastName}</td>
			<td>{parent.email}</td>
			<td>{parent.mobilePhone}</td>
			<td>{parent.homePhone}</td>
			<td>{parent.gender === 'M' ? 'Male' : 'Female'}</td>
			<td>{DateParser(parent.dateOfBirth)}</td>
			<td className={classes.Actions}>
				<Link className={[classes.Action, classes.Edit].join(' ')} 
					to={{pathname: `parent-details/parent_id=${parent._id}`}}><RemoveRedEye /></Link>
				<div className={[classes.Action, classes.Remove].join(' ')}
					onClick={() => props.removeHandler(parent._id)} ><Delete /></div>
			</td>
		</tr>
	)
}

const Parents = () => {
	const [state, setState] = useState({
		searchQuery: '',
		removed: 0,
	})

	const [docs, setDocs] = useState([]);

	useEffect(() => {
		GetAllData('parents', setDocs);
		console.log(docs);
	}, [])

	const RemoveHandler = async (id) => {
		let res = await useDataRemove('parents', id);
		console.log('resdel', res);
		if (res.status === 200) {
			setState({...state, removed: 1})
			setDocs(docs.filter(el => el._id !== id));
		}
		else
			setState({...state, removed: -1})
	}
	
	return (
		<div className={classes.Parents} >
			<div className={classes.ParentsTitle} >
				<h4>Parents list</h4>
				<Link className={classes.NewParent} to='/new-student'>Add new Student</Link>
			</div>
			<div className={classes.ParentsList} >
				<h4>All parents</h4>
				<div className={classes.Filters} >
					<FilterByValue setState={setState} state={state} />
				</div>
				{
				state.removed === 1 ?
					<Alert alert='success' onClick={() => setState({...state, removed: 0})} >Group remove successfuly</Alert>
				: state.removed === -1 ?
					<Alert alert='fail' onClick={() => setState({...state, removed: 0})} >Couldn't remove group</Alert>
				: null
				}
				<table className="table">
					<thead>
						<th scope="col">Nid</th>
						<th scope="col"></th>
						<th scope="col">Username</th>
						<th scope="col">Full name</th>
						<th scope="col">Email</th>
						<th scope="col">Mobile</th>
						<th scope="col">Tel</th>
						<th scope="col">Gender</th>
						<th scope="col">Birth Day</th>
						<th scope="col"></th>
					</thead>
					<tbody>
					{docs && docs.map((doc, key) =>
						doc.firstName.includes(state.searchQuery)
							|| doc.lastName.includes(state.searchQuery)
							|| doc.username.includes(state.searchQuery) ?
						<Parent key={key} doc={doc} removeHandler={RemoveHandler} />
						: null
					)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Parents;
