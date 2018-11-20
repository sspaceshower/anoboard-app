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
      groupName: this.props.match.params.eachgroup,      
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
      <Container fluid>
        <Row className="wrapper">
          <Col md={{span:10, offset: 2}} style={paddingSet}>
            <p>ioasdjoaisdj</p>
            <div>
              <ul>
              {this.state.students.map((item) => {
                return(<li>{item.name}</li>)

              })}
              </ul>
            </div>

            <p>oaijdoais</p>
          </Col>
        </Row>
      </Container>

    );
  }
}

export default Group;
