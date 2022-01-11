import { Link } from "react-router-dom"
import { useState } from "react";
import './styles/navbar.css';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const location = useLocation();

    useEffect(() => {
        setToken(localStorage.getItem('authToken'));
    }, [location])

    return (
        <nav className='navbar'>
            { token !== null ?
            <p>Welcome back, admin!</p>
            :
            <Link to='/login'>Log In</Link>
            }
            <Link to='/newpost'>Create new post</Link>
            <Link to='/posts'>All posts</Link>
            {token !== null && <Link to='/logout'>Log out</Link>}
        </nav>
    )
}

export default Navbar;