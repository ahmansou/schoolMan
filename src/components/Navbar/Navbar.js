
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import {useState, useEffect} from 'react';

const Navbar = () => {

	const [state, setstate] = useState(undefined)

	
	const signout = () => {
		localStorage.removeItem('authToken');
		setstate(undefined);
	}
	
	useEffect(() => {
		var token = JSON.parse(localStorage.getItem('authToken'));
		if (token)
			setstate(token.token.username)
	}, []);

	return (
		<nav className="navbar navbar-dark bg-dark navbar-expand-lg" >
			<div className="container" >
				<Link to="/" className="navbar-brand">School manager</Link>
				<div className="collapse navbar-collapse" > 
					<ul className="navbar-nav mr-auto" >
						<li className="navbar-item">
							<Link to="/parents" className="nav-link">Parents</Link>
						</li>
						<li className="navbar-item">
							<Link to="/users" className="nav-link">Users</Link>
						</li>
					</ul>
					{state ? 
						<Dropdown>
							<Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
								{/* {token && token.token.username} */}
								{state && state}
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item href="#/action-1">My profile</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item href="#/action-2" onClick={signout}>Sign-out</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						:
						<div className="navbar-item">
							<Link to="/sign-in" className="nav-link btn-success">Sign-in</Link>
						</div>

					}
				</div>
			</div>
		</nav>
	)
}

export default Navbar;