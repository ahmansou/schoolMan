import classes from './Parents.module.scss';
import { useState } from 'react';
import { useData, useDataGetOne } from '../../../hooks/useData';
import Aux from '../../../hoc/Aux';
import { Link } from 'react-router-dom';
import { BackDrop, DateParser } from '../../UIElements/UIElements';
import { MoreVert } from '@material-ui/icons';

const Parent = (props) => {
	const parent = props.doc;
	const [state, setState] = useState({
		showAction: false
	})

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
			<td className={classes.ActionsWrapper}>
				<div className={classes.OptionToggle} onClick={() => setState({...state, showAction: !state.showAction})} >
					<MoreVert />
				</div>
				{
				state.showAction ? 
				<Aux>
					<BackDrop onClick={() => setState({...state, showAction: false})} />
					<div className={classes.Actions} >
						<Link className={classes.Action} 
						to={{pathname: `parent-details/parent_id=${parent._id}`}}
						>View details</Link>
						<div className={[classes.Action, classes.DeleteAction].join(' ')} 
							onClick={() => this.props.deleteStudent(this.props.student._id)} >Delete</div>
					</div>
				</Aux>
				: null
				}
			</td>
		</tr>
	)
}

const Parents = () => {
	const { docs } = useData('parents');

	const [state, setState] = useState({
		searchQuery: '',
	})

	return (
		<div className={classes.Parents} >

			{/* <SearchComponent /> */}
			<div className={classes.ParentsTitle} >
				<h4>Parents list</h4>
				<Link className={classes.ParentsNewStudent} to='/new-student'>Add new Student</Link>
			</div>
			<div className={classes.ParentsList} >
				<h4>All parents</h4>
				<div className={classes.Filters} >
					<input type="text" placeholder="Search by name" 
						onChange={(e) => setState({...state, searchQuery: e.target.value})} />
					{/* <button>Search</button> */}
					{/* <p>{state.searchQuery}</p> */}
				</div>
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
							<Parent key={key} doc={doc} />
							: null
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Parents;