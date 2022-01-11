import { useEffect, useState } from 'react';
import PostMini from "./postmini";
import './styles/dashboard.css';

function Dashboard() {

    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
      fetch('http://localhost:5000/api/')
      .then(response => response.json())
      .then(json => setPosts(json.posts))
      .catch(err => {
        console.log('There was an error fetching posts data: ', err);
      })
    }, [])

    return (
        <div className='dashboard'>
            {posts.map(post => {
                return(
                    <PostMini key={post._id} post={post} />
                )
            })}
        </div>
    )
}

export default Dashboard