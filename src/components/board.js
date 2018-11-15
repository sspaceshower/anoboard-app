import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Postbox from './postbox.js';
import '../scss/userboard.scss';
import * as routes from '../constants/routes';
import { auth, db } from '../firebase';
import AuthUserContext from '../session/authUserContext.js';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

library.add(faPlusCircle);
class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts : this.props.board.posts

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
    return(
      <Row id="board">
        <Col md={12}>
            <Row className="justify-content-md-center">
              <Col xs={12} md={4}>
                <div className="postbox-wrap">
                  <Row>
                      <Col id="postbox-new-icon">
                        <Button onClick={this.addPost.bind(this)}>
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
              {createPostStack(this.state.posts)}
            </Row>
        </Col>
      </Row>
    );
  }
}


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
