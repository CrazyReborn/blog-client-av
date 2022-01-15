import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import { useState } from 'react/cjs/react.development';
import './styles/comment.css';

function Comment (props) {
    const comment = props.comment;
    const token = localStorage.getItem('authToken');
    const [error, setError] = useState(null);

    const DeleteComment = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/api/comments/${comment._id}`, {
            method: 'DELETE',
            headers: {
                'authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json',
            }
        })
        .then(res => res.sendStatus())
        .then(status => {
            if (status === 404) {
                setError('not found')
            }
        })
        .catch(err => setError(err));
    }

    if (comment !== null) {
        return (
            <div className='comment'>
                <h3>{comment.author}</h3> 
                <p className='commentDate'>on {format(parseISO(comment.date), 'do MMMM u, H:m')} says:</p>
                <p>{comment.text}</p>
                {error !== null && <p>error</p>}
                <form onSubmit={(e) => DeleteComment(e)}>
                    <button type='submit'>Delete this comment</button>
                </form>
            </div>
        )
    } else {
        return (
            <div>Loading comment</div>
        )
    }


}

export default Comment