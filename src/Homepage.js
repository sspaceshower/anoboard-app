import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import withAuthorization from './session/withAuthorization.js';
import AuthUserContext from './session/authUserContext.js';
import { db, auth, firebase } from './firebase';
import { loading } from './constants/loading.js';
import FullBoard from './components/fullboard.js';
import { withAuthConst } from './session/withAuthConst';

// import { fetchUserData, fetchBoardData } from '../../helper/fetchdata.js'

const paddingSet = {
  paddingLeft: '40px',
  paddingRight: '40px',
}

class Homepage extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: null,
      board: null,
      loaded_user: false,
      loading_user: loading.NOTHING,
      loaded_board: false,
      loading_board: loading.NOTHING,
    };
  }

  fetchUserData(){
    this.setState({
      loading_user:loading.RELOADING
    });
    db.onceGetOneUser(firebase.auth.currentUser.uid).then(snapshot =>
    {
      var user = {
        username: snapshot.val().username,
        fname: snapshot.val().fname,
        mname: snapshot.val().mname,
        lname: snapshot.val().lname,
        biography: snapshot.val().biography,
        uid: snapshot.val().uid,
      }
      this.setState({user: user, loaded_user:true,loading_user:loading.NOTHING,});
    }).catch((err)=> {
      console.log("fetch user error",err);});
  }

  fetchBoardData(){
    this.setState({
      loading_board:loading.RELOADING
    });
    db.onceGetBoards().then(snapshot =>
      {
        var board = null;
        for (const [key, value] of Object.entries(snapshot.val())){
          if (key === this.state.user.username){
            board = value;
            break;
          }
        }
      this.setState({userboard: board, loaded_board:true,loading_board:loading.NOTHING,});
    }).catch((err)=> {
      console.log("fetch board error",err);});
  }

  componentDidMount() {
    this.fetchUserData();
    this.fetchBoardData();
  }

  render() {

    if (this.state.loaded_user && this.state.loaded_board){
      return (
        <Container fluid>
          <Row className="wrapper">
              <Col md={{span:10, offset: 2}} style={paddingSet}>
                <FullBoard currentUser={this.state.user} board={this.state.board}/>
              </Col>
          </Row>
        </Container>
      );
    } else {
      return(<div>Loading...</div>);
    }
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Homepage);
