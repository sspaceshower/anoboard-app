import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { db, firebase } from './firebase';
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
      loading: loading.NOTHING,
      username: this.props.match.params.username,
      userboard : "",
    }
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

  componentDidMount() {
    this.fetchBoardData();
  }

  render(){
    if(this.state.loaded){
      console.log("board");
      console.log(this.state.userboard);
      return(
        <Container fluid>
          <Row className="wrapper">
            <Col md={{span:10, offset: 2}} style={paddingSet}>
              <FullBoard currentUser={this.props.currentUser} board={this.state.userboard}/>
            </Col>
          </Row>
        </Container>
      );
    } else { return (<div>loader</div>) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userboard);
