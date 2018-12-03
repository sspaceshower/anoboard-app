import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import { createDisplayName } from '../../helper/helper.js';
import '../../scss/group.scss'

class Group extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      groupName: this.props.groupName,
      students: this.props.students,
      location: this.props.location,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.groupName !== prevProps.groupName) {
      this.setState(() => ({
        groupName: this.props.groupName,
        }))
    }
    if (this.props.students !== prevProps.students) {
      this.setState(() => ({
        students: this.props.students,
       }))
    }
    if (this.props.students !== prevProps.students) {
      this.setState(() => ({
        location: this.props.location,
       }))
    }
  }

  render(){
    return(
      <Col md={{span:10, offset: 2}} style={{padding: "30px 40px 30px 40px"}}>
        <Container fluid style={{paddingLeft: "0"}}>
          <Row className="page-wrap">
            <Container fluid>
              <Row className="title">{this.state.groupName}</Row>
              <Row>
                {this.state.students.map((user) => <UserDisplay user={user} />)}
              </Row>
            </Container>
          </Row>
        </Container>
      </Col>
    );
  }
}



class UserDisplay extends React.Component {
  render(){
    return(
      <Col sm={{span: 6, offset: 1}} md={{span: 3, offset: 0}} xs={{span: 10, offset: 1}}  className="group-display-wrap">
        <Container fluid>
          <Row>
            <Col>
              <NavLink to={"/user/" + this.props.user.username}>
                <div className="user-img-wrap" />
              </NavLink>
            </Col>
          </Row>
          <Row>
            <NavLink to={"/user/" + this.props.user.username} className="user-name">
              {createDisplayName(this.props.user.fname, this.props.user.mname, this.props.user.lname, this.props.user.username)}
            </NavLink>
          </Row>
        </Container>
      </Col>
    );
  }
}


export default withRouter(Group);
