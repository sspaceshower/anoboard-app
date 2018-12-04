import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { auth } from '../../firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { LANDING } from '../../constants/routes';
import '../../scss/auth.scss';

library.add(faSignOutAlt)

class SignOutPage extends React.Component {
  handleSignOut () {
    const { history } = this.props;

    auth
      .doSignOut()
      .then(() => {
        history.push(LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render(){
    return(
      <Container fluid>
        <Row className="justify-content-md-center nonauth-wrapper">
          <Col xs={10} sm={8} md={3}>
            <div id="logout-wrap">
              <div>
                <div className="header-icon"><FontAwesomeIcon icon="sign-out-alt" /></div>
                <div className="box-title">Dropping Out?</div>
                <div className="form-wrap center-wrap">
                  <button className="custom-button-blue" onClick={() => {this.handleSignOut()}}>
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SignOutPage;
