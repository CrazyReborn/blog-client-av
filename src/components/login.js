import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const FetchLogIn = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({username, password})
        })
        .then(response => response.json())
        .then(json => {
            if (json.token === undefined) {
                setErrors(json.errors);
            } else {
                localStorage.setItem('authToken', json.token);
                navigate('/');
            }
        })
        .catch(errors => setErrors(errors));
    }

    return (
        <form onSubmit={FetchLogIn}>
            <label>Username:
                <input type='text' name='username' req='true' onChange={(e) => {setUsername(e.target.value)}}></input>
            </label>
            <label>Password: 
                <input type='password' name='password' req='true' onChange={(e) => {setPassword(e.target.value)}}></input>
            </label>
            <button type='submit'>Submit</button>
            {errors === null ?
            <></>
            :
            errors.map((err, index) => {
                return (
                    <p key={index} className='errorMessage'>{err.msg}</p>
                )
            })
            }
        </form>
    )
}

export default Login;