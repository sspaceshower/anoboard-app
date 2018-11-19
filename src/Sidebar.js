import React from 'react';
import { NavLink } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faEnvelope, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { createDisplayName } from './helper/helper.js'
import { db } from './firebase';
import {groupRef, studentsOfGroupRef} from "./firebase/firebase";
import withAuthorization from './session/withAuthorization.js';
import AuthUserContext from './session/authUserContext.js';
import './scss/sidebar.scss';


library.add(faHome);
library.add(faBell);
library.add(faEnvelope);
library.add(faPlusCircle);

const createMenu = (menulist) => {
  const iconStyle = {
    display: 'inline-block',
    padding: '0 0 0 15px',
    margin: '0',
    textAlign: 'center',
  };

  const labelStyle = {
    display: 'inline-block',
  };

  var menu = [];
  for(let i=0; i< menulist.length; i++){
    menu.push(
      <Row>
        <NavLink
          exact to={menulist[i].url}
          className="sidebar-button"
          activeClassName="active-sidebar-button"
          style={{textDecoration: "none"}}
        >
          <Col xs={2} style={iconStyle}><FontAwesomeIcon icon={menulist[i].icon} /></Col>
          <Col xs={10} style={labelStyle}>{menulist[i].label}</Col>
        </NavLink>
      </Row>
    );
  }
  return (
    menu
  );
};

const createSubMenu = (grouplist) => {
  var submenu = [];
  submenu.push(
    <div>
      {grouplist.map((name) => {
        return(
        <Row>
          <NavLink to={'/group/' + name}
            style={{textDecoration: "none"}}
            className="sub-menu-button"
            activeClassName="sub-menu-active">
            {name}
          </NavLink>
        </Row>
      )
      })}
    </div>
  )
  return (
    submenu
  );
};


class Sidebar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      groupNames: [],
    };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState(() => ({ currentUser: this.props.currentUser }))
    }
    if (this.props.users !== prevProps.users) {
      this.setState(() => ({ users: this.props.users }))
      // console.log("key, value");
      for (const [key, value] of Object.entries(this.props.users)) {
        if (this.state.currentUser.uid === key){
          console.log("PASSSSS!");
          console.log(key, value);
          this.setState(() => ({ currentUser: value }))
        }
        // console.log("key, value");
        // console.log(key, value);
      }
    }
  }

  componentDidMount() {

    var data_list = []

    db.onceGetOneUser(this.state.currentUser.uid).then(snapshot =>
      {
        console.log("snapshot")
        console.log(snapshot.val())
        if(snapshot.val().grouplist !== undefined && snapshot.val().grouplist !== null){

          for (const [key, value] of Object.entries(snapshot.val().grouplist)) {
            console.log("FROM HERE");
            console.log(value);
            var childData = value.name;
            data_list.push(childData);
            // console.log("key, value");
            // console.log(key, value);
          }

          // snapshot.val().grouplist.forEach(function(childSnapshot) {
          //   var key = childSnapshot.key;
          //   var childData = childSnapshot.val().name;
          //   data_list.push(childData);
          // });
          // console.log(data_list, data_list.length);
          this.setState({
            groupNames: data_list
          });
        }
      }
        // this.setState(() => ({ users: snapshot.val() }))
    );

    // groupRef.once("value").then((snapshot) => {
    //   snapshot.forEach(function(childSnapshot) {
    //     var key = childSnapshot.key;
    //     var childData = childSnapshot.val().name;
    //     data_list.push(childData);
    //   });
    //   // console.log(data_list, data_list.length);
    //   this.setState({
    //     groupNames: data_list
    //   });
    // });

  }

  render() {
    const menulist = [
      {icon: "home", label: "myboard", url: "/home"},
      {icon: "bell", label: "notifications", url: "/notifications"},
      {icon: "envelope", label: "messages", url: "/messages"}
    ];

    return(
      <AuthUserContext.Consumer>{ authUser =>

          <Col md={2} id="sidebar">
            <Row className="justify-content-md-center">
              <Col xs={8} id="sidebar-logo">logo</Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col xs={8} className="horizontal-line"></Col>
            </Row>
            <Col md={{size: 8, offset: 1}} id="sidebar-login-text">
              logged in as
            </Col>
            <Col md={{size: 8, offset: 1}} id="sidebar-login-user">
              {createDisplayName(authUser, false)}
            </Col>
            {createMenu(menulist)}
            <Row className="justify-content-md-center">
              <Col xs={8} className="horizontal-line"></Col>
            </Row>
            <Row>
              <NavLink to="/groups" style={{textDecoration: "none"}}><div className="sub-menu">GROUPS</div></NavLink>
              <Col><NavLink to="/search">
                <div className="plus-button"><FontAwesomeIcon icon="plus-circle" /></div>
              </NavLink></Col>
            </Row>
            {createSubMenu(this.state.groupNames)}
            <NavLink to={"/groups"} style={{textDecoration: "none"}}>
              <Row id="show-more">show more..</Row>
            </NavLink>
          </Col>

      }
      </AuthUserContext.Consumer>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Sidebar);
