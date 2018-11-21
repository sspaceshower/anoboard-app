import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from './Main.js'
import withAuthentication from './session/withAuthentication.js';
import AuthUserContext from './session/authUserContext';
import SignUpPage from './components/signup.js';
import SignInPage from './components/signin.js';
import PasswordForgetPage from './components/passwordForget.js';
import Homepage from './Homepage.js';
import Group from './components/group.js';
import * as routes from './constants/routes';
import './index.css';

const App = () => (
  <div id="outer-wrap">
      <AuthUserContext.Consumer>
      {authUser => {
        if(authUser){
          return(
            <Main />
          );
        } else {
          return(<Page />);
        }
      }
      }
      </AuthUserContext.Consumer>

    </div>
)

const Page = () => (
  <Switch>
    <div className="navigation-non-auth">
      <Route exact path={routes.LANDING} component={Homepage} />
      <Route path={routes.SIGN_UP} component={SignUpPage} />
      <Route path={routes.SIGN_IN} component={SignInPage} />
      <Route path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
      {/* <span>Found in <a href="https://roadtoreact.com/course-details?courseId=TAMING_THE_STATE">Taming the State in React</a></span> | <span>Star the <a href="https://github.com/rwieruch/react-firebase-authentication">Repository</a></span> | <span>Receive a <a href="https://www.getrevue.co/profile/rwieruch">Developer's Newsletter</a></span> */}
    </div>
  </Switch>
)

export default withRouter(withAuthentication(App));
