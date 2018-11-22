import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Main from './Main.js'
import withAuthentication from './session/withAuthentication.js';
import AuthUserContext from './session/authUserContext';
import SignUpPage from './components/signup.js';
import SignInPage from './components/signin.js';
import SignOutPage from './components/signout.js';
import PasswordForgetPage from './components/passwordForget.js';
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
      <Route path={routes.SIGN_UP} component={SignUpPage} />
      <Route path={routes.SIGN_IN} component={SignInPage} />
      <Route path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={routes.SIGN_OUT} component={SignOutPage} />
      <Route exact path={routes.LANDING} render={() => (
           <Redirect to="/signin" />
         )}/>
      {/*TODO: <frontend> this could be done more neatly, will come back later*/}
    </div>
  </Switch>
)

export default withRouter(withAuthentication(App));
