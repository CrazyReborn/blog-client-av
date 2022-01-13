import { useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function PostForm (props) {
    const post = props.post;
    const apikey = props.apikey;
    const setUpdating = props.setUpdating;
    const updating = props.updating;
    const navigate = useNavigate();
    const {id} = useParams();
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    
    const [author, setAuthor] = useState(post.author);
    const [title, setTitle] = useState(post.title);
    const [text, setText] = useState(post.text);
    const [date, setDate] = useState(post.date);
    const [comments, setComments] = useState(post.comments);
    const [published, setPublished] = useState(post.published);

    const saveChanges = (e) => {
        e.preventDefault();
        console.log(text)
        fetch(`http://localhost:5000/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'authorization' : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({author, title, text, date, comments, published})
        })
        .then(res => res.json())
        .then(json => {
            if (json.success === 'success') {
                setUpdating(!updating);
                navigate(`/posts/${id}`)
            }
            else {
                console.log(json.errors)
            }
        })
        .catch(err => console.log('There was an error during PUT operation: ', err))
    }

    return (
        <div>
            <Editor apiKey={apikey} value={text} init={{
                selector: 'textarea',
                add_form_submit_trigger : true
                }} onEditorChange={(value,e) => setText(value)} />
            <form onSubmit={e => saveChanges(e)}>
                <label htmlFor='title'>
                    <input type='text' name='title' defaultValue={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default PostForm