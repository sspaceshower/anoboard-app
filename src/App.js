import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Navigation from './components/navigation.js';
import LandingPage from './components/landingpage.js';
import SignUpPage from './components/signup.js';
import SignInPage from './components/signin.js';
import Sidebar from './Sidebar.js'
import Notification from './notification.js';
import GroupSearch from './components/groupSearch.js';
import AllGroup from './Allgroup.js';
import PasswordForgetPage from './components/passwordForget.js';
import Homepage from './homepage.js';
import AccountPage from './components/account.js';
import withAuthentication from './session/withAuthentication.js';
import * as routes from './constants/routes';

import './index.css';

const App = () => (
  <Router>
    <div id="outer-wrap">
      <Route pattern="/" component={props => <Sidebar />}/>
      <Main />
    </div>
  </Router>
)

const Main = () => (
  <Switch>
    <div className="app">
      <Route exact path={routes.LANDING} component={Homepage} />
      <Route path={routes.SIGN_UP} component={SignUpPage} />
      <Route path={routes.SIGN_IN} component={SignInPage} />
      <Route path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={routes.HOME} component={Homepage} />
      <Route path={routes.ACCOUNT} component={AccountPage} />
      <Route path={routes.NOTIFICATION} component={Notification} />
      <Route path={routes.SEARCHGROUP} component={GroupSearch} />
      <Route path={routes.GROUPS} component={AllGroup} />
      <Route path={routes.CS101} component={AllGroup} />
      {/* <span>Found in <a href="https://roadtoreact.com/course-details?courseId=TAMING_THE_STATE">Taming the State in React</a></span> | <span>Star the <a href="https://github.com/rwieruch/react-firebase-authentication">Repository</a></span> | <span>Receive a <a href="https://www.getrevue.co/profile/rwieruch">Developer's Newsletter</a></span> */}
    </div>
  </Switch>
)


export default withAuthentication(App);
