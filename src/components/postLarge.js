import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Comment from "./comment";
import CommentForm from './commentForm';
import PostForm from "./postform";
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO'
import './styles/postlarge.css';
import parse from 'html-react-parser';

function PostLarge() {
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    const { id } = useParams();
    const [updatingPost, setUpdatingPost] = useState(false);
    const [tinymceKey, setTinymceKey] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/api/posts/${id}`)
        .then(response => response.json())
        .then(json => json.post)
        .then(post => {
            setPost(post);
            setComments(post.comments);
        })
        //DO I NEED IT?
        // .catch(err => console.log('There was an error while fetching post: ', err));
        // fetch('http://localhost:5000/api/tinymce-api-key')
        // .then(res => res.json())
        // .then(json => setTinymceKey(json.apikey))
        // .catch(err => console.error(`There was an error while fetching apikey for tinymce editor: ${err}`))
    }, [id, comments]);

    //render the post
    if(!updatingPost) {
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
                        {parse(`<article>${post.text}</article>`)}
                        <button onClick={(e) => setUpdatingPost(!updatingPost)}>Update this post</button>
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
    //render the form
    else {
        return (
            <PostForm updating={updatingPost} setUpdating={setUpdatingPost} post={post} apikey={tinymceKey}/>
        )
    }
}

export default PostLarge