import React from 'react';
import {db, groupRef, studentsOfGroupRef} from "./firebase/firebase";
import { Col, Container, Row, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faLock } from '@fortawesome/free-solid-svg-icons';
import './scss/group.scss';

library.add(faUserFriends);
library.add(faLock)


class AllGroup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      groupName: this.props.match.params.eachgroup,      
      students: [],
    };
    console.log("this.state.groupName");
    console.log(this.props.match.params.eachgroup);
  }


  componentDidMount() {
    console.log("BUNNNNNN");
    
    if(this.state.groupName !== null && this.state.groupName !== undefined){
        db.ref(`groups/${this.state.groupName}`).on('value', snap =>  {      
          var students = [];
          snap.child("students").forEach(ss => {
            // data.push([ss.child('name').val(), ss.child('students').val()]);
            // groupNames.push(ss.child('name').val());
            students.push(ss.val());
          });
          this.setState({        
            students: students
          });
          console.log("this.state.groupNameHEY");
          // console.log(this.state.groupName);
          console.log(students);
        });
    }
  }

  render(){
    return(
      <Col md={{span:10, offset: 2}} style={{padding: "30px 40px 30px 40px"}}>
        <Container fluid style={{paddingLeft: "0"}}>
          <Row id="page-wrap">
            <Container fluid>
              <Row className="title">My Group</Row>
              <Row><div>Searchbar</div></Row>
              <Row>
                <GroupDisplay />
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
      group: this.props.group
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
          <Row><div className="group-img-wrap">group image</div></Row>
          <Row><div className="group-name">group name</div></Row>
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

export default AllGroup;
