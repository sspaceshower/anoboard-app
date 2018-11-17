import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './components/navigation.js';
import LandingPage from './components/landingpage.js';
import SignUpPage from './components/signup.js';
import SignInPage from './components/signin.js';
import PasswordForgetPage from './components/passwordForget.js';
import Homepage from './homepage.js';
import AccountPage from './components/account.js';
import Class from './components/class.js'
import withAuthentication from './session/withAuthentication.js';
import * as routes from './constants/routes';

import './index.css';

const App = () =>
  <Router>
    <div className="app">


      <Route exact path={routes.LANDING} component={Homepage} />
      <Route path={routes.SIGN_UP} component={SignUpPage} />
      <Route path={routes.SIGN_IN} component={SignInPage} />
      <Route path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={routes.HOME} component={Homepage} />
      <Route path={routes.ACCOUNT} component={AccountPage} />


      {/* <span>Found in <a href="https://roadtoreact.com/course-details?courseId=TAMING_THE_STATE">Taming the State in React</a></span> | <span>Star the <a href="https://github.com/rwieruch/react-firebase-authentication">Repository</a></span> | <span>Receive a <a href="https://www.getrevue.co/profile/rwieruch">Developer's Newsletter</a></span> */}
    </div>
  </Router>

export default withAuthentication(App);
