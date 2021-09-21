import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './components/homepage/home-page';
import MyNavbar from './components/navbar/navbar';
import SignUp from './components/signup/signup';
import SignIn from './components/signin/signin';
import Footer from './components/footer/footer';
import ProfilePage from './components/profilepage/profile-page';
import Blogs from './components/blogs/blog';
import Compose from './components/compose/compose';


function App(props) {

  const [isLogout, setIsLogout] = useState(true);
  // console.log(props.title);

  useEffect(() => {
    if(localStorage.getItem("token")){
      setIsLogout(false);
    } else {
      setIsLogout(true);
    }
  }, [isLogout]);

  const logOutHandle = () => {
    setIsLogout(true);
    localStorage.removeItem("token");
  }

  return (
    <Router>
        <MyNavbar logOutHandle={logOutHandle} isLogout={isLogout}/>
        <Switch>
          <Route path='/' component={HomePage} exact/>
          <Route path='/signup' component={SignUp} />
          <Route path="/signin" render={(props) => (<SignIn {...props} isLogout={isLogout} setIsLogout={setIsLogout} />)}/>
          <Route path='/profile' render={(props) => (<ProfilePage {...props} isLogout={isLogout} setIsLogout={setIsLogout} />)}/>
          <Route path='/blogs' component={Blogs}/>
          <Route path='/compose' component={Compose}/>
        </Switch>
        <Footer/>
    </Router>
  );
}

export default App;
