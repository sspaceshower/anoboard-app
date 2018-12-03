import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../scss/userboard.scss';

class Status extends React.Component {
  render() {
    return(
      <div>
        <Row className="wrap" id="trophy">
          <Col xs={2}>
          </Col>
          <Col xs={10}>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Status;
