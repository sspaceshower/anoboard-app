import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebase, db } from './firebase'
import { mapStateToProps, mapDispatchToProps } from './reducers/map.js'
import { loading } from './constants/loading.js';
import withAuthentication from './session/withAuthentication.js';
import AuthUserContext from './session/authUserContext';
import LandingPage from './components/landingpage.js';
import SignUpPage from './components/signup.js';
import SignInPage from './components/signin.js';
import GroupSearch from './components/groupSearch.js';
import AccountPage from './components/account.js';
import PasswordForgetPage from './components/passwordForget.js';
import Sidebar from './Sidebar.js'
import Notification from './Notification.js';
import AllGroup from './Allgroup.js';
import Userboard from './Userboard.js';
import Homepage from './Homepage.js';
import GroupPage from './Grouppage.js';
import Group from './components/group.js';
import * as routes from './constants/routes';

class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loaded: false,
			loading: loading.NOTHING,
			user: {},
		};
	}

	componentDidMount() {
		this.fetchUserData()
	}

	fetchUserData(){
		this.setState({
			loading:loading.RELOADING
		});

		db.onceGetOneUser(firebase.auth.currentUser.uid).then(snapshot =>
		{
			const data_list = [];
			if(snapshot.val().grouplist !== undefined && snapshot.val().grouplist !== null){
				for (const [key, value] of Object.entries(snapshot.val().grouplist)) {
					var childData = value.name;
					data_list.push(childData);
				}
			}
			var user = {
				uid: snapshot.val().uid,
				username: snapshot.val().username,
				email: snapshot.val().email,
				fname: snapshot.val().fname,
				mname: snapshot.val().mname,
				lname: snapshot.val().lname,
				biography: snapshot.val().biography,
				grouplist: data_list
			}
			this.props.updateUser(user);
			this.setState({user: user, loaded:true, loading:loading.NOTHING,});
		}).catch((err)=> {
			console.log("fetch user error",err);});
	}

	render(){
		if(this.state.loaded){
			return(
	      <div>
	        <Route pattern="/" component={props => <Sidebar />} />
	        <Page />
	      </div>
			);
		} else {
			return(<div>loader..</div>);
		}
	}
}

const Page = () => (
  <Switch>
    <div className="navigation-auth">
      <Route exact path={routes.LANDING} component={Homepage} />
      <Route path={routes.SIGN_UP} component={SignUpPage} />
      <Route path={routes.SIGN_IN} component={SignInPage} />
      <Route path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={routes.HOME} component={Homepage} />
      <Route path={routes.ACCOUNT} component={AccountPage} />
      <Route path={routes.NOTIFICATION} component={Notification} />
      <Route path={routes.SEARCHGROUP} component={GroupSearch} />
      <Route path={routes.GROUPS} component={AllGroup} />
      <Route path={routes.GROUPPAGE} component={GroupPage} />
      <Route path={routes.USERBOARD} component={Userboard} />
      {/* <span>Found in <a href="https://roadtoreact.com/course-details?courseId=TAMING_THE_STATE">Taming the State in React</a></span> | <span>Star the <a href="https://github.com/rwieruch/react-firebase-authentication">Repository</a></span> | <span>Receive a <a href="https://www.getrevue.co/profile/rwieruch">Developer's Newsletter</a></span> */}
    </div>
  </Switch>
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withAuthentication(Main)));
