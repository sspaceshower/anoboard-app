import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { SIGN_IN } from './constants/routes';
import './scss/landing.scss'

const LandingPage = () => (
  <Container fluid className="landing-wrap">
    <Row className="justify-content-center">
      <div className="landing-title">Welcome to Anoboard!</div>
    </Row>
    <Row className="justify-content-center">
      <div className="landing-subtitle">follow these simple steps:</div>
    </Row>
    <div className="wide-space"></div>
    <Row>
      <Col md={4} xs={12} className="step-wrap">
        <Row className="landing-img-wrap justify-content-center">
          <img src={process.env.PUBLIC_URL + '/img/search.png'} alt="search" />
        </Row>
        <Row>
          <Col xs={{span: 10, offset: 1}} className="landing-step-title">
            1. Interact
          </Col>
          <Col xs={{span: 10, offset: 1}} className="landing-text">
            Get to know people! Join a group, start a conversation, choose to be an anonymous or be yourself
          </Col>
        </Row>
      </Col>
      <Col md={4} xs={12} className="step-wrap">
        <Row className="landing-img-wrap justify-content-center">
          <img src={process.env.PUBLIC_URL + '/img/treasure.png'} alt="treasure" />
        </Row>
        <Row>
          <Col xs={{span: 10, offset: 1}} className="landing-step-title">
            2. Collect
          </Col>
          <Col xs={{span: 10, offset: 1}} className="landing-text">
            Collect XP and Raise your level as you interact. Who knows, maybe you'll get something! (check the inventory)
          </Col>
        </Row>
      </Col>
      <Col md={4} xs={12} className="step-wrap">
        <Row className=" landing-img-wrap justify-content-center">
          <img src={process.env.PUBLIC_URL + '/img/sword.png'} alt="sword" />
        </Row>
        <Row>
          <Col xs={{span: 10, offset: 1}} className="landing-step-title">
            3. Battle
          </Col>
          <Col xs={{span: 10, offset: 1}} className="landing-text">
            Want to know who is the anonymous posting on your board?&nbsp;
            Press &nbsp;
            <img src={process.env.PUBLIC_URL + '/img/swords.png'} alt="fight" />&nbsp; to challenge them in a battle!&nbsp;
            But don't forget to check if you have enough HP.
          </Col>
        </Row>
      </Col>
    </Row>
    <Row className="justify-content-center">
      <NavLink to={ SIGN_IN }>
        <Button bsPrefix="button-started">
          Get Started
        </Button>
      </NavLink>
    </Row>
  </Container>
)

export default LandingPage;
