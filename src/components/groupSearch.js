import React from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faLock } from '@fortawesome/free-solid-svg-icons';
import '../scss/group.scss';
import { groupRef } from "../firebase/firebase";
import { NavLink } from "react-router-dom";

library.add(faUserFriends);
library.add(faLock)

class GroupSearch extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: null, //TODO: fetch currentUser
      groupNames : [],
      modalShow: false,
    }
  }

  componentDidMount() {

    var data_list = []

    groupRef.once("value").then((snapshot) => {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val().name;
        data_list.push(childData);
      });
      // console.log(data_list, data_list.length);
      this.setState({
        groupNames: data_list
      });
    });
  }

  render() {

    return(
      <Col md={{span:10, offset: 2}} style={{padding: "30px 40px 30px 40px"}}>
        <Container fluid style={{paddingLeft: "0"}}>
          <Row id="page-wrap">
            <Container fluid>
              <Row className="title">Join a New Group</Row>
              <Row><div>Searchbar</div></Row>
              <Row>
                {this.state.groupNames.map((name) => <GroupDisplay name={name} />)}
              </Row>
            </Container>
          </Row>
        </Container>
      </Col>
    );
  }
}

class GroupDisplay extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      group: this.props.group,
      name: this.props.name

    };

    this.getGroupIcon = this.getGroupIcon.bind(this);
    this.getGroupPrivacy = this.getGroupPrivacy.bind(this);
  }

  getGroupIcon () {
    const isPublic = true; /*TODO: replaced by this.state.group.isPublic*/
    return(isPublic ?
      <FontAwesomeIcon className="group-privacy-icon" icon="user-friends" /> :
      <FontAwesomeIcon className="group-privacy-icon" icon="lock" />)
  }

  getGroupPrivacy () {
    const isPublic = true; /*TODO: replaced by this.state.group.isPublic*/
    return(isPublic ? "Public Group":"Closed Group")
  }

  render(){
    let modalClose = () => this.setState({ modalShow: false})
    return(
        <Col sm={{span: 6, offset: 1}} md={{span: 3, offset: 0}} xs={{span: 10, offset: 1}}  className="group-display-wrap">
          <Container fluid>
            <Row><div className="group-img-wrap">group image</div></Row>
            <Row><div className="group-name">{this.state.name}</div></Row>
            <Row>
              <div>{this.getGroupIcon()}</div>
              <div className="group-privacy">{this.getGroupPrivacy()}</div>
            </Row>
            <Row><div className="group-description">group description</div></Row>
            <Row className="button-wrap"><Col>
              <Button
                bsPrefix="button-join"
                onClick={() => this.setState({modalShow: true})}>
                Join
              </Button>
            </Col>
            </Row>
            <JoinGroupModal
              show = {this.state.modalShow}
              onHide = {modalClose}
              currentUser = {this.props.currentUser}
            />
          </Container>
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
