import React from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faLock } from '@fortawesome/free-solid-svg-icons';
import '../scss/group.scss';
import { groupRef } from "../firebase/firebase";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { db } from '../firebase/';
import { currentUser } from "../firebase/auth";
import AuthUserContext from "../session/authUserContext";
import firebase from "firebase";

library.add(faUserFriends);
library.add(faLock)

class GroupSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      groupNames: [],
      modalShow: false,
    };

  }


  componentDidMount() {

    var data_list = []

    groupRef.once("value").then((snapshot) => {
      snapshot.forEach(function (childSnapshot) {
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


    return (
      <AuthUserContext.Consumer>{authUser =>
        <Col md={{span: 10, offset: 2}} style={{padding: "30px 40px 30px 40px"}}>
          <Container fluid style={{paddingLeft: "0"}}>
            <Row id="page-wrap">
              <Container fluid>
                <Row className="title">Join a New Group</Row>
                <Row>
                  <div>Searchbar</div>
                </Row>
                <Row>
                  {this.state.groupNames.map((name) => <GroupDisplay name={name} currentUser={authUser}/>)}
                </Row>
              </Container>
            </Row>
          </Container>
        </Col>
      }
      </AuthUserContext.Consumer>
    );
  }
}

class GroupDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: this.props.group,
      name: this.props.name
    };

    this.getGroupIcon = this.getGroupIcon.bind(this);
    this.getGroupPrivacy = this.getGroupPrivacy.bind(this);
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
            <div className="group-name">{this.state.name}</div>
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
            show={this.state.modalShow}
            onHide={modalClose}
            className={this.state.name}

          />
        </Container>
      </Col>
    );
  }
}

const updateUser = (authUser, groupName) => {

  //add user to group
  var user_list = [];
  firebase.database().ref("groups/").child(groupName).child("/students").on("value", function (snapshot) {
    // console.log(snapshot.val());
    snapshot.forEach(function (data) {
      user_list.push(data.val().uid);
    });
    if (user_list.indexOf(authUser.uid) > -1) {
    } else {
      firebase.database().ref('groups/').child(groupName + "/students").push({
          "uid": authUser.uid
        }
      )
    }
  });

  firebase.database().ref("users/").child(groupName).child("/students").on("value", function(snapshot){
    // console.log(snapshot.val());
    snapshot.forEach(function(data) {
      user_list.push(data.val().uid);
    });
    if (user_list.indexOf(authUser.uid) > -1) {
    } else {
      firebase.database().ref('groups/').child(groupName + "/students").push({
          "uid" : authUser.uid
        }
      )
    }
  });

  // add group to user
  // user needs existing grouplist
  var data_list = []
  // Add Group to User in grouplist
  db.onceGetOneUser(authUser.uid).then(snapshot => {
      // console.log("snapshot")
      // console.log(snapshot.val())

      if( "grouplist" in snapshot.val()){


        for (const [key, value] of Object.entries(snapshot.val().grouplist)) {
          // console.log("FROM HERE");
          // console.log(value);
          var childData = value.name;
          data_list.push(childData);
        }
      }
        console.log(data_list);
        if (data_list.indexOf(groupName) > -1) {
          //In the array!
        } else {
          firebase.database().ref('users/').child(authUser.uid + "/grouplist").push({
              "name": groupName
            }
          )
        }
    }
  );

  window.location.reload();
};

class JoinGroupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: null, //TODO: <mockup> this.props.group
      currentUser: this.props.currentUser
    };
  }

  render() {
    return (
      <AuthUserContext.Consumer>{authUser =>
        <Modal{...this.props} aria-labelledby="join-modal" dialogClassName="custom-modal">
          {/*{console.log(authUser)}*/}
          <Modal.Header>Join Group</Modal.Header>
          <Modal.Body>
            <Container fluid>
              <Row>
                <div>public? password:none</div>
              </Row>
              <Row>
                <Button variant="outline-secondary" onClick={this.props.onHide}>Cancel</Button>
                <Button variant="info" onClick={() => updateUser(authUser, this.props.className)}>Confirm</Button>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      }
      </AuthUserContext.Consumer>
    );
  }
}

export default GroupSearch;
