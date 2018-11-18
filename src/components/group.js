import React from 'react';
import {db, groupRef, studentsOfGroupRef} from "../firebase/firebase";
import { Col, Container, Row } from "react-bootstrap";
import FullBoard from "./fullboard";
import { NavLink } from "react-router-dom";

const paddingSet = {
  paddingLeft: '40px',
  paddingRight: '40px'
}

class Group extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      groupNames: [],
      students: [],

    };
  }


  componentDidMount() {


    db.ref("groups/").on('value', snap =>  {
      var data = [];
      var groupNames = [];
      var students = [];
      snap.forEach(ss => {
        data.push([ss.child('name').val(), ss.child('students').val()]);
        groupNames.push(ss.child('name').val());
        students.push(ss.child('students').val());
      });
      this.setState({
        groupNames: groupNames,
        students: students
      });

      console.log(students);
    });
  }

  render(){
    return(
      <Container fluid>
        <Row className="wrapper">
          <Col md={{span:10, offset: 2}} style={paddingSet}>
            <p>ioasdjoaisdj</p>
            <div>
              {this.state.students.map((name) => {
                return(<p>{name.title}</p>)
              })}
            </div>

            <p>oaijdoais</p>
          </Col>
        </Row>
      </Container>

    );
  }
}

export default Group;