import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Row, Col, Form, InputGroup, Button} from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { auth, db } from '../../firebase';
import { loading } from '../../constants/loading.js';
import Pacman from '../util/pacman.js';
import * as routes from '../../constants/routes';
import '../../scss/auth.scss';

library.add(faUserPlus)

const SignUpPage = ({ history }) => (
  <Container fluid>
    <Row className="justify-content-md-center nonauth-wrapper">
      <Col xs={10} sm={8} md={4}>
        <div id="signup-wrap">
          <SignUpForm history={history} />
        </div>
      </Col>
    </Row>
  </Container>
);

const INITIAL_STATE = {
  username: '',
  fname: '',
  mname: '',
  lname: '',
  biography: "this is your biography! tell us about yourself!",
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
  loaded: false,
  loading: loading.NOTHING,
  validated: false,
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.fetchUserData = this.fetchUserData.bind(this);
  }

  componentDidMount() {
		this.fetchUserData()
  }

  fetchUserData(){
		this.setState({
			loading:loading.RELOADING
    });
		db.onceGetUsers().then(snapshot =>
		{
      const user_list = [];
				for (const [key, value] of Object.entries(snapshot.val())) {
					var childData = value.username;
					user_list.push(childData);
				}
      this.setState({usernames: user_list, loaded:true, loading:loading.NOTHING,});

		}).catch((err)=> {
			console.log("fetch user error",err);});
  }

  onSubmit = event => {
    const { username, fname, mname, lname, biography, email, passwordOne, passwordTwo } = this.state;

    const { history } = this.props;

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({ validated: true });
    /*
    if(username === ''){
      alert("Please fill in username")
    }
    else if(fname === ''){
      alert("Please fill in your First name")
    }
    else if(lname === ''){
      alert("Please fill in your Last name")
    }
    else if(email === ''){
      alert("Please fill in your email")
    }
    else if(passwordOne === ''){
      alert("Please fill in your password")
    }
    else if(passwordTwo === ''){
      alert("Please confirm your password")
    }
    */
    if(passwordOne && passwordTwo && passwordTwo !== passwordOne){
      alert("Please make sure you confirm the same password")
    }

    else if(!this.state.usernames.includes(username)){
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        var day_now = {
           day: new Date().getDate(),
           month: (new Date().getMonth())+1,
           year: new Date().getFullYear()
         }
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username,fname,mname,lname,biography, email, day_now)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });

        db.doCreateBoard(authUser.user.uid, username,fname,mname,lname,biography, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });
    }
    else {
      alert("this username is already used")
    }
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      fname,
      mname,
      lname,
      biography,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      fname === '' ||
      lname === '' ||
      email === '';

      if(this.state.loaded){
    return (
      <div>
        <div className="header-icon"><FontAwesomeIcon icon="user-plus" /></div>
        <div className="box-title">Sign Up</div>
        <Form
          onSubmit={this.onSubmit}
          bsPrefix="form-wrap"
          noValidate
          validated={this.state.validated}
          >
          <Form.Group controlId="signup">
            <Row>
              <Col>
              <Form.Label />
              <Form.Control
                name="email" value={email}
                onChange={this.onChange}
                type="email" placeholder="ano@anoboard.com"
                required
                />
              <Form.Control.Feedback type="invalid">
                {error && <div className="error-message">{error.message}</div>}
              </Form.Control.Feedback>
            </Col></Row>
            <Row>
              <Col>
                <Form.Label />
                <InputGroup>
                  <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  name="username" value={username}
                  onChange={this.onChange}
                  type="text" placeholder="Username"
                  required
                  />
                <Form.Control.Feedback type="invalid" />
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label />
                <Form.Control
                name="passwordOne"   value={passwordOne}
                onChange={this.onChange}
                type="password" placeholder="Password"
                required />
              <Form.Control.Feedback type="invalid" />
              </Col>
              <Col>
                <Form.Label />
                <Form.Control
                  name="passwordTwo" value={passwordTwo}
                  onChange={this.onChange}
                  type="password" placeholder="Confirm Password"
                  required
                />
                <Form.Control.Feedback type="invalid" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label />
                <Form.Control
                  name="fname" value={fname}
                  onChange={this.onChange}
                  type="text" placeholder="First Name"
                  required
                   />
                <Form.Control.Feedback type="invalid" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label />
                <Form.Control
                  name="mname"   value={mname}
                  onChange={this.onChange}
                  type="text" placeholder="Middle Name (Optional)" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label />
                <Form.Control
                  name="lname"   value={lname}
                  onChange={this.onChange}
                  type="text" placeholder="Last Name"
                  required
                  />
                <Form.Control.Feedback type="invalid" />
              </Col>
            </Row>
            <div className="center-wrap">
              <Button bsPrefix="custom-button-lg-cancel">
                <Link to="/signin" className="button-link">Back</Link>
              </Button>
              <button className="custom-button-lg" type="submit">
                Sign Up
              </button>
            </div>
          </Form.Group>
        </Form>
      </div>
      );
    } else { return (<Pacman />) }

  }
}

const SignUpLink = () => (
  <div className="custom-content">
    Don't have an account?&nbsp;&nbsp;
    <Link to={routes.SIGN_UP} className="custom-link">Sign Up</Link>
</div>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
