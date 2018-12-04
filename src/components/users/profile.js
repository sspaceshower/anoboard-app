import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { createDisplayName } from '../../helper/helper.js'
import '../../scss/userboard.scss';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      owner: this.props.owner //TODO: <mockup> to be changed to board.owner when board info is ready
    };
  }

  render(){
    const displayName = createDisplayName(this.state.owner.fname, this.state.owner.mname, this.state.owner.lname, this.state.owner.username)
    return(
      <div>
        <Row className="wrap" id="profile-wrap">
          <Col xs={3} className="center-all">
            <Row><Col><div className="profile-img-container"></div></Col></Row>
          </Col>
          <Col xs={9} className="center-vertical">
            <Row><Col><div id="profile-name">{displayName}</div></Col></Row>
            <Row><Col><div id="biography">{this.props.owner.biography}</div></Col></Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Profile;
