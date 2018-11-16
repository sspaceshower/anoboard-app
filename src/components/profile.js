import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { createDisplayName } from '../helper/helper.js'
import '../scss/userboard.scss';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      owner: this.props.user //TODO: <mockup> to be changed to board.owner when board info is ready
    };
  }

  render(){
    const displayName = createDisplayName(this.state.owner)
    return(
      <div>
        <Row className="wrap" id="profile-wrap">
          <Col xs={2}>
            <Container fluid className="valign-middle">
              <div className="profile-img-container"></div>
            </Container>
          </Col>
          <Col xs={10}>
            <Container fluid className="valign-middle" style={{paddingLeft: "20px"}}>
              <Row><Col><div id="profile-name">{displayName}</div></Col></Row>
              <Row><Col><div id="biography">{this.props.user.biography}</div></Col></Row>
            </Container>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Profile;
