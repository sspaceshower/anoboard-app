import React from 'react';
import Media from 'react-media';
import { connect } from 'react-redux';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { mapStateToProps, mapDispatchToProps } from './reducers/map.js'
import withAuthentication from './session/withAuthentication.js';
import {db} from './firebase';
import './scss/inventory.scss'
import { updateUid } from './reducers/actions.js';

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
                  <Row className="item-main-title justify-content-center justify-content-md-start">Trophy</Row>
                  <Row className="category-warp">
                    {
                     Object.keys(this.props.pool.trophy).map((key, value) => (
                       <TrophyBadge item={this.props.pool.trophy[key]} setTrophy={this.props.status.trophy.name} uid={this.props.uid} username={this.props.username}/>
                     ))
                   }
                 </Row>
                </Col>
              </Row>

              <div className="horizontal-line"></div>

              <Row>
                <Col>
                  <Row className="item-main-title justify-content-center justify-content-md-start">Weapon</Row>
                  <Row className="category-warp">
                    {
                     Object.keys(this.props.pool.weapon).map((key, value) => (
                       <WeaponBadge item={this.props.pool.weapon[key]} setWeapon={this.props.status.weapon.name} uid={this.props.uid} username={this.props.username}/>
                     ))
                   }
                 </Row>
                </Col>
              </Row>

              <div className="horizontal-line"></div>

              <Row>
                <Col>
                  <Row className="item-main-title justify-content-center justify-content-md-start">Armor</Row>
                  <Row className="category-warp">
                    {
                     Object.keys(this.props.pool.armor).map((key, value) => (
                       <ArmorBadge item={this.props.pool.armor[key]} setArmor={this.props.status.armor.name} uid={this.props.uid} username={this.props.username} />
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

  constructor(props){
    super(props);
    this.updateTrophy = this.updateTrophy.bind(this)
  }

  updateTrophy(event){
    db.updateUserTrophy(this.props.uid, this.props.item)
    .then(() => {
        db.updateBoardTrophy(this.props.username, this.props.item)
        .then(() => {
          this.setState(() => {
            window.location.reload()
          })

        })
        .catch(error => {
          this.setState({ error });
        })
    })
    event.preventDefault();
  }

  getSetButton(){
    if(this.props.item.name !== this.props.setTrophy){
      return(
        <Button bsPrefix="equip-button" onClick={this.updateTrophy}>
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
      <Media query="(min-width: 780px)">
        {matches => matches? (
          <div className="item-wrap">
            <Row className="item-badge justify-content-center">
              <img
                src={process.env.PUBLIC_URL + this.props.item.url}
                alt={this.props.item.name}
                />
            </Row>
            <Row className="item-name justify-content-center">{this.props.item.name}</Row>
            <Row className="justify-content-center">{this.getSetButton() /*TODO: implement onClick (set armor to users' status)*/}</Row>
          </div>
        ): (
          <Col className="item-wrap">
            <Row className="item-badge justify-content-center">
              <img
                src={process.env.PUBLIC_URL + this.props.item.url}
                alt={this.props.item.name}
                />
            </Row>
            <Row className="item-name justify-content-center">{this.props.item.name}</Row>
            <Row className="justify-content-center">{this.getSetButton() /*TODO: implement onClick (set armor to users' status)*/}</Row>
          </Col>
        )}
      </Media>
    );
  }
}


class WeaponBadge extends React.Component {

  constructor(props){
    super(props);
    this.updateWeapon = this.updateWeapon.bind(this)
  }

  updateWeapon(event){
    db.updateUserWeapon(this.props.uid, this.props.item, 50 + this.props.item.atk)
    .then(() => {
        db.updateBoardWeapon(this.props.username, this.props.item, 50 + this.props.item.atk)
        .then(() => {
          this.setState(() => {
            window.location.reload()
          })

        })
        .catch(error => {
          this.setState({ error });
        })
    })
    event.preventDefault();
  }

  getSetButton(){
    if(this.props.item.name !== this.props.setWeapon){
      return(
        <Button bsPrefix="equip-button" onClick={this.updateWeapon}>
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
      <Media query="(min-width: 780px)">
        {matches => matches? (
          <div className="item-wrap">
            <Row className="item-badge justify-content-center">
              <img
                src={process.env.PUBLIC_URL + this.props.item.url}
                alt={this.props.item.name}
                />
            </Row>
            <Row className="item-name justify-content-center">{this.props.item.name}</Row>
            <Row className="item-effect justify-content-center">ATK : +{this.props.item.atk}</Row>
            <Row className="justify-content-center">{this.getSetButton() /*TODO: implement onClick (set armor to users' status)*/}</Row>
          </div>
        ): (
          <Col className="item-wrap">
            <Row className="item-badge justify-content-center">
              <img
                src={process.env.PUBLIC_URL + this.props.item.url}
                alt={this.props.item.name}
                />
            </Row>
            <Row className="item-name justify-content-center">{this.props.item.name}</Row>
            <Row className="item-effect justify-content-center">ATK : +{this.props.item.atk}</Row>
            <Row className="justify-content-center">{this.getSetButton() /*TODO: implement onClick (set armor to users' status)*/}</Row>
          </Col>
        )}
      </Media>
    );
  }
}


class ArmorBadge extends React.Component {

  constructor(props){
    super(props);
    this.updateArmor = this.updateArmor.bind(this)
  }

  updateArmor(event){
    db.updateUserArmor(this.props.uid, this.props.item, 50 + this.props.item.def)
    .then(() => {
        db.updateBoardArmor(this.props.username, this.props.item, 50 + this.props.item.def)
        .then(() => {
          this.setState(() => {
            window.location.reload()
          })

        })
        .catch(error => {
          this.setState({ error });
        })
    })
    event.preventDefault();
  }
  getSetButton(){
    if(this.props.item.name !== this.props.setArmor){
      return(
        <Button bsPrefix="equip-button" onClick={this.updateArmor}>
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
      <Media query="(min-width: 780px)">
        {matches => matches? (
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
        ): (
          <Col className="item-wrap">
            <Row className="item-badge justify-content-center">
              <img
                src={process.env.PUBLIC_URL + this.props.item.url}
                alt={this.props.item.name}
                />
            </Row>
            <Row className="item-name justify-content-center">{this.props.item.name}</Row>
            <Row className="item-effect justify-content-center">DEF : +{this.props.item.def}</Row>
            <Row className="justify-content-center">{this.getSetButton() /*TODO: implement onClick (set armor to users' status)*/}</Row>
          </Col>
        )}
      </Media>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withAuthentication(Inventory));
