import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { db } from './firebase';
import Pacman from './components/pacman.js';
import FullBoard from './components/fullboard.js';
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
      userboard : "",
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
      console.log("fetching board");
      console.log(board);
      this.setState({userboard: board, loaded:true,loading:loading.NOTHING,});
    }).catch((err)=> {
      console.log("fetch board error",err);});
  }

  render(){
    if(this.state.loaded){
      return(
        <Container fluid>
          <Row className="wrapper">
            <Col md={{span:10, offset: 2}} style={paddingSet}>
              <FullBoard currentUser={this.props.currentUser} board={this.state.userboard}/>
            </Col>
          </Row>
        </Container>
      );
    } else { return (<Pacman />) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userboard);
