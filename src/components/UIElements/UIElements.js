import classes from './UIElements.module.scss';
import { Close, ReportProblemOutlined, CheckCircleOutlined } from '@material-ui/icons'
import Aux from '../../hoc/Aux';
import axios from 'axios';
import me from '../../assets/me.jpeg';
import { useEffect, useState } from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';

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
	return (
		<div className={classes.FormInput} >
			<p>{props.label}{props.required ? ' *' : null}</p>
			{
				props.isSelect ?
				<select onChange={props.onChange} required>
					{
					props.default? 
					<option value={props.default.value} >{props.default.name}</option>
					:
					<option value={undefined} >Please select a {props.label}</option>
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
							placeholder={props.label} 
							value={props.default}
							onChange={props.onChange} required/>
						:
						<input type={props.type} 
							placeholder={props.label} 
							onChange={props.onChange} required/>
							: 
							<input type={props.type} 
							placeholder={props.label} 
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
	return (
		<div className={classes.MainTitle} >
			<p className={classes.MainTxt} >ahmansou</p>
			<a className={classes.SubTxt} href='/' >School Manager</a>
		</div>
	)
}

export const FilterByValue = (props) => {
	return (
		<input className={classes.FilterByValue} type="text" placeholder="Search by name" 
			onChange={(e) => props.setState({...props.state, searchQuery: e.target.value})} />
	)
}