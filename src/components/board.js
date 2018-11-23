import React from 'react';
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPlus, faReply, faComments } from '@fortawesome/free-solid-svg-icons';
import { createDisplayName } from '../helper/helper.js'
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
library.add(faComments);

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      board: this.props.board,
      // posts : this.props.board.value.posts,
      modalShow: false,
    }
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState(() => ({
        currentUser: this.props.currentUser,
        }))
    }
    if (this.props.board !== prevProps.board) {
      this.setState(() => ({
        board: this.props.board,
        posts: this.props.board.posts }))
    }
  }

  render(){
    let modalClose = () => this.setState({ modalShow: false})
    return(
      <Container fluid style={{paddingLeft: "0"}}>
      <Row id="board">
        <Col md={12}>
            <Row className="justify-content-md-center">
              <Col xs={12} md={4}>
                <div className="postbox-new-wrap">
                  <Row>
                      <Col id="postbox-icon-wrap">
                        <Button bsPrefix="custom-area-new-button" onClick={() => this.setState({modalShow: true})}>
                          <FontAwesomeIcon className="postbox-new-icon" icon="plus-circle" />
                        </Button>
                        <Postmodal
                          show = {this.state.modalShow}
                          onHide = {modalClose}
                          currentUser = {this.props.currentUser}
                          board = {this.state.board}
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
              {createPostStack(this.state.currentUser, this.state.board)}
            </Row>
        </Col>
      </Row>
      </Container>
    );
  }
}

class Postmodal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      board: this.props.board,
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentUser !== prevProps.currentUser) {
      var currentPost = this.state.post;
      currentPost.author = this.props.currentUser;
      this.setState(() => ({
        currentUser: this.props.currentUser,
        post: currentPost}))
    }
    if (this.props.board !== prevProps.board) {
      this.setState(() => ({
        board: this.props.board,
        }))
    }
  }
  handleContentChange(event){
    var currentPost = this.state.post;
    currentPost.content = event.target.value;
    this.setState({post: currentPost});
  }

  handleAnonimity(event){
    var currentPost = this.state.post;
    currentPost.isAnonymous = (event.target.value === "anonymous") ? true:false;
    this.setState({post: currentPost});
  }

  handleSubmit(event){
    var boardOwner = this.state.board.owner.username;

    // TODO: these values still null, fix this
    var uid = this.state.currentUser.uid;
    var username = this.state.currentUser.username;
    var content = this.state.post.content;
    var isAnonymous = this.state.post.isAnonymous;
    const { history } = this.props;

    db.doCreatePost(boardOwner, uid, username, content, isAnonymous)
    .then(() => {
      window.location.reload();
      this.setState(() => ({
        post: {
          author: this.props.currentUser,
          content: "",
          tag: null,
          isAnonymous: true,
          replies: null,
          timestamp: null
        }
       }));
    })
    .catch(error => {
      this.setState({ error });
    });
    event.preventDefault();
  }

  render() {
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
                  <Button bsPrefix="submit-button" onClick={this.handleSubmit}>Post</Button>
                </Col></Row>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

class Postbox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      post: this.props.post,
      board: this.props.board
    }
    var currentPost = this.state.post;
    currentPost.user = {username: this.state.post.username};
    this.setState({post: currentPost});

    this.getReplyNum = this.getReplyNum.bind(this);

  }

  getReplyNum(){
    if(this.state.post.replys !== undefined && this.state.post.replys !== null){
      return (Object.keys(this.state.post.replys).length);
    } else {
      return ("");
    }
  }

  render(){
    let modalClose = () => this.setState({ modalShow: false})
    const author = this.state.post.isAnonymous?
      'anonymous':createDisplayName(this.state.post.user);
    return(
      <Col xs={12} sm={6} md={4}>
        <div className="postbox-wrap">
          <Row>
            <Col xs={5}><div id="postbox-author">{author}</div></Col>
            <Col xs={7}><div id="postbox-tag">{"#classtag" /*TODO: <mockup> change to createTag*/}</div></Col>
          </Row>
          <Row><Col><div className="breakline"></div></Col></Row>
          <Row>
            <Col>
              <div id="postbox-content">
                {this.state.post.content /*TODO: <frontend> handle case where content is too long*/}
              </div>
            </Col>
          </Row>
          <Container fluid id="postbox-menu">
            <Row>
              <Col>
                <Button bsPrefix="postbox-reply-button" onClick={() => this.setState({modalShow: true})}>
                  <FontAwesomeIcon className="postbox-reply" icon="comments" />
                  <div id="postbox-reply-num">{this.getReplyNum()}</div>
                </Button>
                <Replymodal
                  post = {this.state.post}
                  show = {this.state.modalShow}
                  onHide = {modalClose}
                  currentUser = {this.props.currentUser}
                  board = {this.state.board}
                />
              </Col>
              <Col>
                <div id="postbox-timestamp">{"timestamp" /*TODO: <mockup> change to createTimeStamp()*/}</div>
              </Col>
            </Row>
          </Container>
        </div>
      </Col>
    );
  }
}


