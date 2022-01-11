import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout () {

    const navigate = useNavigate();
    const [error, setError] = useState('');
    
    useEffect(()=> {
        fetch('http://localhost:5000/api/logout')
        .then(response => {
            localStorage.removeItem('authToken');
            navigate('/')
        })
        .catch(err => setError(err))
    })

    return (
        error !== '' ?
        <div>
            <h2>There was an error while login out</h2>
            <p>err</p>
        </div>
        : <></>
    )
}

export default Logout