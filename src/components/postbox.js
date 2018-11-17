import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { createDisplayName } from '../helper/helper.js'
import '../scss/userboard.scss'

library.add(faComments);

class Postbox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      post: this.props.post
    }
  }

  render(){
    return(
      createPostBox(this.state.post)
    );
  }
}

//TODO: <frontend> solve padding problems
const createPostBox = (post) => {
  const author = post.isAnonymous? 'anonymous':createDisplayName(post.username);
  return(
    <Col xs={12} sm={6} md={4}>
      <div className="postbox-wrap">
        <Row>
          <Col xs={5}><div id="postbox-author">{author}</div></Col>
          <Col xs={7}><div id="postbox-tag">{"#mockup" /*TODO: <mockup> change to createTag*/}</div></Col>
        </Row>
        <Row className="breakline"></Row>
        <Row>
          <Col>
            <div id="postbox-content">
              {post.content /*TODO: <frontend> handle case where content is too long*/}
            </div>
          </Col>
        </Row>
        <Container fluid id="postbox-menu">
          <Row>
            <Col>
              <div id="postbox-reply"><FontAwesomeIcon icon="comments" /></div>
            </Col>
            <Col>
              <div id="postbox-timestamp">{"mockup" /*TODO: <mockup> change to createTimeStamp()*/}</div>
            </Col>
          </Row>
        </Container>
      </div>
    </Col>
  );
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
export default Postbox;
