import classes from './UIElements.module.scss';
import { Close, ReportProblemOutlined, CheckCircleOutlined } from '@material-ui/icons'
import Aux from '../../hoc/Aux';
import axios from 'axios';
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

export class SearchComponent extends Component {
	state = {
		users : null,
		query : '',
		loading: false,
		cancel: undefined,
		showRes: false
	}

	search = async query => {
		let token = JSON.parse(localStorage.getItem('authToken'));
		// if (query === '') {
		if (query.length < 2 || query === '') {
			this.setState({ users: null });
			return ;
		}
		
		if (token) {
			if (this.state.cancel) 
				this.state.cancel.cancel();
			this.setState( {cancel : await axios.CancelToken.source()});
			this.setState({ loading: true });
			try {
				const res = await axios.get(`http://localhost:5000/students/search/${query}`, {
					headers: {
						'authToken': token.token.authToken,
						'userType': token.token.userType
					},cancelToken: this.state.cancel.token
				});
				const users = await res.data;
				this.setState({ users: users, loading: false, showRes: true });
			}
			catch(error) {
				if(axios.isCancel(error)) {
					console.log('Request canceled', error.message);
				} else {
					console.log('Something went wrong: ', error.message)
				}

			}
		}
	};
	
	onChangeHandler = async e => {
		await this.setState({query: e.target.value});
		if (e.target.value === '') {
			this.setState({ users: [] });
			return ;
		}
		await this.search(e.target.value);
		console.log('users: ', this.state.users);
	};


	render() {
		return (
			<Aux>
			{this.state.query !== '' && this.state.showRes ?
				<BackDrop onClick={() => this.setState({showRes: false})} />
				: null }
			<div className={classes.SearchComponent} >
				<input
					value={this.state.value}
					onChange={e => this.onChangeHandler(e)}
					placeholder="Search"
					onClick={() => this.setState({showRes: true})}
				/>
				{console.log(`|${this.state.query}|`)}
				{this.state.query !== '' && this.state.showRes ?
					<div className={this.state.users && this.state.users.length ? classes.SearchResult : [classes.SearchResult, classes.SearchNoResult].join(' ')} >
						{
						this.state.users && this.state.users.length > 0 ?
						this.state.users.map((user, key) => (
							<a className={classes.Item}
							href={`student-details/student=${user._id}`} >
								<strong>{user.username}</strong><br />{user.firstName} {user.lastName}</a>
							))
						: <p>No results found</p>
						}
					</div>
				: null
			}
			</div>
			</Aux>
		);
	}
}