import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchUserData, fetchBoardData } from './helper/fetchdata.js'
import FullBoard from './elements/fullboard.js';
import Sidebar from './elements/sidebar.js';

const paddingSet = {
  paddingLeft: '40px',
  paddingRight: '40px'
}

class Myboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //TODO: <mockup> to be changed when fetchUserData and fetchBoardData is complemented
      // need to have id (20160000) of someone as argument
      currentUser: fetchUserData("20160843"),
      board: fetchBoardData("<mockup>")
    }
  }
  render() {
    return (
      <Container fluid>
        <Row className="wrapper">
            <Sidebar currentUser={this.state.currentUser}/>
            <Col md={{size:10, offset: 2}} style={paddingSet}>
              <FullBoard currentUser={this.state.currentUser} board={this.state.board}/>
            </Col>
        </Row>
      </Container>
    );
  }
}

export default Myboard;
