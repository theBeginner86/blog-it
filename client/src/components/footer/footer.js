import React from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import './footer.css';
import githubLogo from '../../assets/images/github.png';
import linkedinLogo from '../../assets/images/linkedin.png';
import twitterLogo from '../../assets/images/twitter.png';

function Footer(props){
    return (
        <div className="footer">
            <div className="container footer-info">
                    {/* <Link className="footer-link" to={{pathname: "https://github.com/theBeginner86"}} target="_blank"><img className="profile-img" src={githubLogo} alt="github-icon"/></Link>
                    <Link className="footer-link" to={{pathname: "https://www.linkedin.com/in/pranav-singh-00904b1bb/"}} target="_blank"><img className="profile-img" src={linkedinLogo} alt="linkedin-icon"/></Link>
                    <Link className="footer-link" to={{pathname: "https://twitter.com/theBeginner86"}} target="_blank"><img className="profile-img" src={twitterLogo} alt="twitter-icon"/></Link> */}
                    <p className="copyright">© 2022 Pranav Singh.</p>
            </div>   
        </div>
    )
}

export default Footer;
