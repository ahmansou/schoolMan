import classes from './Groups.module.scss';
import { useDataAdd, GetAllData, useDataRemove } from '../../../hooks/useData';
import { useEffect, useState } from 'react';
import { Alert } from '../../UIElements/UIElements';
import { Delete, Edit } from '@material-ui/icons';

const Group = (props) => {
	const group = props.doc;

	return (
		<tr>
			<td>{group.name}</td>
			<td>{group.numberOfStudents}</td>
			<td>{group.year}</td>
			<td className={classes.Actions}>
				<div className={[classes.Action, classes.Edit].join(' ')} ><Edit /></div>
				<div className={[classes.Action, classes.Remove].join(' ')}
					onClick={() => props.removeHandler(group._id)} ><Delete /></div>
			</td>
		</tr>
	)
}

const NewGroupForm = (props) => {
	const [state, setState] = useState({
		name: '',
		numberOfStudents: 0,	
		year: 0,
		added: 0
	})

	const AddHandler = async (e) => {
		e.preventDefault();
		const newGroup = {
			name: state.name,
			numberOfStudents: state.numberOfStudents,
			year: state.year
		};

		let res;
		res = await useDataAdd('group', newGroup);
		console.log('res', res);
		if (res.status === 200) {
			setState({...state, added: 1})
			GetAllData('group', props.setDocs);
		}
		else
			setState({...state, added: -1})
	}

	return (
		<div className={classes.AddGroup} >
			<h4>Add a new Group</h4>
			{
			state.added === 1 ?
				<Alert alert='success' onClick={() => setState({...state, addded: 0})} >Group added successfuly</Alert>
			: state.added === -1 ?
				<Alert alert='fail' onClick={() => setState({...state, added: 0})} >Couldn't add group</Alert>
			: null
			}
			<form className={classes.NewGroupForm} onSubmit={AddHandler} >
				<input type="text" placeholder="Name" required
					onChange={(e) => setState({...state, name: e.target.value})} />
				<input type="number" placeholder="Number of students" required
					onChange={(e) => setState({...state, numberOfStudents: e.target.value})} />
				<input type="number" placeholder="Year" required
					onChange={(e) => setState({...state, year: e.target.value})} />
				<input type="submit" value="Save" />
			</form>
		</div>
	)
}

const Groups = () => {

	const [state, setState] = useState({
		searchQuery: '',
		removed: 0,
	});
	
	const [docs, setDocs] = useState([]);

	useEffect(() => {
		GetAllData('group', setDocs);
		console.log(docs);
	}, [])
	
	const RemoveHandler = async (id) => {
		let res = await useDataRemove('group', id);
		console.log('resdel', res);
		if (res.status === 200) {
			setState({...state, removed: 1})
			setDocs(docs.filter(el => el._id !== id));
		}
		else
			setState({...state, removed: -1})
	}
	
	return (
		<div className={classes.Groups} >
			<NewGroupForm docs={docs} setDocs={setDocs} />
			<div className={classes.GroupsList} >
				<h4>All groups</h4>
				<div className={classes.Filters} >
					<input type="text" placeholder="Search by name" 
						onChange={(e) => setState({...state, searchQuery: e.target.value})} />
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
						<th scope="col">Name</th>
						<th scope="col">Number of students</th>
						<th scope="col">Year</th>
						<th scope="col"></th>
					</thead>
					<tbody>
						{docs && docs.map((doc, key) =>
							doc.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ?
							<Group key={key} doc={doc} removeHandler={RemoveHandler} />
							: null
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Groups;
