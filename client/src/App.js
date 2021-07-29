import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/home-page';
import MyNavbar from './components/navbar';
import SignUp from './components/signup';

function App() {
  return (
    <Router>
        <MyNavbar/>
        <Switch>
          <Route path='/' component={HomePage} exact/>
          <Route path='/signup' component={SignUp} />
        </Switch>
    </Router>
  );
}

export default App;
