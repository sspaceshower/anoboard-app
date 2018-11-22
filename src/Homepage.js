import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { db } from './firebase';
import { loading } from './constants/loading.js';
import { mapStateToProps, mapDispatchToProps } from './reducers/map.js'
import withAuthorization from './session/withAuthorization.js';
import FullBoard from './components/fullboard.js';


const paddingSet = {
  paddingLeft: '40px',
  paddingRight: '40px',
}

class Homepage extends Component {

  constructor(props){
    super(props);
    this.state = {
      board: null,
      loading: loading.NOTHING,
      loaded: false,

    };
  }
  fetchBoardData(){
    this.setState({
      loading:loading.RELOADING
    });
    db.onceGetBoards().then(snapshot =>
      {
        var board = null;
        for (const [key, value] of Object.entries(snapshot.val())){
          if (key === this.props.currentUser.username){
            board = value;
            break;
          }
        }
      console.log("fetching board");
      console.log(board);
      this.setState({board: board, loaded:true,loading:loading.NOTHING,});
    }).catch((err)=> {
      console.log("fetch board error",err);});
  }

  componentDidMount() {
    this.fetchBoardData();
  }


  render() {

    if (this.state.loaded){
      return (
        <Container fluid>
          <Row className="wrapper">
            <Col md={{span:10, offset: 2}} style={paddingSet}>
              <FullBoard currentUser={this.props.currentUser} board={this.state.board}/>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return(<div>Loading...</div>);
    }
  }
}

const authCondition = (authUser) => !!authUser;

export default connect(mapStateToProps, mapDispatchToProps)(withAuthorization(authCondition)(Homepage));
