import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebase, db } from './firebase'
import { mapStateToProps, mapDispatchToProps } from './reducers/map.js'
import { loading } from './constants/loading.js';
import Pacman from './components/util/pacman.js';
import withAuthentication from './session/withAuthentication.js';
import SignUpPage from './components/authentication/signup.js';
import SignInPage from './components/authentication/signin.js';
import SignOutPage from './components/authentication/signout.js';
import GroupSearch from './components/groups/groupSearch.js';
import AccountPage from './components/users/account.js';
import PasswordForgetPage from './components/authentication/passwordForget.js';
import Sidebar from './Sidebar.js'
import Notifications from './Notification.js';
import Messages from './Messages.js';
import Inventory from './Inventory.js';
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

	componentWillReceiveProps(){
    this.setState({reload: true});
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
				grouplist: data_list,
				status: snapshot.val().status,
				pool: snapshot.val().pool,
				first_visit_home: snapshot.val().first_visit_home,
    		first_visit_group: snapshot.val().first_visit_group,
				first_visit_group_search: snapshot.val().first_visit_group_search,
				first_visit_trophy: snapshot.val().first_visit_trophy,
				get_item: snapshot.val().get_item,
			}
			this.props.updateUid(user.uid);
			this.props.updateUsername(user.username);
			this.props.updateEmail(user.email);
			this.props.updateFname(user.fname);
			this.props.updateMname(user.mname);
			this.props.updateLname(user.lname);
			this.props.updateBio(user.biography);
			this.props.updateGroups(user.grouplist);
			this.props.updateStatus(user.status);
			this.props.updatePool(user.pool);
			this.props.updateFVH(user.first_visit_home);
			this.props.updateFVG(user.first_visit_group);
			this.props.updateFVGS(user.first_visit_group_search);
			this.props.updateFVT(user.first_visit_trophy);
			this.props.updateGet(user.get_item);

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
					<Pacman Fullscreen />
				</div>
			);
		}
	}
}

const Page = (props) => (
	 <Switch location={props.location}>
		 <div className="navigation-auth">
			 <Route exact path={routes.LANDING} component={Homepage} />
			 <Route exact path={routes.SIGN_OUT} component={SignOutPage} />
			 <Route exact path={routes.HOME} component={Homepage} />
			 <Route exact path={routes.ACCOUNT} component={AccountPage} />
			 <Route exact path={routes.NOTIFICATIONS} component={Notifications} />
			 <Route exact path={routes.MESSAGES} component={Messages} />
			 <Route exact path={routes.INVENTORY} component={Inventory} />
			 <Route exact path={routes.SEARCHGROUP} component={GroupSearch} />
			 <Route exact path={routes.GROUPS} component={AllGroup} />
			 <Route exact path={routes.GROUPPAGE} component={GroupPage} />
			 <Route exact path={routes.USERBOARD} component={Userboard} />
			 <Route exact path={routes.SIGN_IN} render={() => (
						<Redirect to="/home" />
					)}/>
		 </div>
	 </Switch>

)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withAuthentication(Main)));
