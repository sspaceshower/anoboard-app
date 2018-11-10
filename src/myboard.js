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
      //TODO: delete here later after fetchBoardData is done
      //user function like fetchUserInFirebase instead of state for board
      currentUser: null,      
      board: fetchBoardData("<mockup>")
    }
  }
  
  //Async part for fetching firebase
  state = {
    currentUser: null,
  };

  componentDidMount() {
    this._asyncRequest = this.fetchUserInFirebase().then(
      currentUser => {
        this._asyncRequest = null;
        this.setState({currentUser});
      }
    );
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel();
    }
  }
  
  fetchUserInFirebase(user) {
    var a = fetchUserData(user)
    console.log("AAAAAAAAAAAAAAAAAAA")
    console.log(a)
    a.then(function(result) {
      console.log("HOHOHOOHHOO")
      console.log(result) //will log results.
    })
    return a
  }
  render() {
    if (this.state.currentUser === null) {
      // Render loading state ...
      return (
        <Container fluid>
          <Row className="wrapper">
              LOADING!!!!
          </Row>
        </Container>
      );
    } else {
      // Render real UI ...
      return (
        <Container fluid>
          <Row className="wrapper">
              <Sidebar currentUser={this.fetchUserInFirebase("20160843")}/>            
              <Col md={{size:10, offset: 2}} style={paddingSet}>
                <FullBoard currentUser={this.fetchUserInFirebase("20160843")} board={this.state.board}/>
              </Col>
          </Row>
        </Container>
      );
    }
    
  }
}

export default Myboard;
