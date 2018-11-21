import React from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../reducers/map.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faLock } from '@fortawesome/free-solid-svg-icons';
import { groupRef } from '../firebase/firebase';
import { db, firebase } from '../firebase/';
import AuthUserContext from '../session/authUserContext';
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
    console.log("check currentUser");
    console.log(this.props);
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
  doJoinGroup = (currentUser, groupName) => {
    //add user to group
    var user_list = [];
    firebase.db.ref("groups/").child(groupName).child("/students").on("value", function (snapshot) {
      // console.log(snapshot.val());
      snapshot.forEach(function (data) {
        user_list.push(data.val().uid);
      });
      if (user_list.indexOf(currentUser.uid) > -1) {
      } else {
        firebase.db.ref('groups/').child(groupName + "/students").push({
            "uid": currentUser.uid,
            "username": currentUser.username
          }
        )
      }
    });

    // add group to user
    // user needs existing grouplist
    var data_list = []
    // Add Group to User in grouplist
    db.onceGetOneUser(currentUser.uid).then(snapshot => {
      if (snapshot.val().grouplist !== undefined) {
        for (const [key, value] of Object.entries(snapshot.val().grouplist)) {
          var childData = value.name;
          data_list.push(childData);
        }
        console.log(data_list);
        if (data_list.indexOf(groupName) > -1) {
          //In the array!
        } else {
          data_list.push(groupName)
          firebase.db.ref('users/').child(currentUser.uid + "/grouplist").push({
              "name": groupName
          })
        }
      } else {
        firebase.db.ref('users/').child(currentUser.uid + "/grouplist").push(
          {"name": groupName})
      }

      var newUser = currentUser;
      newUser.grouplist = data_list;
      this.props.updateUser(newUser);
    });
    window.location.reload() //TODO: to be remove when rerender flag is finished
  }

  render() {
    return (
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
              <Button variant="info" onClick={() => this.doJoinGroup(this.props.currentUser, this.props.name)}>Confirm</Button>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearch);
