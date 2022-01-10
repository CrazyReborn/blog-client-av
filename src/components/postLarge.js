import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Comment from "./comment";
import CommentForm from './commentForm';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO'
import './styles/postlarge.css';

function PostLarge() {
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/${id}`)
        .then(response => response.json())
        .then(json => json.post)
        .then(post => {
            setPost(post);
            setComments(post.comments);
        })
        .catch(err => console.log('There was an error while fetching post: ', err))
    }, [id, comments]);

    return (
        <div>
            {
            post == null ? 
            <div>Loading</div>
            :
            <div className='main'>
                <div className='postLarge'>
                    <h1>{post.title}</h1>
                    <h2>By {post.author.username}</h2>
                    <h3>{format(parseISO(post.date), 'do MMMM u, H:m')}</h3>
                    <article>
                        {post.text.split('<break>').map(paragraph => {
                            return (
                                <p>{paragraph}</p>
                            )
                        })}
                    </article>
                </div>
                <CommentForm />
                <h3>Comments:</h3>
                {comments.length !== 0 ?
                 comments.sort((a,b) => {return new Date(b.date) - new Date(a.date)}).map(comment => {
                     return (
                        <Comment key={comment._id} comment={comment} />
                     )
                })
                : <div>There are no comments yet...</div>
                }
            </div>
            }  
        </div>     
    )
}

export default PostLarge