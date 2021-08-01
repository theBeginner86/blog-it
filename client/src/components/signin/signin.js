import React, {useState} from 'react';
import {useHistory, Redirect} from 'react-router-dom'
import {signinExistingUser} from "../../api/userApi";
import './signin.css'

function SignIn(props) {

    console.log(props);
    const {setIsLogout, isLogout} = props;
    console.log(isLogout);
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [signinResponse, setSigninResponse] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const userData = {
            email,
            password
        };

        try {
            const {data} = await signinExistingUser(userData);
            console.log("data: ", data)
            setSigninResponse(data);
            console.log("signinResponse: ", signinResponse);
            if(data.success){
                setIsLogout(false);
                localStorage.setItem("token", data.accessToken);
                history.push("/");
                return <Redirect to="/"/>
            }
        } catch(err) {
            setSigninResponse({message: err});
        }
    }

    return (
        <div className="container signin content">

            <div  className="signin-heading">
                <h1>Login</h1>
            </div>
            <div className="container">
                <form onSubmit={handleSubmit} className="signin-form">
                    <div className="container input-values">
                        {
                            (!signinResponse.success) ?  <div className="err-msg">{signinResponse.message}</div> : <div className="err-msg"></div>
                        }
                       
                        <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/><br/> 
                        <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/><br/>
                        <button type="submit" className="submit-btn">Sign In</button>
                    </div>       
                </form>
            </div>
    
        </div>
    );
}

export default SignIn;
