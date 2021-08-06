import React, {useState} from 'react';
import { Redirect, useHistory } from 'react-router';

import { composeBlog } from '../../api/userApi';

import './compose.css';

function Compose(props){

    const history = useHistory();

    const [blog, setBlog] = useState("");
    const [title, setTitle] = useState("");

    const [composeResponse, setComposeResponse] = useState("");

    async function handleSubmit(event){
        event.preventDefault();

        const blogDetails = {
            title,
            content: blog
        };
        console.log(blogDetails);

        try {
            const {data} = await composeBlog(blogDetails, localStorage.getItem("token"));
            console.log(data);
            setComposeResponse(data);
            if(data.success){
                console.log("inside if");
                setBlog("");
                setTitle("");
            }

        } catch(err) {
            console.log("inside catch");
            setComposeResponse({message: err})
        }

        console.log(blogDetails);
    }


    return (
        <div className="content" id="#compose-blog">
            <div className="blog-content">
                <div className="main main-raised">
                    <div className="container blog">
                        <h1 className="title">Compose</h1>
                        <hr/>
                        <form onSubmit={handleSubmit} className="compose-area">
                        {
                            (!composeResponse.success) ?  <div className="err-msg">{composeResponse.message}</div> : <div className="success-msg">Blog Saved Successfully</div>
                        }
                            <input className="title" type="text" name="title" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)}/><br/>
                            <textarea type="text" cols="111" rows="10" name="blog" value={blog} placeholder="Use this area to compose your blog" onChange={(e) => setBlog(e.target.value)}/><br/>
                            <hr Style={"margin-top:1rem"}/>
                            <div className="submit-btn">
                                <button type="submit" onClick={handleSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Compose;
