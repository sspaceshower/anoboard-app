import React from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../reducers/map.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faLock } from '@fortawesome/free-solid-svg-icons';
import { groupRef } from '../firebase/firebase';
import { db } from '../firebase/';
import '../scss/group.scss';

library.add(faUserFriends);
library.add(faLock)

class GroupSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupNames: [],
      modalShow: false,
    };
  }

  componentDidMount() {

    var data_list = []

    groupRef.once("value").then((snapshot) => {
      snapshot.forEach(function (childSnapshot) {
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
    return (
      <Col md={{span: 10, offset: 2}} style={{padding: "30px 40px 30px 40px"}}>
        <Container fluid style={{paddingLeft: "0"}}>
          <Row id="page-wrap">
            <Container fluid>
              <Row className="title">Join a New Group</Row>
              <Row>
                <div>Searchbar</div>
              </Row>
              <Row>
                {this.state.groupNames.map((name) => <GroupDisplay name={name} {...this.props}/>)}
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
      modalShow: false,
    }
  }
  getGroupIcon() {
    const isPublic = true;
    /*TODO: replaced by this.state.group.isPublic*/
    return (isPublic ?
      <FontAwesomeIcon className="group-privacy-icon" icon="user-friends"/> :
      <FontAwesomeIcon className="group-privacy-icon" icon="lock"/>)
  }

  getGroupPrivacy() {
    const isPublic = true;
    /*TODO: replaced by this.state.group.isPublic*/
    return (isPublic ? "Public Group" : "Closed Group")
  }

  render() {
    let modalClose = () => this.setState({modalShow: false})
    return (
      <Col sm={{span: 6, offset: 1}} md={{span: 3, offset: 0}} xs={{span: 10, offset: 1}}
           className="group-display-wrap">
        <Container fluid>
          <Row>
            <div className="group-img-wrap">group image</div>
          </Row>
          <Row>
            <div className="group-name">{this.props.name}</div>
          </Row>
          <Row>
            <div>{this.getGroupIcon()}</div>
            <div className="group-privacy">{this.getGroupPrivacy()}</div>
          </Row>
          <Row>
            <div className="group-description">group description</div>
          </Row>
          <Row className="button-wrap"><Col>
            <Button
              bsPrefix="button-join"
              onClick={() => this.setState({modalShow: true})}>
              Join
            </Button>
          </Col>
          </Row>
          <JoinGroupModal
            {...this.props}
            show={this.state.modalShow}
            onHide={modalClose}
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
      alert: false,
    }
  }
  doJoinGroup = (currentUser, groupName) => {
    //add user to group
    const uid = currentUser.uid;
    const username = currentUser.username;
    const fname = currentUser.fname;
    const mname = currentUser.mname;
    const lname = currentUser.lname;
    const new_grouplist = db.doAddGroupList(uid, username, fname, mname, lname, groupName);
    var newUser = currentUser;
    newUser.grouplist = new_grouplist;
    this.props.updateUser(newUser);
    this.setState({alert: true})
  }

  getAlert () {
    if (this.state.alert) return("please refresh the page to see the result!");
    else return("");
  }

  render() {
    const textStyle = {
      fontFamily: "Lato-Bold",
      fontSize: "40px",
      color: "#47525E",
    }

    const iconStyle = {
      color: "#47525E",
      fontSize: "30px",
    }

    return (
      <Modal{...this.props} aria-labelledby="join-modal" dialogClassName="custom-modal">
        <Modal.Header bsPrefix="custom-modal-header">
          <Modal.Title style={iconStyle}><FontAwesomeIcon icon="plus" /></Modal.Title>
          <Modal.Title style={textStyle}>Join&nbsp;{this.props.name}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row><Col style={{textAlign: "center"}}>
              <Button
                bsPrefix="cancel-sq-button"
                onClick={this.props.onHide}>
                Cancel
              </Button>
              <Button
                bsPrefix="submit-sq-button"
                onClick={() => this.doJoinGroup(this.props.currentUser, this.props.name)}>
                Confirm
              </Button>
            </Col></Row>
          <Row className="justify-content-md-center custom-alert-text">
              {this.getAlert()}
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearch);
