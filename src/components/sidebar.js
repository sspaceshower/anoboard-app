import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { createDisplayName } from '../helper/helper.js'
import { db } from '../firebase';
import '../scss/sidebar.scss';
import {classRef} from "../firebase/firebase";


library.add(faHome);
library.add(faBell);
library.add(faEnvelope);

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
      <Link to={menulist[i].url} style={{textDecoration: "none"}}>
        <Row className="sidebar-button">
          <Col xs={2} style={iconStyle}><FontAwesomeIcon icon={menulist[i].icon} /></Col>
          <Col xs={10} style={labelStyle}>{menulist[i].label}</Col>
        </Row>
      </Link>
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
        return <Link to={'/groups/' + name} style={{textDecoration: "none"}}><Row className="sub-menu-button">{name}</Row></Link>
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
      users: this.props.users
      classNames: [],
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
    classRef.once("value").then((snapshot) => {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val().name;
        data_list.push(childData);
      });
      console.log(data_list, data_list.length);
      this.setState({
        classNames: data_list
      });
    });
  }

  render() {
    const menulist = [
      {icon: "home", label: "myboard", url: "/"},
      {icon: "bell", label: "notifications", url: "/notifications"},
      {icon: "envelope", label: "messages", url: "/messages"}
    ];

    return(
      <Router>
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
            {createDisplayName(this.state.currentUser, false)}
          </Col>
          {createMenu(menulist)}
          <Row className="justify-content-md-center">
            <Col xs={8} className="horizontal-line"></Col>
          </Row>
          <Row className="sub-menu">GROUPS</Row>
          {createSubMenu(this.state.classNames)}
          <Link to={"/groups"} style={{textDecoration: "none"}}>
            <Row id="show-more">show more..</Row>
          </Link>
        </Col>
      </Router>
    );
  }
}

export default Sidebar;
