import React from 'react';
import './home-page.css'

function HomePage(props) {
    return ( 
        <div className="home-page content">
            <div className="container intro">
                <h1 className="heading-per-page">Blog it</h1>
                <div className="container blog-description">
                    <p style={{margin: "1rem auto", width: "fit-content"}}>This is a simple blogging app. You can create a new blog post, edit it, delete it and view it.</p>
                    <p style={{margin: "1rem auto", width: "fit-content"}}>It support account system and persisting of users blogs</p>
                    <p style={{margin: "1rem auto", width: "fit-content"}}>This project is part of Frontend Design and Testing (CSI3029)</p>
                    <br/>
                </div>
            </div>
        </div>
    );
}
 
export default HomePage;