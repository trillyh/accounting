import { Link } from 'react-router-dom'; 

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">Net Accounting</div>
            <ul className="navbar-menu">
                <li><Link to="/about">About</Link></li> 
                <li><Link to="/concepts">Concepts</Link></li> 
                <li><Link to="/playground">Playground</Link></li>   
                <li><Link to="/Auth">Login</Link></li>   
            </ul>
        </nav>
    );
}

export default Navbar;