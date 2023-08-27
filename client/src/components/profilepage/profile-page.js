import React, {useState, useEffect} from 'react';
import {useHistory, Redirect} from 'react-router-dom';

import { getUserDetails, getUserBlogs, deleteBlog } from '../../api/userApi';

import './profile-page.css';

const profilePictureUrl = "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg";

function ProfilePage(props){

    const {isLogout, setIsLogout} = props;

    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userid, setUserid] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [delStatus, setDelStatus] = useState({});
    const [delBlog, setDelBlog] = useState("");

    console.log("inside try profile page");
    console.log(isLogout);
    console.log("outside fun");

    const fun = async() => {
        console.log("inside func");
        if(!isLogout){
            console.log("not logged out")
            const token = localStorage.getItem("token");
            const {data} = await getUserDetails(token);
            console.log(data);
            if(data.success){
                const currentUser = data.user[0];
                console.log(currentUser);
                setFirstName(currentUser.firstName);
                setLastName(currentUser.lastName);
                setUserid(currentUser._id);
                setEmail(currentUser.email)
            } else {
                return <Redirect to="/"/>
            }
        }else{
            return <Redirect to="/"/>
        }
    }

    fun();

    async function deleteBlogs(blogid) {
        setDelBlog(blogid);
        const {data} = await deleteBlog(blogid, localStorage.getItem("token"));
        console.log(data);
        setDelStatus(data);

        console.log("clicked", blogid);
    }

    // async function updateBlogs(blogid, title, content) {
    //     console.log("inside update");
    //     console.log(props)
    //     props = {
    //         blogid,
    //         title,
    //         content
    //     };
    //     console.log(props);
    // }

    useEffect(() => {
        const fetchBlogs = async () => {
            console.log(userid)
            const {data} = await getUserBlogs(userid, localStorage.getItem("token"));
            console.log(data);
            setBlogs(data.blogs);
            console.log(blogs);
        };
        fetchBlogs();
    }, [userid, delBlog]);

    return (
        <div className="content">
            <h1 className="heading-per-page">My Profile</h1>
            <div className="profile-content">
                <div className="main main-raised">
                    <div className="container profile" Style={"text-align: center;margin: auto;"}>
                        <div className="avatar">
                            {/* <img className="img-raised rounded-circle img-fluid" src={profilePictureUrl} alt="Circle-Image"/> */}
                        </div>
                        <div className="name">
                            <h3 className="title" style={{margin: "auto"}}>{firstName} {lastName}</h3>
                            <h6>{email}</h6>
                            <h6>Designer</h6>
                            <a href="#pablo" className="btn btn-just-icon btn-link btn-dribbble"><i className="fa fa-dribbble"></i></a>
                            <a href="#pablo" className="btn btn-just-icon btn-link btn-twitter"><i className="fa fa-twitter"></i></a>
                            <a href="#pablo" className="btn btn-just-icon btn-link btn-pinterest"><i className="fa fa-pinterest"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            {   
                (!blogs)  
                ? 
                (
                    <div className="blog-content">
                        <div className="main main-raised">
                            <div className="container blog">
                                <h1 className="title">Test Book</h1>
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
                blogs.slice(0).reverse().map((blog, index) => {
                    return (
                        <React.Fragment>
                            <h1 className="heading-per-page">My Books</h1>
                            <div className="blog-content" key={index}>
                                <div className="main main-raised">
                                    <div className="container blog">
                                        {
                                            (!delStatus.success && blog._id===delBlog) ?  <div className="err-msg"><div className="msg">{delStatus.message}</div></div> : <div className="err-msg"></div>
                                        }
                                        <div className="ud-op">
                                            {/* <button className="update-btn" onClick={() => updateBlogs(blog._id, blog.title, blog.content)}>Update</button> */}
                                            <button className="delete-btn" onClick={() => deleteBlogs(blog._id)}>Delete</button>
                                        </div>
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

export default ProfilePage;