class Replybox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      author: this.props.reply.username,
      content: this.props.reply.content,
      // timestamp: this.props.reply.timestamp,
      isAnonymous: this.props.reply.isAnonymous,
    }
    var currentPost = this.state;
    currentPost.user = {username: this.state.author};
    this.setState({post: currentPost});
  }

  render(){
    const author = this.state.isAnonymous?
      'anonymous':createDisplayName(this.state.author.username);
    return(
        <div className="reply-container">
          <Row>
            <Col xs={4}><div id="reply-author">{author}</div></Col>
            <Col xs={8}><div id="reply-tag">{"#classtag" /*TODO: <mockup> change to createTag*/}</div></Col>
          </Row>
          <Row>
            <Col>
              <div id="reply-content">
                {this.state.content /*TODO: <frontend> handle case where content is too long*/}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div id="reply-timestamp">{"timestamp" /*TODO: <mockup> change to createTimeStamp()*/}</div>
            </Col>
          </Row>
          <Row><div className="reply-breakline"></div></Row>
        </div>
    );
  }
}


class Replymodal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      post: this.props.post,
      board: this.props.board,
      reply: {
        author: this.props.currentUser,
        content: "",
        isAnonymous: true,
        timestamp: null
      },
    };
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleContentChange(event){
    var currentReply = this.state.reply;
    currentReply.content = event.target.value;
    this.setState({reply: currentReply});
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState(() => ({
        currentUser: this.props.currentUser,
        reply: {author: this.props.currentUser}}))
    }
    if (this.props.board !== prevProps.board) {
      this.setState(() => ({
        board: this.props.board,
        }))
    }
    if (this.props.post !== prevProps.post) {
      this.setState(() => ({
        post: this.props.post,
        }))
    }
  }

  handleSubmit(event){
    var boardOwner = this.state.board.owner.username;
    // TODO: these values still null, fix this
    var uid = this.state.reply.author.uid;
    var username = this.state.reply.author.username;
    var content = this.state.reply.content;
    var isAnonymous = this.state.reply.isAnonymous;
    var postid = this.state.post.postid;
    const { history } = this.props;
    // username = "replymock"
    // content = "replymock"
    isAnonymous = true

    db.doCreateReply(boardOwner, uid, username, content, isAnonymous, postid)
    .then(() => {
      window.location.reload();
      this.setState(() => ({
        reply: {
          author: this.props.currentUser,
          content: "",
          isAnonymous: true,
          timestamp: null
        },
       }));
      history.push(routes.HOME);
    })
    .catch(error => {
      this.setState({ error });
    });
    event.preventDefault();

  }

  render() {
    return (
      <Modal
        {...this.props}
        aria-labelledby = "reply-modal"
        dialogClassName = "reply-custom-modal"
      >
        <Modal.Body>
          <Container fluid className="reply-stack-wrap">
            <div>{createReplyStack(this.state.post)}</div>
            <div className="custom-modal-header">
              <div style={iconStyle}><FontAwesomeIcon icon="reply" /></div>
              <div style={textStyle}>write a reply</div>
            </div>
            <Form>
              <Form.Group style={{textAlign: "center"}}>
                  <Form.Control
                    as = "textarea"
                    rows = "5"
                    name = "content"
                    value = {this.state.reply.content}
                    placeholder = "write your reply here"
                    onChange = {this.handleContentChange}
                  />
              </Form.Group>
              <Form.Group>
                <Row><Col style={{textAlign: "center"}}>
                  <Button bsPrefix="submit-button" onClick={this.handleSubmit}>Reply</Button>
                </Col></Row>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}


const createPostStack = (currentUser, board) => {
    var stack = [];
    if(board.posts!=null){
      for (const [key, value] of Object.entries(board.posts)) {
        stack.push(
          <Postbox post={value} currentUser = {currentUser} board ={board}/>
        );
      }
    }
    return(stack);
}

//TODO: <frontend> create timestamp
const createTimeStamp = (timestamp) => {
  return(
    timestamp
  );
}

//TODO: <frontend> create and link post tags
const createTag = (taglist) => {
  return(
    taglist
  );
}

const createReplyStack = (post) => {
  var stack = [];

  if(post.replys!=null){
    for (const [key, value] of Object.entries(post.replys)) {
      stack.push(
        <Replybox reply={value}/>
      );
    }
  }

  return(stack);
}

const textStyle = {
  fontFamily: "Lato-Bold",
  fontSize: "40px",
  color: "#47525E",
}

const iconStyle = {
  color: "#47525E",
  fontSize: "30px",
}

export default Board;
