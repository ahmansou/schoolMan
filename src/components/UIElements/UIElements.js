import classes from './UIElements.module.scss';
import { Close, ReportProblemOutlined, CheckCircleOutlined } from '@material-ui/icons'
import Aux from '../../hoc/Aux';
import axios from 'axios';
import me from '../../assets/me.jpeg';
import { useContext, useEffect, useState } from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../hooks/Store';

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

export const FormInput = (props) => {
	const [state, dispatch] = useContext(Context);
	const [focused, setFocused] = useState(false);

	let itemStyle = {
		color: state.accent.textColorSecondary,
		backgroundColor: focused ? state.accent.darkerSecondary : state.accent.darker,
		borderColor: state.accent.outlines
	}

	return (
		<div className={classes.FormInput} >
			{props.label ?  <p>{props.label}{props.required ? ' *' : null}</p> : null }
			{
				props.isSelect ?
				<select 
				onChange={props.onChange}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				style={itemStyle}
				 required>
					{
					props.default? 
					<option value={props.default.value} >{props.default.name}</option>
					:
					<option value={undefined} >Please select a {props.name}</option>
					}
					{
					props.coll && props.coll.map((option, key) => (
						<option key={key} value={option.value} >{option.name}</option>
					))
					}
				</select>
				:
				<Aux>
				{props.required ? 
					props.default ? 
						<input type={props.type} 
							placeholder={props.name} 
							value={props.default}
							onFocus={() => setFocused(true)}
							onBlur={() => setFocused(false)}
							style={itemStyle}
							onChange={props.onChange} required/>
						:
						<input type={props.type} 
							placeholder={props.name} 
							onFocus={() => setFocused(true)}
							onBlur={() => setFocused(false)}
							style={itemStyle}
							onChange={props.onChange} required/>
							: 
							<input type={props.type} 
							onFocus={() => setFocused(true)}
							onBlur={() => setFocused(false)}
							style={itemStyle}
							placeholder={props.name} 
						onChange={props.onChange}/>
				}
				</Aux>	
			}
		</div>
	)
}

export const ParentSelect = (props) => {
	return (
		<div className={classes.FormInput} >
			<p>{props.label} *</p>
			<select onChange={props.onChange} required>
				{
					props.default? 
					<option value={props.default._id} >{props.default.lastName} {props.default.firstName}</option>
					:
					<option value={undefined} >Please select a parent</option>
				}
				{
				props.default? 
				props.coll && props.coll.map((option, key) => (
					option._id !== props.default._id ?
					<option key={key} value={option._id} >{option.lastName} {option.firstName}</option>
					: null
				))
				:
				props.coll && props.coll.map((option, key) => (
					<option key={key} value={option._id} >{option.lastName} {option.firstName}</option>
				))
				}
			</select> 
		</div>
	)
}

export const DateParser = (date) => {
	let newDate = Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'}).format(Date.parse(date)).split("/");

	return ([newDate[2], newDate[0], newDate[1]].join('-'))
}

export const MainTitle = () => {
	const [state, dispatch] = useContext(Context);
	
	return (
		<div className={classes.MainTitle} >
			<p className={classes.MainTxt} style={{color: state.accent.textColorSecondary}} >ahmansou</p>
			<a className={classes.SubTxt} style={{color: state.accent.textColor}} href='/' >School Manager</a>
		</div>
	)
}

export const FilterByValue = (props) => {
	const [globalState, dispatch] = useContext(Context);
	const [focused, setFocused] = useState(false);

	let itemStyle = {
		color: globalState.accent.textColorSecondary,
		backgroundColor: focused ? globalState.accent.darkerSecondary : globalState.accent.darker,
		borderColor: globalState.accent.outlines
	}

	return (
		<input className={classes.FilterByValue} type="text" placeholder="Search by name"  
			style={itemStyle}
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
			onChange={(e) => props.setState({...props.state, searchQuery: e.target.value})} />
	)
}

