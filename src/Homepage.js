import React, { Component } from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { db } from './firebase';
import { loading } from './constants/loading.js';
import { mapStateToProps, mapDispatchToProps } from './reducers/map.js'
import withAuthorization from './session/withAuthorization.js';
import FullBoard from './components/users/fullboard.js';
import Pacman from './components/util/pacman.js';


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
      }

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
          if (key === this.props.username){
            board = value;
            break;
          }
        }
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
            <Media query="(min-width: 780px)">
              {matches => matches ? (
                <Col md={{span:10, offset: 2}} style={paddingSet}>
                  <FullBoard currentUser={this.state.currentUser} board={this.state.board} {...this.props}/>
                </Col>
              ) : (
                <Col xs={12}>
                  <FullBoard currentUser={this.state.currentUser} board={this.state.board} {...this.props}/>
                </Col>
              )}
            </Media>
          </Row>
        </Container>
      );
    } else {
      return(<Pacman Fullscreen/>);
    }
  }
}

const authCondition = (authUser) => !!authUser;

export default connect(mapStateToProps, mapDispatchToProps)(withAuthorization(authCondition)(Homepage));
