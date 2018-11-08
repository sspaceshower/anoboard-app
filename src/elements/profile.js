import React from 'react';
import { Row, Col } from 'react-bootstrap';
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
        <Row>
          <Col xs={3}>
            <div className="profile-img-container"></div>
          </Col>
          <Col xs={9} style={{paddingLeft: '0'}}>
            <Row className="profile-name">{displayName}</Row>
            <Row className="biography">{this.props.user.biography}</Row>
          </Col>
        </Row>
    )
  }
}

export default Profile;
