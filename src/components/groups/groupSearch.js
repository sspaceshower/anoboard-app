import React from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../reducers/map.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faLock } from '@fortawesome/free-solid-svg-icons';
import { groupRef } from '../../firebase/firebase';
import { db } from '../../firebase/';
import { firebase } from '../../firebase/';
import '../../scss/group.scss';

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
      this.setState({
        groupNames: data_list
      });
    });
  }

  render() {
    return (
      <Col md={{span: 10, offset: 2}} style={{padding: "30px 40px 30px 40px"}}>
        <Container fluid style={{paddingLeft: "0"}}>
          <Row className="page-wrap">
            <Container fluid>
              <Row className="title justify-content-center justify-content-md-start">Join a New Group</Row>
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

  getJoinButton(name) {
    const grouplist = this.props.groups;
    if(grouplist.indexOf(name) > -1){
      return(
        <Button
          bsPrefix="button-joined"
          disabled>
          Joined
        </Button>
      );
    } else {
      return(
        <Button
          bsPrefix="button-join"
          onClick={() => this.setState({modalShow: true})}>
          Join
        </Button>
      );
    }
  }

  render() {
    let modalClose = () => this.setState({modalShow: false})
    return (
      <Col sm={{span: 6, offset: 0}} md={{span: 3, offset: 0}} xs={{span: 10, offset: 1}}
           className="group-display-wrap">
        <Container fluid>
          <Row>
            <div className="group-img-wrap">IMG</div>
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
            {this.getJoinButton(this.props.name)}
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

  doJoinGroup = (groupName) => {
    //add user to group
    const uid = this.props.uid;
    const username = this.props.username;
    const fname = this.props.fname;
    const mname = this.props.mname;
    const lname = this.props.lname;

    var user_list = [];
    firebase.db.ref("groups/").child(groupName).child("/students").on("value", function (snapshot) {
      snapshot.forEach(function (data) {
        user_list.push(data.val().uid);
      });
      if (user_list.indexOf(uid) > -1) {
          console.log("group: repeated!")
      } else {
        firebase.db.ref('groups/').child(groupName + "/students").push({
            "uid": uid,
            "username": username,
            "fname": fname,
            "mname": mname,
            "lname": lname,
          }
        )
      }
    });

    // add group to user
    // user needs existing grouplist
  var data_list = []
  // Add Group to User in grouplist
  db.onceGetOneUser(uid).then(snapshot => {
    if (snapshot.val().grouplist !== undefined) {
      for (const [key, value] of Object.entries(snapshot.val().grouplist)) {
        var childData = value.name;
        data_list.push(childData);
      }
      console.log(data_list);
      if (data_list.indexOf(groupName) > -1) {
        //In the array!
        console.log("user: repeated!")
      } else {
        data_list.push(groupName)
        firebase.db.ref(`users/${uid}/grouplist`).push({
            "name": groupName
        })
      }

    } else {
      data_list.push(groupName);
      firebase.db.ref(`users/${uid}/grouplist`).push(
          {"name": groupName})
    }}).then(() => { this.props.updateGroups(data_list); });

    this.setState({alert: true});
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
                onClick={() => this.doJoinGroup(this.props.name)}>
                Confirm
              </Button>
            </Col></Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearch);
