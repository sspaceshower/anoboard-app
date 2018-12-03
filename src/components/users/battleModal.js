import React from 'react';
import { NavLink } from 'react-router-dom'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { createDisplayName } from '../../helper/helper.js'
import { loading } from '../../constants/loading.js';
import { db } from '../../firebase';
import Pacman from '../util/pacman.js';
import '../../scss/userboard.scss';

const textStyle = {
  fontFamily: "Lato-Bold",
  fontSize: "40px",
  color: "#47525E",
}

class BattleModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      loading: loading.NOTHING,
      post: this.props.post,
      currentUser: this.props.currentUser,
      inBattle: true,
      battle: false,
      win: true,
    }

    this.clickAttack = this.clickAttack.bind(this);
    this.calculateATK = this.calculateATK.bind(this);
    this.calculateEnemyDef = this.calculateEnemyDef.bind(this);
    this.fight = this.fight.bind(this);
  }

  componentDidMount() {
		this.fetchUserData()
  }

  fetchUserData(){
		this.setState({
			loading:loading.RELOADING,
		});
		db.onceGetOneUser(this.state.post.uid).then(snapshot =>
		{
			const data_list = [];
			if(snapshot.val().grouplist !== undefined && snapshot.val().grouplist !== null){
				for (const [key, value] of Object.entries(snapshot.val().grouplist)) {
					var childData = value.name;
					data_list.push(childData);
				}
			}
			var user = {
				uid: snapshot.val().uid,
				username: snapshot.val().username,
				email: snapshot.val().email,
				fname: snapshot.val().fname,
				mname: snapshot.val().mname,
				lname: snapshot.val().lname,
				biography: snapshot.val().biography,
				grouplist: data_list,
				status: snapshot.val().status,
			}

			this.setState({postUser: user, loaded:true, loading:loading.NOTHING,});
		}).catch((err)=> {
			console.log("fetch user error",err);});
  }

  //TODO:use this function for clicking fight!!
  clickAttack(){
    this.setState({inBattle: true, battle: true})
    //get post'owner -> XP,ATK,DEF,Weapon.ATK,Armor,HP,Today_XP,Total_XP

    //get current user -> XP,ATK,DEF,Weapon.ATK,Armor,HP,Today_XP,Total_XP
    var currentUser = this.state.currentUser
    var HP = this.state.currentUser.status.HP

    var atk = this.calculateATK(currentUser)
    var def = this.calculateEnemyDef()
    var FightResult = this.fight(atk,def)

    HP = HP - 2

    db.updateHP(this.state.currentUser.uid, HP).then(() => {
      this.setState({win: FightResult}, () => {
        setTimeout(() => {
          this.setState({inBattle: false});
        }, 1000)
      })
    })

  }

  calculateATK(currentUser){
    //TODO: we must delete all users again to create status there in firebase
    var atk = currentUser.status.atk
    if(currentUser.status.weapon != null && currentUser.status.weapon != undefined){
      atk = atk + currentUser.status.weapon.atk
    }
    return atk

  }
  calculateEnemyDef(){
    //get post'owner -> XP,ATK,DEF,Weapon.ATK,Armor,HP,Today_XP,Total_XP

    //get current user -> XP,ATK,DEF,Weapon.ATK,Armor,HP,Today_XP,Total_XP
    var def = this.state.postUser.def
    if(this.state.postUser.status != null && this.state.postUser.status != undefined){
      def = def + this.state.postUser.status.armor.def
    }
    return def
  }
  fight(atk,def){
    if(atk > def) return true
    else return false
  }

  render() {
    return(
      <Modal
        {...this.props}
        aria-labelledby = "battle-modal"
        dialogClassName = "custom-modal"
      >
      <Modal.Header bsPrefix="custom-modal-header">
        <Modal.Title>
          <img src={process.env.PUBLIC_URL + '/img/swords-blue.png'} style={{marginTop: "20px"}} alt="fight" />
        </Modal.Title>
        <Modal.Title style={textStyle}>Battle Mode</Modal.Title>
      </Modal.Header>
      { this.state.loaded? (
        this.state.battle? (
          this.state.inBattle? (
            <Modal.Body bsPrefix="battle-body-wrap">
              <div className="spacer"></div>
              <div className="spacer"></div>
              <div className="spacer"></div>
              <Pacman />
              <div className="spacer"></div>
            </Modal.Body>
          ) : (
            this.state.win? (
              <Modal.Body bsPrefix="battle-body-wrap">
                <div className="battle-congrats">Victory</div>
                <div className="battle-message">Congratulations! You defeat the anonymous! Now you can find them here</div>
                <Row className="justify-content-center">
                  <NavLink to={"/user/" + this.state.post.username}>
                    <div className="battle-author-link">
                      {createDisplayName(this.state.post.fname, this.state.post.mname, this.state.post.lname, this.state.post.username)}
                    </div>
                </NavLink>
                </Row>
              </Modal.Body>
            ) : (
              <Modal.Body bsPrefix="battle-body-wrap">
                <div className="battle-failed">Defeated</div>
                <div className="battle-message">Maybe your attack was not strong enough. Try again next time.</div>
              </Modal.Body>
            )
          )
        ):(
            <Modal.Body bsPrefix="battle-body-wrap">
              <Container fluid>
                <Row>
                  <Col>
                    <div className="battle-text">Do you want to start the battle?</div>
                  </Col>
                </Row>
                <Row>
                  <Col style={{textAlign: "center", position: "relative"}}>
                    <Button
                      bsPrefix="cancel-sq-button"
                      onClick={this.props.onHide}>
                      Retreat
                    </Button>
                    <Button
                      bsPrefix="fight-sq-button"
                      onClick={() => this.clickAttack()}
                      >
                      Fight!
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
        )
      ) : (
        null
      )}
      </Modal>
    );
  }
}

export default BattleModal;
