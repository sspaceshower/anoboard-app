import React from 'react';
import Media from 'react-media';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { db } from './firebase';
import Pacman from './components/util/pacman.js';
import FullBoard from './components/users/fullboard.js';
import { loading } from './constants/loading.js';
import { mapStateToProps, mapDispatchToProps } from './reducers/map.js'

const paddingSet = {
  paddingLeft: '40px',
  paddingRight: '40px',
}

class Userboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      loading: loading.NOTHING,
      username: this.props.match.params.username,
      currentUser: {
        uid: this.props.uid,
        username: this.props.username,
        email: this.props.email,
        fname: this.props.fname,
        mname: this.props.mname,
        lname: this.props.lname,
        biography: this.props.bio,
        grouplist: this.props.groups,
        status: this.props.status,
        pool: this.props.pool,
        fvh: this.props.fvh,
        fvg: this.props.fvg,
        fvgs: this.props.fvgs,
        fvt: this.props.fvt,
      },
      uid: this.props.uid,
      userboard : "",
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.uid !== prevProps.uid) {
      this.setState(() => ({
        uid: this.props.uid,
        }))
    }
    if (this.props.board !== prevProps.board) {
      this.setState(() => ({
        board: this.props.board,
        posts: this.props.board.posts }))
    }
  }

  componentDidMount() {
    this.fetchBoardData();
  }

  fetchBoardData(){
    this.setState({
      loading:loading.RELOADING
    });
    db.onceGetBoards().then(snapshot =>
      {
        var board = null;
        for (const [key, value] of Object.entries(snapshot.val())){
          if (key === this.state.username){
            board = value;
            break;
          }
        }
      this.setState({userboard: board, loaded:true,loading:loading.NOTHING,});
    }).catch((err)=> {
      console.log("fetch board error",err);});
  }

  render(){
    console.log(this.state.currentUser);
    if(this.state.loaded){
      return(
        <Container fluid>
          <Row className="wrapper">
            <Media query="(min-width: 780px)">
              {matches => matches ? (
                <Col md={{span:10, offset: 2}} style={paddingSet}>
                  <FullBoard currentUser={this.state.currentUser} board={this.state.userboard} {...this.props}/>
                </Col>
              ) : (
                <Col xs={12}>
                  <FullBoard currentUser={this.state.currentUser} board={this.state.userboard} {...this.props}/>
                </Col>
              )}
            </Media>
          </Row>
        </Container>
      );
    } else { return (<Pacman Fullscreen />) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userboard);
