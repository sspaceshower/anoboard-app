import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import Sidemenu from './sidemenu.js';
import Board from './board.js';

class Myboard extends React.Component{
  render() {
    return (
      <Grid fluid>
        <Row className="wrapper">
            <Sidemenu />
            <Board />
        </Row>
      </Grid>
    );
  }
}

export default Myboard;
