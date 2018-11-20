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
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      users: {},
      boards: {}
    };
  }

  componentDidMount() {
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
            }
            // console.log("key, value");
            // console.log(key, value);
          }          
        }

    return (
      
      <AuthUserContext.Consumer>
        
          {authUser =>
            <Container fluid>
              <Row className="wrapper">
                  <Col md={{span:10, offset: 2}} style={paddingSet}>
                    <FullBoard currentUser={authUser} board={board} users = {users}/>
                  </Col>
              </Row>
            </Container>
          }
      </AuthUserContext.Consumer>

    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Homepage);
