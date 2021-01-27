import classes from './SearchComponent.module.scss';
import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import { BackDrop } from '../UIElements';
import axios from 'axios';
import me from '../../../assets/me.jpeg';

class SearchComponent extends Component {
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
		if (query.length < 1 || query === '') {
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
							<a key={key} className={classes.Item}
							href={`student-details/student=${user._id}`} >
								<div className={classes.Img} style={{backgroundImage: `url(${me})`}} ></div>
								<p>
									<strong>{user.username}</strong><br />{user.firstName} {user.lastName}
								</p>
							</a>
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

export default SearchComponent;
