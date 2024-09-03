import { Link } from 'react-router-dom'; 
import Personal from '../pages/Personal.jsx';

function Navbar({userLoggedIn}) {
	
	let loginOrLogout = <li> {userLoggedIn ? 
		(
			<Link to="/logout">Logout</Link>) :
		(
			<Link to="/Auth">Login</Link>
		)}</li>	

    return (
        <nav className="navbar">
            <div className="navbar-brand">Net Accounting</div>
            <ul className="navbar-menu">
                <li><Link to="/about">About</Link></li> 
                <li><Link to="/concepts">Concepts</Link></li> 
                <li><Link to="/playground">Playground</Link></li>   
				{userLoggedIn ? (<li><Link to="/personal">Personal</Link></li>) : null}
				{loginOrLogout}
            </ul>
        </nav>
    );
}

export default Navbar;
