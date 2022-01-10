import { useParams } from 'react-router-dom'
import { useState } from 'react';
import './styles/commentform.css';

function CommentForm () {
    const { id } = useParams();
    const [author, setAuthor] = useState('');
    const [text, setText] = useState('');

    

    const FetchPostComment = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/api/posts/${id}/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({author, text})
        })
        .then(response => { setAuthor(''); setText('')})
        .catch(err => console.log('Error posting data ' + err));
    }

return (
    <>
    <form className='commentForm' onSubmit={FetchPostComment}>
        <h3>Leave a comment:</h3>
        <label htmlFor='author'>Author:<br/>
        <input type='text' name='author' require='true' value={author} onChange={(e) => {setAuthor(e.target.value)}} />
        </label>
        <label htmlFor='text'>Text: <br/>
        <textarea name='text' placeholder='Add your comment' require='true' cols='50' value={text} onChange={(e) => {setText(e.target.value)}}/>
        </label>
        <button type='submit'>Submit</button>
    </form>
    </>
    )
}

export default CommentForm