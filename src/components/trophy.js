import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../scss/userboard.scss';

function createTrophy(){

}
function Trophy(){
  return(
    <Container fluid>
      <Row>
        <Col xs={2} md={1} id="trophy-title-wrap"></Col>
      </Row>
    </Container>
  );
}

export default Trophy;
