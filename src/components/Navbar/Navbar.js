
import { Link } from 'react-router-dom';

const Navbar = () => {
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

				</div>
			</div>
		</nav>
	)
}

export default Navbar;