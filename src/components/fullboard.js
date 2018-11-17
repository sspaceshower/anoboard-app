import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Board from './board.js';
import Profile from './profile.js';
import Trophy from './trophy.js';
import '../scss/userboard.scss';

class FullBoard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      users: this.props.users,
      boards: this.props.boards,
      board: null
    };
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState(() => ({ currentUser: this.props.currentUser }))
    }
    if (this.props.boards !== prevProps.boards) {
      this.setState(() => ({ boards: this.props.boards }))      
      // console.log("key, value");
      for (const [key, value] of Object.entries(this.props.boards)) {
        if (this.state.currentUser.uid === key){          
          this.setState(() => ({ board: value }))
        }
        // console.log("key, value");
        // console.log(key, value);
      }
    }
    if (this.props.users !== prevProps.users) {
      this.setState(() => ({ users: this.props.users }))
      // console.log("key, value");
      for (const [key, value] of Object.entries(this.props.users)) {
        if (this.state.currentUser.uid === key){
          console.log("PASSSSS!");
          console.log(key, value);
          this.setState(() => ({ currentUser: value }))
        }
        // console.log("key, value");
        // console.log(key, value);
      }
    }
  }
  render(){
    return(
      <Container fluid>
          <Row>
            <Col xs={12} md={6}><Profile user={this.state.currentUser}/></Col>
            <Col xs={12} md={6}>
              <Col className="wrap" id="trophy" style={{padding: '0'}}><Trophy /></Col>
            </Col>
          </Row>          
          <Row><Board currentUser = {this.state.currentUser} board = {this.state.board}/></Row>
      </Container>
    );
  }
}

export default FullBoard;
