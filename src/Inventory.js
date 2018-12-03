import React from 'react';
import { connect } from 'react-redux';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { mapStateToProps, mapDispatchToProps } from './reducers/map.js'
import withAuthentication from './session/withAuthentication.js';
import './scss/inventory.scss'

class Inventory extends React.Component {
  render(){

    return(
      <Col md={{span:10, offset: 2}} style={{padding: "30px 40px 30px 40px"}}>
        <Container fluid style={{paddingLeft: "0"}}>
          <Row className="page-wrap">
            <Container fluid>
              <Row className="justify-content-center">
                <div className="inventory-title">
                  Inventory
                </div>
              </Row>
              <Row>
                <Col>
                  <Row className="item-main-title">Trophy</Row>
                  <Row className="category-warp">
                    {
                     Object.keys(this.props.pool.trophy).map((key, value) => (
                       <TrophyBadge item={this.props.pool.trophy[key]} setTrophy={this.props.status.trophy.name} />
                     ))
                   }
                 </Row>
                </Col>
              </Row>

              <div className="horizontal-line"></div>

              <Row>
                <Col>
                  <Row className="item-main-title">Weapon</Row>
                  <Row className="category-warp">
                    {
                     Object.keys(this.props.pool.weapon).map((key, value) => (
                       <WeaponBadge item={this.props.pool.weapon[key]} setWeapon={this.props.status.weapon.name} />
                     ))
                   }
                 </Row>
                </Col>
              </Row>

              <div className="horizontal-line"></div>

              <Row>
                <Col>
                  <Row className="item-main-title">Armor</Row>
                  <Row className="category-warp">
                    {
                     Object.keys(this.props.pool.armor).map((key, value) => (
                       <ArmorBadge item={this.props.pool.armor[key]} setArmor={this.props.status.armor.name} />
                     ))
                   }
                 </Row>
                </Col>
              </Row>
            </Container>
          </Row>
        </Container>
      </Col>
    );
  }
}

class TrophyBadge extends React.Component {

  getSetButton(){
    if(this.props.item.name !== this.props.setTrophy){
      return(
        <Button bsPrefix="equip-button">
          EQUIP
        </Button>
      );
    } else {
      return(
        <Button bsPrefix="set-button" disabled>
          SET
        </Button>
      );
    }
  }

  render() {
    return(
      <div className="item-wrap">
        <Row className="item-badge justify-content-center">
          <img
            src={process.env.PUBLIC_URL + this.props.item.url}
            alt={this.props.item.name}
            />
        </Row>
        <Row className="item-name justify-content-center">{this.props.item.name}</Row>
        <Row className="justify-content-center">{this.getSetButton() /*TODO: implement onClick (set trophy to users' status)*/}</Row>
      </div>
    );
  }
}


class WeaponBadge extends React.Component {

  getSetButton(){
    if(this.props.item.name !== this.props.setWeapon){
      return(
        <Button bsPrefix="equip-button">
          EQUIP
        </Button>
      );
    } else {
      return(
        <Button bsPrefix="set-button" disabled>
          SET
        </Button>
      );
    }
  }

  render() {
    return(
      <div className="item-wrap">
        <Row className="item-badge justify-content-center">
          <img
            src={process.env.PUBLIC_URL + this.props.item.url}
            alt={this.props.item.name}
            />
        </Row>
        <Row className="item-name justify-content-center">{this.props.item.name}</Row>
        <Row className="item-effect justify-content-center">ATK : +{this.props.item.atk}</Row>
        <Row className="justify-content-center">{this.getSetButton() /*TODO: implement onClick (set weapon to users' status)*/}</Row>
      </div>
    );
  }
}


class ArmorBadge extends React.Component {

  getSetButton(){
    if(this.props.item.name !== this.props.setArmor){
      return(
        <Button bsPrefix="equip-button">
          EQUIP
        </Button>
      );
    } else {
      return(
        <Button bsPrefix="set-button" disabled>
          SET
        </Button>
      );
    }
  }

  render() {
    return(
      <div className="item-wrap">
        <Row className="item-badge justify-content-center">
          <img
            src={process.env.PUBLIC_URL + this.props.item.url}
            alt={this.props.item.name}
            />
        </Row>
        <Row className="item-name justify-content-center">{this.props.item.name}</Row>
        <Row className="item-effect justify-content-center">DEF : +{this.props.item.def}</Row>
        <Row className="justify-content-center">{this.getSetButton() /*TODO: implement onClick (set armor to users' status)*/}</Row>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(Inventory));
