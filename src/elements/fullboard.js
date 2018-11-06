import React from 'react';
import { Row, Col } from 'reactstrap';
import Board from './board.js';
import Profile from './profile.js';
import Trophy from './trophy.js';
import '../scss/userboard.scss';

class FullBoard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user,
      board: this.props.board,
    };
  }
  render(){
    return(
      <div>
        <Row>
          <Col md={6} className="wrap" id="profile"><Profile user={this.state.user}/></Col>
          <Col md={6} style={{paddingRight:'0', paddingLeft:'25px'}}>
            <Col md={12} className="wrap" id="trophy" style={{padding: '0'}}><Trophy /></Col>
          </Col>
        </Row>
        <Row><Board board={this.state.board}/></Row>
      </div>
    );
  }
}

export default FullBoard;
