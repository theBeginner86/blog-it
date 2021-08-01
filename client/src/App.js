import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './homepage/home-page';
import MyNavbar from './components/navbar/navbar';
import SignUp from './components/signup/signup';
import SignIn from './components/signin/signin';


function App(props) {

  const [isLogout, setIsLogout] = useState(true);

  useEffect(() => {
    if(localStorage.getItem("token")){
      setIsLogout(false);
    } else {
      setIsLogout(true);
    }
  }, []);

  const logOutHandle = async () => {
    setIsLogout(true);
    localStorage.removeItem("token");
    return <Redirect to="/"/>
  }

  return (
    <Router>
        <MyNavbar logOutHandle={logOutHandle} isLogout={isLogout}/>
        <Switch>
          <Route path='/' component={HomePage} exact/>
          <Route path='/signup' component={SignUp} />
          <Route path="/signin" render={(props) => (<SignIn {...props} isLogout={isLogout} setIsLogout={setIsLogout} />)}/>
        </Switch>
    </Router>
  );
}

export default App;
