import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
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
  const author = post.isAnonymous? 'anonymous':post.author;
  return(
    <Col xs={12} sm={6} md={4}>
      <div className="postbox-wrap">
        <Row className>
          <Col xs={5} className="postbox-author">{author}</Col>
          <Col xs={7} className="postbox-tag">{"#mockup" /*TODO: <mockup> change to createTag*/}</Col>
        </Row>
        <Row className="breakline"></Row>
        <Row className="postbox-content">{post.content /*TODO: <frontend> handle case where content is too long*/}</Row>
        <Row>
          <div className="postbox-reply"><FontAwesomeIcon icon="comments" /></div>
          <div className="postbox-timestamp">{"mockup" /*TODO: <mockup> change to createTimeStamp()*/}</div>
        </Row>
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
