import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { fetchUserData, fetchBoardData } from './helper/fetchdata.js'
import FullBoard from './elements/fullboard.js';
import Sidemenu from './elements/sidemenu.js';

const paddingSet = {
  paddingLeft: '40px',
  paddingRight: '40px'
}

class Myboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //TODO: <mockup> to be changed when fetchUserData and fetchBoardData is complemented
      currentUser: fetchUserData("<mockup>"),
      board: fetchBoardData("<mockup>")
    }
  }
  render() {
    return (
      <Container fluid>
        <Row className="wrapper">
            <Sidemenu user={this.state.currentUser}/>
            <Col md={2}></Col>
            <Col md={10} style={paddingSet}>
              <FullBoard user={this.state.currentUser} board={this.state.board}/>
            </Col>
        </Row>
      </Container>
    );
  }
}

export default Myboard;
