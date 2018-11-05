import React from 'react';
import {Link} from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import './scss/sidemenu.scss';

library.add(faHome);
library.add(faBell);
library.add(faEnvelope);
var menulist = ["myboard", "notification", "messages"];
var iconlist = ["home", "bell", "envelope"];
var grouplist = ["CS473", "CS555", "CS250", "CS101"]; //TODO: <database> request group list from server
var iconStyle = {
  display: 'inline-block',
  padding: '0',
  margin: '0',
}

var labelStyle = {
  display: 'inline-block',
}

function createMenu(){
  var menu = [];
  for(var i=0; i<menulist.length; i++){
    menu.push(
      <Row className="sidebar-button">
        <Col xs={1} style={iconStyle}><FontAwesomeIcon icon={iconlist[i]} /></Col>
        <Col xs={11} style={labelStyle}>{menulist[i]}</Col>
      </Row>
    );
  }
  return (
    menu
  );
}

function createSubMenu(){
  var submenu = [];
  for(var i=0; i<grouplist.length; i++){
    submenu.push(
      <Row className="sub-menu-button">
        <div># {grouplist[i]}</div>
      </Row>
    );
  }
  return (
    submenu
  );
}

function Sidemenu() {
  return(
    <Col hidden-xs md={2} id="sidebar">
      <Row>
        <Col xsOffset={2} xs={8} className="sidebar-logo">logo</Col>
      </Row>
      <Row>
        <Col xsOffset={2} xs={8} className="horizontal-line"></Col>
      </Row>
      {createMenu()}
      <Row>
        <Col xsOffset={2} xs={8} className="horizontal-line"></Col>
      </Row>
      <Row className="sub-menu">GROUPS</Row>
      {createSubMenu()}
      <Row className="show-more">show more..</Row>
    </Col>
  );
}

export default Sidemenu;
