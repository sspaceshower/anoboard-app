import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Board from './board.js';
import Profile from './profile.js';
import Status from './status.js';
import ItemAlert from '../util/itemAlert.js';
import { db } from '../../firebase';
import '../../scss/userboard.scss';

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
    if(this.props.get_item){
      db.updateGet(this.props.uid).then(() => {
        setTimeout(() => {
          this.props.updateGet(false);
        }, 2500)
      })
      return(<ItemAlert />);
    } else {
    return(
      <Container fluid>
          <Row>
            <Col sm={12} md={6}><Profile owner={this.props.board.owner}/></Col>
            <Col sm={12} md={6}><Status /></Col>
          </Row>
          <Row><Board currentUser = {this.state.currentUser} board = {this.state.board} {...this.props} /></Row>
      </Container>
    );}
  }
}

export default FullBoard;
