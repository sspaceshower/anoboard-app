import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Postbox from './postbox.js';
import '../scss/userboard.scss';

library.add(faPlusCircle);
class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      posts : this.props.board.posts
    }
  }

  render(){
    return(
      <Row id="board">
        <Col md={12}>
            <Row className="justify-content-md-center">
              {newPostButton()}
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
      <div className="postbox-wrap" style={{paddingTop: '65px'}}>
        <Row className="justify-content-md-center">
            <FontAwesomeIcon icon="plus-circle" className="postbox-new-icon"/>
        </Row>
        <Row className="justify-content-md-center">
            <div className="postbox-new-text">write a new post</div>
        </Row>
      </div>
    </Col>
  );
}

const createPostStack = (posts) => {
    var stack = [];
    for(let i=0; i<posts.length;i++){
      stack.push(
        <Postbox post={posts[i]} />
      );
    }
    return(stack);
}

export default Board;
