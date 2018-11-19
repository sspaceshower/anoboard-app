import React from 'react';
import {db, groupRef, studentsOfGroupRef} from "../firebase/firebase";
import { Col, Container, Row } from "react-bootstrap";
import FullBoard from "./fullboard";
import { NavLink } from "react-router-dom";
import '../scss/group.scss'

const paddingSet = {
  paddingLeft: '40px',
  paddingRight: '40px'
}

class Group extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      groupName: this.props.groupname,
      students: [],
    };
  }


  componentDidMount() {


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
              <Row className="title">{this.state.groupName}</Row>
              <Row><div>Searchbar</div></Row>
              <Row>
                {this.state.students.map((user) => <userDisplay user={user} />)}
              </Row>
            </Container>
          </Row>
        </Container>
      </Col>
    );
  }
}



class userDisplay extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

  render(){
    return(
      <Col sm={{span: 6, offset: 1}} md={{span: 3, offset: 0}} xs={{span: 10, offset: 1}}  className="group-display-wrap">
        <Container fluid>
          <Row><div className="user-img-wrap">user image</div></Row>
          <Row><div className="user-name">username</div></Row>
        </Container>
      </Col>
    );
  }
}


export default Group;
