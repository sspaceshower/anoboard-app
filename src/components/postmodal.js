import React from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';

class Postmodal extends React.Component {
  render() {
    return (
      <Modal
        //more props
        size = "lg"
        show = {this.state.show}
        dialogClassName =""
        aria-labelledby = "post-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title bsPrefix ="">
            Compose a New Note
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}
