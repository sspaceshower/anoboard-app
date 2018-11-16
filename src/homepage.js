import React, { Component } from 'react';

import withAuthorization from './session/withAuthorization.js';
import { db } from './firebase';
import { Container, Row, Col } from 'react-bootstrap';
import FullBoard from './components/fullboard.js';
import Sidebar from './components/sidebar.js';
// import { fetchUserData, fetchBoardData } from '../../helper/fetchdata.js'

const paddingSet = {
  paddingLeft: '40px',
  paddingRight: '40px'
}

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: {},
      boards: {}
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ boards: snapshot.val() }))
    );
  }

  render() {
    const { users,boards } = this.state;

    return (
      <Container fluid>
          <Row className="wrapper">
              <Sidebar currentUser={users}/>
              <Col md={{span:10, offset: 2}} style={paddingSet}>
                <FullBoard currentUser={users} board={boards}/>
              </Col>
          </Row>
        </Container>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Homepage);
