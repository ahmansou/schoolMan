import classes from './UIElements.module.scss';
import { Close, ReportProblemOutlined } from '@material-ui/icons'

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
				<ReportProblemOutlined />
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