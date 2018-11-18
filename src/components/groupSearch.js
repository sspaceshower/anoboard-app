import React from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import '../scss/group.scss';

class GroupSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: null, //TODO: fetch currentUser
      modalShow: false,
    }
  }
  render() {

    return(
      <Col md={{span:10, offset: 2}} style={{padding: "30px 40px 30px 40px"}}>
        <Container fluid style={{paddingLeft: "0"}}>
          <Row id="page-wrap">
            <Container fluid>
              <Row class="title">Join a New Group</Row>
              <Row>
                <GroupIcon />
              </Row>
            </Container>
          </Row>
        </Container>
      </Col>
    );
  }
}

class GroupIcon extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      group: this.props.group
    }
  }
    render(){
      let modalClose = () => this.setState({ modalShow: false})
      return(
        <Col xs={12} sm={6} md={4} className="group-icon-wrap">
          <Row><div>group image</div></Row>
          <Row><div>group name</div></Row>
          <Row><div>group public/private</div></Row>
          <Row><div>group description</div></Row>
          <Button
            variant="outline-light"
            onClick={() => this.setState({modalShow: true})}>
            Join Group
          </Button>
          <JoinGroupModal
            show = {this.state.modalShow}
            onHide = {modalClose}
            currentUser = {this.props.currentUser}
          />
        </Col>
      );
    }
}

class JoinGroupModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      group: null//TODO: <mockup> this.props.group
    };
  }

  render() {
    return(
      <Modal
        {...this.props}
        aria-labelledby = "join-modal"
        dialogClassName = "custom-modal"
      >
        <Modal.Header>Join Group</Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row><div>public? password:none</div></Row>
            <Row>
              <Button variant="outline-secondary">Cancel</Button>
              <Button variant="info">Confirm</Button>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

export default GroupSearch;
