import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import '../../scss/auth.scss';

const PasswordForgetPage = () => (
  <Container fluid>
    <PasswordForgetForm />
  </Container>

);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
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
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (

      <Row className="justify-content-md-center nonauth-wrapper">
        <Col xs={10} sm={8} md={3}>
          <div id="password-forget-wrap">
            <div>
              <div className="box-title">Reset Password</div>
              <Form onSubmit={this.onSubmit} bsPrefix="form-wrap">
                <Form.Group controlId="forget-password">
                  <Form.Label bsPrefix="label-text">Email Address</Form.Label>
                  <Form.Control
                    type="email" placeholder="name@example.com"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    />
                  <div className="center-wrap">
                    <Button bsPrefix="custom-button-cancel">
                      <Link to={routes.SIGN_IN} className="button-link">Back</Link>
                    </Button>
                    <button className="custom-button-blue" disabled={isInvalid} type="submit">
                      Reset
                    </button>
                  </div>
                  {error && <p>{error.message}</p>}
                </Form.Group>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

const PasswordForgetLink = () => (
  <div className="custom-content">
    <Link to={routes.PASSWORD_FORGET} className="custom-link">Forgot Password</Link>
  </div>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
