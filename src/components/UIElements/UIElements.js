import classes from './UIElements.module.scss';
import { Close, ReportProblemOutlined, CheckCircleOutlined } from '@material-ui/icons'

export const Alert = (props) => {
	let classname = [classes.Alert];
	switch (props.alert) {
		case 'success': {
			classname = [classes.Alert, classes.AlertSuccess].join(' ');
			break ;}
		case 'fail': {
			classname = [classes.Alert, classes.AlertFail].join(' ');
			break ;}
		case 'warning': {
			classname = [classes.Alert, classes.AlertWarning].join(' ');
			break ;}
		default : {
			classname = [classes.Alert];
			break ;}

	}
	return (
		<div className={classname} >
			<div className={classes.AlertBody} >
				{
					props.alert === 'success' ?
					<CheckCircleOutlined />
					:
					<ReportProblemOutlined />
				}
				<p>{props.children}</p>
			</div>
			{
				props.onClick ? 
				<div className={classes.CloseAlert} onClick={props.onClick}><Close /></div>
				: null
			}
		</div>
	)
}

export const BackDrop = (props) => (
	<div className={classes.BackDrop} onClick={props.onClick} ></div>
);

export const FilterSelect = (props) => (
	<select className={classes.FilterSelect} type="text" value={null}
		onChange={props.onChange}
	 >
		<option value={null}>Filter by {props.msg} </option>
		{props.itemArray && props.itemArray.map((item, key) => (
			<option key={key} value={item.value} >{item.name}</option>
		))}
	</select>
)