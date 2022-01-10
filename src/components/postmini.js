import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO'

function PostMini(props) {
    const post = props.post;
    return (
        <div className='post'>
            <h3>{post.title} by {post.author.username}</h3>
            <p>{format(parseISO(post.date), 'do MMMM u')}</p>
            <Link to={'/posts/' + post._id}>Read more</Link>
        </div>
    )
}

export default PostMini