import React from 'react';
import { NavLink } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { auth } from './firebase'
import { mapStateToProps, mapDispatchToProps } from './reducers/map.js'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBell, faEnvelope, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { createDisplayName } from './helper/helper.js'
import withAuthorization from './session/withAuthorization.js';
import AuthUserContext from './session/authUserContext.js';
import './scss/sidebar.scss';


library.add(faHome);
library.add(faBell);
library.add(faEnvelope);
library.add(faPlusCircle);

class Sidebar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      renderFlat: this.props.renderFlag,
    }
  }


  render() {
    const menulist = [
      {icon: "home", label: "myboard", url: "/home"},
      {icon: "bell", label: "notifications", url: "/notifications"},
      {icon: "envelope", label: "messages", url: "/messages"}
    ];

    return(
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
          {createDisplayName(this.props.currentUser, false)}
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
        {createSubMenu(this.props.currentUser.grouplist)}
        <NavLink to={"/groups"} style={{textDecoration: "none"}}>
          <Row id="show-more">show more..</Row>
        </NavLink>
        <div className="center-wrap"><button className="custom-button-brown" onClick={auth.doSignOut}>Logout</button></div>
      </Col>
    );
  }
}


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

const authCondition = (authUser) => !!authUser;

export default connect(mapStateToProps, mapDispatchToProps)(withAuthorization(authCondition)(Sidebar));
