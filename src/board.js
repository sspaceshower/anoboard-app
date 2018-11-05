import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import './scss/board.scss';

function Board() {
  return(
      <Col md={10} style={{paddingLeft: '40px', paddingRight: '40px'}}>
          <Row>
            <Col id="board">Test</Col>
          </Row>
      </Col>
  );
}

export default Board;
