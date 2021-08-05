import React, {useState, useEffect} from 'react'

import { getAllBlogs } from '../../api/userApi';

import './blog.css';

function Blogs(props){

    const [blogs, setBlogs] = useState([]);

    console.log(blogs);

    useEffect(() => {
        const fetchBlogs = async () => {
            const {data} = await getAllBlogs();
            console.log(data);
            setBlogs(data.blogs);
            console.log(blogs);
        };
        fetchBlogs();
    }, []);

    return (

        <div className="content">
        {   
            (blogs.length <= 1) ? 

            (
                <div className="blog-content">
                    <div className="main main-raised">
                        <div className="container blog">
                            <h1 className="title">Test Blog</h1>
                            <hr/>
                            <p className="description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
                                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <hr/>
                            <div className="blog-info">
                                <p className="time">Time</p>
                                <p className="author-info">Random person</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
            :
            blogs.map((blog, index) => {
                return (
                    <React.Fragment>
                        <div className="blog-content" key={index}>
                            <div className="main main-raised">
                                <div className="container blog">
                                    <h1 className="title">{blog.title}</h1>
                                    <hr/>
                                    <p className="description">
                                        {blog.content}
                                    </p>
                                    <hr/>
                                    <div className="blog-info">
                                        <p className="time">{blog.dateCreated}</p>
                                        <p className="author-info">{blog.author}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })
        }

        </div>
    );
}

export default Blogs;
