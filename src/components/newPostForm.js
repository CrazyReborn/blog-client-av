import { useState } from "react";
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from "react-router-dom";

function NewPostForm(props) {

    const apikey = props.apikey;

    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('authToken'));

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const saveChanges = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, text })
        })
            .then(res => res.json())
            .then(json => {
                if (json.id !== undefined) {
                    navigate(`/posts/${json.id}`)
                }
                else {
                    console.log(json.error);
                }
            })
            .catch(err => console.log('There was an error during PUT operation: ', err))
    }

    return (
        <div>
            <form onSubmit={e => saveChanges(e)}>
                <label htmlFor='title'>
                    <input type='text' name='title' defaultValue={title} onChange={e => setTitle(e.target.value)} />
                </label>
                <Editor apiKey={apikey} value={text} init={{
                selector: 'textarea',
                add_form_submit_trigger: true
                }} onEditorChange={(value, e) => setText(value)} />
                <button type='submit'>Submit</button>
            </form>
            
        </div>
    )
}

export default NewPostForm