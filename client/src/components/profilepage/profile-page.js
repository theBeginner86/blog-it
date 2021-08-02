import React, {useState} from 'react';
import {useHistory, Redirect} from 'react-router-dom';

import { getUserDetails } from '../../api/userApi';

import './profile-page.css';

const profilePictureUrl = "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg";

function ProfilePage(props){

    const {isLogout, setIsLogout} = props;

    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    

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
                setEmail(currentUser.email)
            } else {
                return <Redirect to="/"/>
            }
        }else{
            return <Redirect to="/"/>
        }
    }

    fun();

    return (
        <div className="content">
            <div className="main main-raised">
                <div className="profile-content" Style={"text-align: center; width: 40rem; margin: auto;"}>
                    <div className="container profile">
                        <div className="avatar">
                            <img className="img-raised rounded-circle img-fluid" src={profilePictureUrl} alt="Circle-Image"/>
                        </div>
                        <div className="name">
                            <h3 className="title">{firstName} {lastName}</h3>
                            <h6>{email}</h6>
                            <h6>Designer</h6>
                            <a href="#pablo" className="btn btn-just-icon btn-link btn-dribbble"><i className="fa fa-dribbble"></i></a>
                            <a href="#pablo" className="btn btn-just-icon btn-link btn-twitter"><i className="fa fa-twitter"></i></a>
                            <a href="#pablo" className="btn btn-just-icon btn-link btn-pinterest"><i className="fa fa-pinterest"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
