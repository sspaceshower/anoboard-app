import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../scss/userboard.scss';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  render(){
    const middleName = this.state.user.mname? " " + this.state.user.mname.charAt(0) + '. ':" ";
    const displayName = this.state.user.fname + middleName + this.state.user.lname;
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
