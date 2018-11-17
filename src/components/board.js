import React from 'react';
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPlus, faReply } from '@fortawesome/free-solid-svg-icons';
import { createDisplayName } from '../helper/helper.js'
import Postbox from './postbox.js';
import * as routes from '../constants/routes';
import { auth, db } from '../firebase';
import AuthUserContext from '../session/authUserContext.js';
import '../scss/userboard.scss';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

library.add(faPlusCircle);
library.add(faPlus);
library.add(faReply);

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts : this.props.board.posts,
      modalShow: false,
    }

  }

  addPost() {
    // this.setState({ posts: ... });
    // Create a user in your own accessible Firebase Database too
    // TODO: what's autUser? get it from Folder Session
    console.log("WUTTTTTTTTTT")
    // MOCK DATA
    var username = 'bun'
    var content = 'hi'
    var isAnonymous = true
    // assume i have those data from frontend
    const { history } = this.props;
    var user = auth.currentUser
    // username = user.username
    // TODO: user is still null even after Signing in WHY???
    db.doCreateBoard(user, username, content, isAnonymous)
    .then(() => {
      this.setState(() => ({ ...INITIAL_STATE }));
      history.push(routes.HOME);
    })
    .catch(error => {
      this.setState({ error });
    });

    // const CreatePost = () =>
    //   <AuthUserContext.Consumer>
    //   {authUser => authUser
    //     ? this.addPostHelper(authUser,username,content,isAnonymous)
    //     : null
    //   }
    // </AuthUserContext.Consumer>

    // return CreatePost
    // db.doCreateBoard(authUser.user.uid, username, content, isAnonymous)
    // .then(() => {
    //   this.setState(() => ({ ...INITIAL_STATE }));
    //   history.push(routes.HOME);
    // })
    // .catch(error => {
    //   this.setState({ error });
    // });
  }

  render(){
    let modalClose = () => this.setState({ modalShow: false})
    return(
      <Container fluid style={{paddingLeft: "0"}}>
      <Row id="board">
        <Col md={12}>
            <Row className="justify-content-md-center">
              <Col xs={12} md={4}>
                <div className="postbox-wrap">
                  <Row>
                      <Col id="postbox-icon-wrap">
                        <Button bsPrefix="custom-area-new-button" onClick={() => this.setState({modalShow: true})}>
                          <FontAwesomeIcon className="postbox-new-icon" icon="plus-circle" />
                        </Button>
                        <Postmodal
                          show = {this.state.modalShow}
                          onHide = {modalClose}
                          currentUser = {this.props.currentUser}
                        />
                      </Col>
                  </Row>
                  <Row>
                      <Col id="postbox-new-text">
                        write a new post
                      </Col>
                  </Row>
                </div>
              </Col>
              {createPostStack(this.state.posts)}
            </Row>
        </Col>
      </Row>
      </Container>
    );
  }
}

/*
const newPostButton = () => {
  return(
    <Col xs={12} md={4}>
      <div className="postbox-wrap">
        <Row>
            <Col id="postbox-new-icon">
              <Button onClick={Board.className.addPost.bind(Board.className)}>
                <FontAwesomeIcon icon="plus-circle" />
              </Button>
            </Col>
        </Row>
        <Row>
            <Col id="postbox-new-text">
              write a new post
            </Col>
        </Row>
      </div>
    </Col>
  );
}*/

class Postmodal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      post: {
        author: this.props.currentUser,
        content: "",
        tag: null,
        isAnonymous: true,
        replies: null,
        timestamp: null
      },
    };

    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleAnonimity = this.handleAnonimity.bind(this);
  }

  handleContentChange(event){
    var currentPost = this.state.post;
    currentPost.content = event.target.content;
    this.setState({post: currentPost});
  }

  handleAnonimity(event){
    var currentPost = this.state.post;
    currentPost.isAnonymous = (event.target.value === "anonymous") ? true:false;
    this.setState({post: currentPost});
  }

  render() {
    const textStyle = {
      fontFamily: "Lato-Bold",
      fontSize: "40px",
      color: "#47525E",
    }

    const iconStyle = {
      color: "#47525E",
      fontSize: "30px",
    }

    return (
      <Modal
        {...this.props}
        aria-labelledby = "post-modal"
        dialogClassName = "custom-modal"
      >
        <Modal.Header bsPrefix="custom-modal-header">
          <Modal.Title style={iconStyle}><FontAwesomeIcon icon="plus" /></Modal.Title>
          <Modal.Title style={textStyle}>write a new post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Form>
              <Form.Group style={{textAlign: "center"}}>
                  <Form.Control
                    as = "textarea"
                    rows = "5"
                    name = "content"
                    value = {this.state.post.content}
                    placeholder = "write your message here"
                    onChange = {this.handleContentChange}
                  />
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col xs={2}><div className="selector-text">post as</div></Col>
                  <Col>
                    <div key="custom-inline-radio" className="mb-3">
                      <Form.Check custom inline>
                        <Form.Check.Input type="radio" name="anonimity" value="anonymous"
                          defaultChecked
                          onChange={this.handleAnonimity}/>
                        <Form.Check.Label
                          bsPrefix= {this.state.post.isAnonymous ? "selector-label-checked" : "selector-label"}>
                          Anonymous
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check custom inline>
                        <Form.Check.Input type="radio" name="anonimity" value="public"
                          onChange={this.handleAnonimity}/>
                        <Form.Check.Label
                          bsPrefix={this.state.post.isAnonymous ? "selector-label" : "selector-label-checked"}>
                          {createDisplayName(this.state.post.author)}
                        </Form.Check.Label>
                      </Form.Check>
                    </div>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row><Col style={{textAlign: "center"}}>
                  <Button bsPrefix="submit-button" onClick={() => ({/*TODO: fill in*/})}>Post</Button>
                </Col></Row>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

class Replymodal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      reply: {
        author: this.props.currentUser,
        content: "",
        timestamp: null
      },
    };

    this.handleContentChange = this.handleContentChange.bind(this);
  }

  handleContentChange(event){
    var currentReply = this.state.reply;
    currentReply.content = event.target.content;
    this.setState({reply: currentReply});
  }

  render() {
    const textStyle = {
      fontFamily: "Lato-Bold",
      fontSize: "40px",
      color: "#47525E",
    }

    const iconStyle = {
      color: "#47525E",
      fontSize: "30px",
    }

    return (
      <Modal
        {...this.props}
        aria-labelledby = "reply-modal"
        dialogClassName = "custom-modal"
      >
        <Modal.Header bsPrefix="custom-modal-header">
          <Modal.Title style={iconStyle}><FontAwesomeIcon icon="reply" /></Modal.Title>
          <Modal.Title style={textStyle}>write a reply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Form>
              <Form.Group style={{textAlign: "center"}}>
                  <Form.Control
                    as = "textarea"
                    rows = "5"
                    name = "content"
                    value = {this.state.post.content}
                    placeholder = "write your reply here"
                    onChange = {this.handleContentChange}
                  />
              </Form.Group>
              <Form.Group>
                <Row><Col style={{textAlign: "center"}}>
                  <Button bsPrefix="submit-button" onClick={() => ({/*TODO: fill in*/})}>Reply</Button>
                </Col></Row>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

const createPostStack = (posts) => {
    var stack = [];
    if(posts!=null){
      for(let i=0; i<posts.length;i++){
        stack.push(
          <Postbox post={posts[i]} />
        );
      }
    }
    return(stack);
}

export default Board;
