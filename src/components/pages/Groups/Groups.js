import classes from './Groups.module.scss';
import { useDataAdd, GetAllData, useDataRemove } from '../../../hooks/useData';
import { useContext, useEffect, useState } from 'react';
import { Alert, FilterByValue, FormInput } from '../../UIElements/UIElements';
import { Delete, Edit } from '@material-ui/icons';
import { Context } from '../../../hooks/Store';

const Group = (props) => {
	const group = props.doc;
	const [globalState, dispatch] = useContext(Context);
	const [buttonHover, setButtonHover] = useState({
		edit: false,
		delete: false,
	});

	let buttonStyle = (button) => {
		if (button === 'edit')
			return (
				{
					borderColor: globalState.accent.successOutline,
					backgroundColor: buttonHover.edit ? globalState.accent.successHover : globalState.accent.success}
			)
		return (
			{
				borderColor: globalState.accent.dangerOutline,
				backgroundColor: buttonHover.delete ? globalState.accent.dangerHover : globalState.accent.danger}
		)
		
	}

	return (
		<tr>
			<td>{group.name}</td>
			<td>{group.numberOfStudents}</td>
			<td>{group.year}</td>
			<td className={classes.Actions}>
				<div 
					onMouseEnter={() => setButtonHover({...buttonHover, edit: true})}
					onMouseLeave={() => setButtonHover({...buttonHover, edit:false})}
					style={buttonStyle('edit')}
					className={[classes.Action, classes.Edit].join(' ')} ><Edit /></div>
				<div 
					onMouseEnter={() => setButtonHover({...buttonHover, delete: true})}
					onMouseLeave={() => setButtonHover({...buttonHover, delete:false})}
					style={buttonStyle('delete')}
					className={[classes.Action, classes.Remove].join(' ')}
					onClick={() => props.removeHandler(group._id)} ><Delete /></div>
			</td>
		</tr>
	)
}

const NewGroupForm = (props) => {

	const [globalState, dispatch] = useContext(Context);
	// const [focused, setFocused] = useState(false);
	const [buttonHover, setButtonHover] = useState(false);

	let buttonStyle = {
		borderColor: globalState.accent.successOutline,
		backgroundColor: buttonHover ? globalState.accent.successHover : globalState.accent.success
	}

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
		<div className={classes.AddGroup} 
		style={{
			backgroundColor: globalState.accent.primary,
			borderColor: globalState.accent.outlines,
			color: globalState.accent.textColor
		}} >
			<h4>Add a new Group</h4>
			{
			state.added === 1 ?
				<Alert alert='success' onClick={() => setState({...state, addded: 0})} >Group added successfuly</Alert>
			: state.added === -1 ?
				<Alert alert='fail' onClick={() => setState({...state, added: 0})} >Couldn't add group</Alert>
			: null
			}
			<form className={classes.NewGroupForm} onSubmit={AddHandler} >
				<FormInput type='text' name='Name' required={true}
					onChange={(e) => setState({...state, name: e.target.value})} />
				<FormInput type='number' name='Number of students' required={true}
					onChange={(e) => setState({...state, year: e.target.value})} />
				<FormInput type='number' name='Year' required={true}
				onChange={(e) => setState({...state, numberOfStudents: e.target.value})} />
				<input type="submit" value="Save" 
					onMouseEnter={() => setButtonHover(true)}
					onMouseLeave={() => setButtonHover(false)}
					style={buttonStyle} />
			</form>
		</div>
	)
}

const Groups = () => {

	const [globalState, dispatch] = useContext(Context);

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
			<div className={classes.GroupsList} 
				style={{
					backgroundColor: globalState.accent.primary,
					borderColor: globalState.accent.outlines,
					color: globalState.accent.textColor
				}} >
				<h4>All groups</h4>
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
				<table className="table"  
					style={{
						color: globalState.accent.textColor
					}} >
					<tbody>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Number of students</th>
						<th scope="col">Year</th>
						<th scope="col"></th>
					</tr>
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
