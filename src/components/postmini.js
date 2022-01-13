import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

function PostMini(props) {
    const post = props.post;
    const [id, setId] = useState(post._id);
    const [author, setAuthor] = useState(post.author);
    const [title, setTitle] = useState(post.title);
    const [text, setText] = useState(post.text);
    //date is assigned on server
    const [published, setPublished] = useState(post.published);
    const [comments, setComments] = useState(post.comments);

    const token = localStorage.getItem('authToken')

    const [errors, setErrors] = useState(null);

    const ChangePublishStatus = (e) => {
        e.preventDefault();
        setPublished(!post.published);
        fetch(`http://localhost:5000/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization':   `Bearer ${token}`
            },
            body: JSON.stringify({title, text, published: !published, comments})
        })
        .then(res => {res.json()})
        .then(json => {
            if (json.message === 'success') {
                return;
            } else {
                setErrors(json.errors)
            }
        })
    }

    const DeletePost = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .catch(err => console.log(err))
    }

    return (
        <div className='post'>
            <h3>{post.title} by {post.author.username}</h3>
            <p>{format(parseISO(post.date), 'do MMMM u')}</p>
            <p>Status:{post.published ? 'published' : 'not published'}</p>
            <form onSubmit={(e) => ChangePublishStatus(e)}>
                <button type='submit'>{published ? 'Unpublish' : 'Publish'}</button>
            </form>
            <form onSubmit={(e) => DeletePost(e)}>
                <button type='submit'>Delete this post</button>
            </form>
            {errors !== null &&
            <p>{errors}</p>}
            <br></br>
            <Link to={'/posts/' + post._id}>Read more</Link>
        </div>
    )
}

export default PostMini