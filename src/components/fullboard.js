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
      board: this.props.board
    };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState(() => ({ currentUser: this.props.currentUser }))
    }
    if (this.props.board !== prevProps.board) {
      this.setState(() => ({ board: this.props.board }))
    }
  }

  render(){
    return(
      <Container fluid>
          <Row>
            <Col xs={12} md={6}><Profile owner={this.props.board.owner}/></Col>
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
