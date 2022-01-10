import { Link } from "react-router-dom"
import './styles/navbar.css';

const Navbar = (props) => {
    const token = props.token;
    return (
        <nav className='navbar'>
            {typeof token !== 'undefined' ?
            <p>Welcome back, admin!</p>
            :
            <Link to='/login'>Log In</Link>
            }
            <Link to='/newpost'>Create new post</Link>
            <Link to='/posts'>All posts</Link>
        </nav>
    )
}

export default Navbar;