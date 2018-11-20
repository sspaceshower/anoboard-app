import React, { Component } from 'react';

import withAuthorization from './session/withAuthorization.js';
import AuthUserContext from './session/authUserContext.js';
import { db, auth } from './firebase';
import { firebase } from './firebase';
import { Container, Row, Col } from 'react-bootstrap';
import FullBoard from './components/fullboard.js';
import {withAuthConst} from './session/withAuthConst';

// import { fetchUserData, fetchBoardData } from '../../helper/fetchdata.js'

const paddingSet = {
  paddingLeft: '40px',
  paddingRight: '40px',
}

class Homepage extends Component {

  constructor(props){
    super(props);
    this.state = {
      loaded:false,
      loading:loading.NOTHING,
      authUser: null,
      users: {},
      boards: {},
      user: {},
    };
  }

  fetchUserData(){
    this.setState({
      loading:loading.RELOADING
    });
    db.onceGetOneUser(firebase.auth.currentUser.uid).then(snapshot =>
    {
      var user = {
        username: snapshot.val().username,
        fname: snapshot.val().fname,
        mname: snapshot.val().mname,
        lname: snapshot.val().lname,
        biography: snapshot.val().biography,
      }
      this.setState({user: user, loaded:true,loading:loading.NOTHING,});
    }).catch((err)=> {
      console.log("fetch user error",err);});
  }

  componentDidMount() {
    this.fetchUserData();
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
    db.onceGetBoards().then(snapshot =>
      this.setState(() => ({ boards: snapshot.val() }))
    );

    firebase.auth.onAuthStateChanged( authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null});
    })




  }

  render() {
    const { users,boards } = this.state;
    var board, currentUser;
    console.log("authUser")
        console.log(this.state.authUser)

        if (this.state.authUser != null){
          for (const [key, value] of Object.entries(boards)) {
            if (this.state.authUser.uid === key){
              console.log("HEYHELPP!");
              console.log(key, value);
              board = value
              console.log(board);
            }
            // console.log("key, value");
            // console.log(key, value);
          }
        }

    if (this.state.loaded){
      return (
        <Container fluid>
          <Row className="wrapper">
              <Col md={{span:10, offset: 2}} style={paddingSet}>
                <FullBoard currentUser={this.state.user} board={board}/>
              </Col>
          </Row>
        </Container>
      );
    } else {
      return(<div>Loading...</div>);
    }
  }
}

const loading={
	NOTHING:0,
	SERVER_QUERYING:1,
	RELOADING:2
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Homepage);
