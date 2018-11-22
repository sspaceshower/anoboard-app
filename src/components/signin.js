import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Form} from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { SignUpLink } from './signup.js';
import { PasswordForgetLink } from './passwordForget.js';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import '../scss/auth.scss';

library.add(faCrown)
const SignInPage = ({ history }) => (
  <Container fluid>
    <Row className="justify-content-md-center nonauth-wrapper">
      <Col xs={10} sm={8} md={3}>
        <div id="login-wrap">
          <SignInForm history={history} />
          <PasswordForgetLink />
          <SignUpLink />
        </div>
      </Col>
    </Row>
  </Container>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div>
        <div className="header-icon"><FontAwesomeIcon icon="crown" /></div>
        <div className="box-title">Sign In</div>
        <Form onSubmit={this.onSubmit} bsPrefix="form-wrap">
          <Form.Group controlId="signin">
            <Form.Label bsPrefix="label-text">Email Address</Form.Label>
            <Form.Control
              type="email" placeholder="name@example.com"
              name="email" value={email}
              onChange={this.onChange} />
            <Form.Label  bsPrefix="label-text">Password</Form.Label>
            <Form.Control
              type="password" placeholder="password"
              name="password" value={password}
              onChange={this.onChange} />
            <div className="center-wrap">
              <button className="custom-button-blue" disabled={isInvalid} type="submit">
                Sign In
              </button>
            </div>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default withRouter(SignInPage);

export { SignInForm };
