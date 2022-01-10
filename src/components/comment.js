import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import './styles/comment.css';

function Comment (props) {
    const comment = props.comment;

    if (comment !== null) {
        return (
            <div className='comment'>
                <h3>{comment.author}</h3> 
                <p className='commentDate'>on {format(parseISO(comment.date), 'do MMMM u, H:m')} says:</p>
                <p>{comment.text}</p>
            </div>
        )
    } else {
        return (
            <div>Loading comment</div>
        )
    }


}

export default Comment