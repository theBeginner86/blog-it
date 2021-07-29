import React, { useState } from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {signupNewUser} from '../api/userApi';

function SignUp(props) {

    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signupResponse, setSignupResponse] = useState("");

    async function handleSubmit(event){

        console.log("inside handel submit");
        event.preventDefault();
        const userData = {
            firstName,
            lastName,
            email,
            password
        };

        try {
            const { data } = await signupNewUser(userData);
            setSignupResponse(data);
            console.log(data);
            console.log(signupResponse);
            console.log(userData);

            if(data.success){
                console.log("Submitted successfully", " user: ", userData);
                history.push("/");
                return <Redirect to="/"/>
            }
            
        } catch (err) {
            setSignupResponse(err);
        }
    };

    
    return ( 
        <div className="container signup content">

            <div  className="signup-heading">
                <h1>Signup</h1>
            </div>
            <div className="container">
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="container input-values">
                        {
                            (!signupResponse.success) ?  <div className="err-msg">{signupResponse.message}</div> : <div className="err-msg"></div>
                        }
                       
                        <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/><br/>
                        <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}/><br/> 
                        <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/> 
                        <input type="text" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                        <button type="submit" className="submit-btn">Submit</button>
                    </div>       
                </form>
            </div>
    
        </div>
    );
    
}
 
export default SignUp;