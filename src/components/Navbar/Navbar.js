
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Aux from '../../hoc/Aux';

const Navbar = (props) => {

	const signout = () => {
		localStorage.removeItem('authToken');
		// props.setusername(undefined);
		window.location = '/sign-in';
	}
	
	let token = JSON.parse(localStorage.getItem('authToken'));
		// if (token)
		// 	props.setusername(token.token.username);

	console.log("logged user nav:", props.username)

	return (
		<nav className="navbar navbar-dark bg-dark navbar-expand-lg" >
			<div className="container" >
				<div className="navbar-brand">School manager</div>
				<div className="collapse navbar-collapse" > 
					<ul className="navbar-nav mr-auto" >
						{
						token && token.token.userType === 0 ?
							<Aux>
								<li className="navbar-item">
									<Link to="/1" className="nav-link">Students</Link>
								</li>
								<li className="navbar-item">
									<Link to="/parents1" className="nav-link">Parents</Link>
								</li>
								<li className="navbar-item">
									<Link to="/users1" className="nav-link">Users</Link>
								</li>
								<li className="navbar-item">
									<Link to="/staffs1" className="nav-link">Staffs</Link>
								</li>
							</Aux>
						: null
						}
					</ul>
					{props.username ? 
						<Dropdown>
							<Dropdown.Toggle variant="success" id="dropdown-basic" size="sm">
								{props.username && props.username}
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<Dropdown.Item href="/profile">
									<Link to="/profile1" >My profile</Link>
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item onClick={signout}>Sign-out</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						:
						<div className="navbar-item">
							<Link to="/sign-in1" className="nav-link btn-success">Sign-in</Link>
						</div>

					}
				</div>
			</div>
		</nav>
	)
}

export default Navbar;