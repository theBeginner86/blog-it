import React, { useState } from 'react';
import {BrowserRouter as Router, Redirect, useHistory, Link} from 'react-router-dom';

function SignUp(props) {

    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(event){
        console.log("inside handel submit");
        event.preventDefault();
        const userData = {
            firstName,
            lastName,
            email,
            password
        };

        console.log("Submitted successfully", " user: ", userData);
        history.push("/");
        // return <Redirect to="/"/>
    };

    
    return ( 
        <Router>

        <div className="container signup content">
            <div  className="signup-heading">
                <h1>Signup</h1>
            </div>
            <div className="container">
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="container input-values">
                        <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/><br/>
                        <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/><br/> 
                        <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/> 
                        <input type="text" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                        <Link to="/"><button type="submit" className="submit-btn">Submit</button></Link>
                    </div>       
                </form>
            </div>
    
        </div>

        </Router>
    );
    
}
 
export default SignUp;