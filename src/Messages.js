import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './scss/util.scss';

class Messages extends React.Component {
  render(){
    return(
      <Container fluid>
        <Row style={{height: "100vh"}}>
          <Col md={{span: 8, offset: 3}} xs={{span: 10, offset: 1}} className="center-vertical">
            <div className="not-implemented">
              <div className="alert-text">
                This page is not yet implemented.
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Messages;
