import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebase, db } from './firebase'
import { mapStateToProps, mapDispatchToProps } from './reducers/map.js'
import { loading } from './constants/loading.js';
import Pacman from './components/pacman.js';
import withAuthentication from './session/withAuthentication.js';
import SignUpPage from './components/signup.js';
import SignInPage from './components/signin.js';
import SignOutPage from './components/signout.js';
import GroupSearch from './components/groupSearch.js';
import AccountPage from './components/account.js';
import PasswordForgetPage from './components/passwordForget.js';
import Sidebar from './Sidebar.js'
import Notification from './Notification.js';
import AllGroup from './Allgroup.js';
import Userboard from './Userboard.js';
import Homepage from './Homepage.js';
import GroupPage from './Grouppage.js';
import * as routes from './constants/routes';
import './scss/_base.scss';

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
			console.log(snapshot.val())
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
				grouplist: data_list,
				status: snapshot.val().status,
				pool: snapshot.val().pool,
				first_visit_home: snapshot.val().first_visit_home,
    			first_visit_group: snapshot.val().first_visit_group,
				first_visit_group_search: snapshot.val().first_visit_group_search,
				first_visit_trophy: snapshot.val().first_visit_trophy,
			}
			this.props.updateUser(user);
			this.setState({user: user, loaded: true, loading:loading.NOTHING,});
		}).catch((err)=> {
			console.log("fetch user error",err);});
	}

	render(){
		if(this.state.loaded){
			return(
	      <div>
	        <Route pattern="/" component={props => <Sidebar />} />
	        <Route pattern="/" component={props => <Page location={props.location}/>} />
	      </div>
			);
		} else {
			return(
				<div>
					<Pacman />
				</div>
			);
		}
	}
}

const Page = (props) => (
	 <Switch location={props.location}>
		 <div className="navigation-auth">
			 <Route exact path={routes.LANDING} component={Homepage} />
			 <Route path={routes.SIGN_OUT} component={SignOutPage} />
			 <Route path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
			 <Route path={routes.HOME} component={Homepage} />
			 <Route path={routes.ACCOUNT} component={AccountPage} />
			 <Route path={routes.NOTIFICATION} component={Notification} />
			 <Route path={routes.SEARCHGROUP} component={GroupSearch} />
			 <Route path={routes.GROUPS} component={AllGroup} />
			 <Route path={routes.GROUPPAGE} component={GroupPage} />
			 <Route path={routes.USERBOARD} component={Userboard} />
			 <Route path={routes.SIGN_IN} render={() => (
						<Redirect to="/home" />
					)}/>
		 </div>
	 </Switch>

)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withAuthentication(Main)));
