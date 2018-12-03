import React from 'react';
import { db } from "./firebase/firebase";
import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faLock } from '@fortawesome/free-solid-svg-icons';
import { mapStateToProps, mapDispatchToProps } from './reducers/map.js';
import './scss/group.scss';

library.add(faUserFriends);
library.add(faLock)


class AllGroup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      groups: [],
      groupNames: []
    };
  }


  componentDidMount() {

    const uid = this.props.uid;
    const grouplist = this.props.groups;
    db.ref("groups").on('value', snap =>  {
      var groups = new Map();
      var groupNames = []
      snap.forEach(ss => {
        if(grouplist.indexOf(ss.child('name').val()) > -1){
          groups.set(ss.child('name').val(), ss.val());
          groupNames.push(ss.child('name').val());
        }
      });
      this.setState({
        groups: groups,
        groupNames: groupNames
      });
    });
  }

  render(){
    return(
      <Col md={{span:10, offset: 2}} style={{padding: "30px 40px 30px 40px"}}>
        <Container fluid style={{paddingLeft: "0"}}>
          <Row className="page-wrap">
            <Container fluid>
              <Row className="title">My Group</Row>
              <Row>
                {this.state.groupNames.map((name) => <GroupDisplay name={name} groups={this.state.groups}/>)}
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
    return(
      <Col sm={{span: 6, offset: 1}} md={{span: 3, offset: 0}} xs={{span: 10, offset: 1}}  className="group-display-wrap">
        <Container fluid>
          <Row><div className="group-img-wrap">IMG</div></Row>
          <Row><div className="group-name">{this.props.name}</div></Row>
          <Row>
            <div>{this.getGroupIcon()}</div>
            <div className="group-privacy">{this.getGroupPrivacy()}</div>
          </Row>
        <Row><div className="group-description">group description</div></Row>
        </Container>
      </Col>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllGroup);
