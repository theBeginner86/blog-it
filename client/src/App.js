import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from 'react-router-dom';

import HomePage from './components/home-page';
import MyNavbar from './components/navbar/navbar';
import SignUp from './components/signup/signup';
import SignIn from './components/signin/signin';


function App() {
  const history = useHistory();

  const [logoutStatus, setlogoutStatus] = useState(true);

  const logOutHandle = async () => {
    setlogoutStatus(false);
    localStorage.removeItem("token");
    // console.log(history);
    // history.push("/");
    // return <Redirect to="/"/>
  }

  return (
    <Router>
        <MyNavbar logOutHandle={logOutHandle}/>
        <Switch>
          <Route path='/' component={HomePage} exact/>
          <Route path='/signup' component={SignUp} />
          <Route path="/signin" component={SignIn}/>
        </Switch>
    </Router>
  );
}

export default App;
