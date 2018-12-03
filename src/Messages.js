import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './scss/util.scss';

class Messages extends React.Component {
  render(){
    return(
        <Row style={{height: "100vh"}}>
          <Col md={{span: 8, offset: 3}} sm={{span: 8, offset: 2}} className="center-vertical">
            <div className="not-implemented">
              <div className="alert-text">
                This page is not yet implemented.
              </div>
            </div>
          </Col>
        </Row>
    );
  }
}

export default Messages;
