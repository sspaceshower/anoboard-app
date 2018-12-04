import React from 'react';
import { Container, Row, Col, Modal, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPlus, faReply, faComments } from '@fortawesome/free-solid-svg-icons';
import { loading } from '../../constants/loading.js';
import { createDisplayName } from '../../helper/helper.js'
import * as routes from '../../constants/routes';
import { auth, db } from '../../firebase';
import BattleModal from './battleModal.js';
import AuthUserContext from '../../session/authUserContext.js';
import '../../scss/userboard.scss';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

library.add(faPlusCircle);
library.add(faPlus);
library.add(faReply);
library.add(faComments);

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      board: this.props.board,
      //access pool here, it's a list of armot,weapon, trophy
      //actually we don't need this, but just to make you see how to access it
      pool: this.props.pool,
      // posts : this.props.board.value.posts,
      modalShow: false,
      newItem: false,
      loaded: false,
			loading: loading.NOTHING,
    }
    this.fetchTrophyData = this.fetchTrophyData.bind(this);
    this.getToday = this.getToday.bind(this);
  }


  componentDidMount() {
    this.fetchTrophyData()
    var day_now = this.getToday()
    var uid = this.state.currentUser.uid;    

    var today_XP = 0
    var total_XP = this.state.currentUser.status.total_XP
    var level = this.state.currentUser.status.level
    var HP = this.state.currentUser.status.HP
    var weapon = this.state.currentUser.status.weapon
    var armor = this.state.currentUser.status.armor
    var trophy = this.state.currentUser.status.trophy
    var atk = 50 + weapon.atk
    var def = 50 + armor.def
    var get_item = false
    if(this.state.currentUser.status.lastUpdate.day!== day_now.day){
        db.updateXP(uid, today_XP, total_XP, day_now, HP , level, weapon, armor, trophy, atk, def, get_item)
        .then(() => {
          window.location.reload()
        })
        .catch(error => {
          this.setState({ error });
        })
    }
  }

  fetchTrophyData(){
		this.setState({
			loading:loading.RELOADING
		});
		db.onceGetTrophy().then(snapshot =>
		{
			this.setState({trophy: snapshot.val(), loaded:true, loading:loading.NOTHING,});
		}).catch((err)=> {
			console.log("fetch user error",err);});
  }

  getToday(){
    return {
      day: new Date().getDate(),
      month: (new Date().getMonth())+1,
      year: new Date().getFullYear()
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState(() => ({
        currentUser: this.props.currentUser,
        pool: this.props.pool
        }))
    }
    if (this.props.board !== prevProps.board) {
      this.setState(() => ({
        board: this.props.board,
        posts: this.props.board.posts }))
    }
  }


  createPostStack = (currentUser, board, trophy) => {
      var stack = [];
      if(board.posts!=null){
        for (const [key, value] of Object.entries(board.posts)) {
          stack.push(
            <Postbox post={value} currentUser = {currentUser} board ={board} trophy = {trophy} {...this.props}/>
          );
        }
      }
      return(stack);
  }

  render(){
    
    if(this.state.loaded){
    let modalClose = () => this.setState({ modalShow: false})
    return(
      <Row id="board">
        <Col md={12}>
            <Row className="justify-content-md-center">
              <Col sm={12} md={6} lg={4}>
                <div className="postbox-new-wrap">
                  <Row>
                      <Col className="postbox-icon-wrap">
                        <Button bsPrefix="custom-area-new-button" onClick={() => this.setState({modalShow: true})}>
                          <FontAwesomeIcon className="postbox-new-icon" icon="plus-circle" />
                        </Button>
                        <Postmodal
                          {...this.props}
                          show = {this.state.modalShow}
                          onHide = {modalClose}
                          currentUser = {this.state.currentUser}
                          board = {this.state.board}
                          trophy = {this.state.trophy}
                        />
                      </Col>
                  </Row>
                  <Row>
                      <Col className="postbox-new-text">
                        write a new post
                      </Col>
                  </Row>
                </div>
              </Col>
              {this.createPostStack(this.state.currentUser, this.state.board, this.state.trophy)}
            </Row>
        </Col>
      </Row>
    );
  } else{
    return(null);
  }
  }
}

class Postmodal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: this.props.currentUser,
      trophy: this.props.trophy,
      board: this.props.board,
      post: {
        author: this.props.currentUser,
        content: "",
        tag: null,
        isAnonymous: true,
        replies: null,
        timestamp: null
      },
    };
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleAnonimity = this.handleAnonimity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getToday = this.getToday.bind(this);
    this.calculateLevel = this.calculateLevel.bind(this);

  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentUser !== prevProps.currentUser) {
      var currentPost = this.state.post;
      currentPost.author = this.props.currentUser;
      this.setState(() => ({
        currentUser: this.props.currentUser,
        post: currentPost}))
    }
    if (this.props.board !== prevProps.board) {
      this.setState(() => ({
        board: this.props.board,
        }))
    }
  }
  handleContentChange(event){
    var currentPost = this.state.post;
    currentPost.content = event.target.value;
    this.setState({post: currentPost});
  }

  handleAnonimity(event){
    var currentPost = this.state.post;
    currentPost.isAnonymous = (event.target.value === "anonymous") ? true:false;
    this.setState({post: currentPost});
  }

  getToday(){
    return {
      day: new Date().getDate(),
      month: (new Date().getMonth())+1,
      year: new Date().getFullYear()
    }
  }

  calculateLevel(total_XP){
    //change level
    return(total_XP%40 == 0)
  }

  handleSubmit(event){
    var boardOwner = this.state.board.owner.username;


    var uid = this.state.currentUser.uid;
    var username = this.state.currentUser.username;
    var fname = this.state.currentUser.fname;
    var mname = this.state.currentUser.mname;
    var lname = this.state.currentUser.lname;
    var content = this.state.post.content;
    var isAnonymous = this.state.post.isAnonymous;
    const { history } = this.props;

    var today_XP = this.state.currentUser.status.today_XP
    var total_XP = this.state.currentUser.status.total_XP
    var level = this.state.currentUser.status.level
    var HP = this.state.currentUser.status.HP
    var weapon = this.state.currentUser.status.weapon
    var armor = this.state.currentUser.status.armor
    var trophy = this.state.currentUser.status.trophy
    var atk = 50 + weapon.atk
    var def = 50 + armor.def
    today_XP = today_XP + 20
    total_XP = total_XP + 20
    const day_now = this.getToday()
    //check time not same
    var day = day_now.day
    var month = day_now.month
    var year = day_now.year
    var day_user = this.state.currentUser.status.lastUpdate.day
    var month_user = this.state.currentUser.status.lastUpdate.month
    var year_user = this.state.currentUser.status.lastUpdate.year
    if(day !== day_user && month !== month_user && year !== year_user){
      today_XP = 20
    }
    var levelChange = this.calculateLevel(total_XP)
    //use this variable as get Trophy to be true or false
    var getTrophy = false
    var getWeapon = false
    var getArmor = false
    var key
    if(levelChange){
      level = level + 1
      if(level%2 === 0){
        HP = (level/2) + 1;
      } else {
        HP = (level-1)/2 + 1;
      }

        if(level<10){
          key = "level0" + level
        }
        else{
          key = "level" + level
        }
        if(this.state.trophy[key].trophy!=null && this.state.trophy[key].trophy!=undefined){
          getTrophy = true;
          trophy = this.state.trophy[key].trophy;
          db.updatePoolTrophy(uid, trophy);
        }
        if(this.state.trophy[key].weapon!=null && this.state.trophy[key].weapon!=undefined){
          getWeapon = true
          weapon = this.state.trophy[key].weapon;
          atk = 50 + weapon.atk;
          db.updatePoolWeapon(uid, weapon);
        }
        if(this.state.trophy[key].armor!=null && this.state.trophy[key].armor!=undefined){
          getArmor = true;
          armor = this.state.trophy[key].armor;
          def = 50 + armor.def;
          db.updatePoolArmor(uid, armor);
        }
    }
    const get_item =  getTrophy || getWeapon || getArmor;

    //TODO: <database> update level to board.owner.status.level too
    db.updateXP(uid, today_XP, total_XP, day_now, HP , level, weapon, armor, trophy, atk, def, get_item)
    .then(() => {
        db.updateBoard(username,level)
        .then(() => {
            db.doCreatePost(boardOwner, uid, username, fname, mname, lname, content, isAnonymous)
            .then(() => {
              this.setState(() => ({
                post: {
                  author: this.props.currentUser,
                  content: "",
                  tag: null,
                  isAnonymous: true,
                  replies: null,
                  timestamp: null
                }
              }), () => {
                if(get_item){
                  this.props.updateGet(true);
                } else {
                  window.location.reload()
                }
              });
            })
            .catch(error => {
              this.setState({ error });
            })
          })
        .catch(error => {
          this.setState({ error });
        })
    })
    .catch(error => {
      this.setState({ error });
    })
    event.preventDefault();
  }

  render() {
    return (
      <Modal
        {...this.props}
        aria-labelledby = "post-modal"
        dialogClassName = "custom-modal"
      >
        <Modal.Header bsPrefix="custom-modal-header">
          <Modal.Title style={iconStyle}><FontAwesomeIcon icon="plus" /></Modal.Title>
          <Modal.Title style={textStyle}>write a new post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Form>
              <Form.Group style={{textAlign: "center"}}>
                  <Form.Control
                    as = "textarea"
                    rows = "5"
                    name = "content"
                    value = {this.state.post.content}
                    placeholder = "write your message here"
                    onChange = {this.handleContentChange}
                  />
              </Form.Group>
              <Form.Group>
                <Row>
                  <Col xs={2}><div className="selector-text">post as</div></Col>
                  <Col>
                    <div key="custom-inline-radio" className="mb-3">
                      <Form.Check custom inline>
                        <Form.Check.Input type="radio" name="anonimity" value="anonymous"
                          defaultChecked
                          onChange={this.handleAnonimity}/>
                        <Form.Check.Label
                          bsPrefix= {this.state.post.isAnonymous ? "selector-label-checked" : "selector-label"}>
                          Anonymous
                        </Form.Check.Label>
                      </Form.Check>
                      <Form.Check custom inline>
                        <Form.Check.Input type="radio" name="anonimity" value="public"
                          onChange={this.handleAnonimity}/>
                        <Form.Check.Label
                          bsPrefix={this.state.post.isAnonymous ? "selector-label" : "selector-label-checked"}>
                          {createDisplayName(this.props.currentUser.fname, this.props.currentUser.mname, this.props.currentUser.lname, this.props.currentUser.username)}
                        </Form.Check.Label>
                      </Form.Check>
                    </div>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row><Col style={{textAlign: "center"}}>
                  <Button bsPrefix="submit-button" onClick={this.handleSubmit}>Post</Button>
                </Col></Row>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

class Postbox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      post: this.props.post,
      board: this.props.board,
      currentUser: this.props.currentUser,
      trophy: this.props.trophy,
      battleShow: false,
      modalShow: false,
    }
    var currentPost = this.state.post;
    currentPost.user = {username: this.state.post.username};
    this.setState({post: currentPost});

    this.getReplyNum = this.getReplyNum.bind(this);
    this.getToday = this.getToday.bind(this);
    this.checkHP = this.checkHP.bind(this);
  }


  getReplyNum(){
    if(this.state.post.replys !== undefined && this.state.post.replys !== null){
      return (Object.keys(this.state.post.replys).length);
    } else {
      return ("");
    }
  }

  //use this function to check whether you can click fight or not
  checkHP(){
    if(this.state.currentUser.status.HP >= 2){
      return true
    } else {
      return false
    }
  }


  getToday(){
    return {
      day: new Date().getDate(),
      month: (new Date().getMonth())+1,
      year: new Date().getFullYear()
    }
  }

  getAuthor(){
    if(this.state.post.isAnonymous){
      return(
        <Col xs={8}><div className="postbox-author-anonymous">anonymous</div></Col>
      );
    } else {
      return(
        <Col xs={8}>
          <NavLink to={"/user/" + this.state.post.username}>
            <div className="postbox-author-link">
              {createDisplayName(this.state.post.fname, this.state.post.mname, this.state.post.lname, this.state.post.username)}
            </div>
          </NavLink>
        </Col>
      );
    }
  }

  getFightButton() {
    if(this.checkHP()){
      return(
        <Button bsPrefix="postbox-fight-button" onClick={() => this.setState({battleShow: true})}>
          <img src={process.env.PUBLIC_URL + '/img/swords.png'} alt="fight" />
        </Button>
      );
    } else {
      return(
        <OverlayTrigger
        placement={"bottom"}
        overlay={
          <Tooltip id="tooltip">
            Your HP have to be more than 2 to start a fight
          </Tooltip>
        }
        >
        <Button disabled bsPrefix="postbox-fight-button-disabled">
          <img src={process.env.PUBLIC_URL + '/img/swords.png'} alt="fight" />
        </Button>
      </OverlayTrigger>
      );
    }
  }

  render(){
    let modalClose = () => this.setState({ modalShow: false})
    let battleClose = () => this.setState({ battleShow: false})
    return(
      <Col sm={12} md={6} lg={4}>
        <div className="postbox-wrap">
          <Row>
            {this.getAuthor()}
            <Col xs={4}><div className="postbox-tag">{"#classtag" /*TODO: <mockup> change to createTag*/}</div></Col>
          </Row>
          <Row><Col><div className="breakline"></div></Col></Row>
          <Row>
            <Col>
              <div className="postbox-content">
                {this.state.post.content /*TODO: <frontend> handle case where content is too long*/}
              </div>
            </Col>
          </Row>
          <Container fluid className="postbox-menu">
            <Row>
              <Col>
                <Button bsPrefix="postbox-reply-button" onClick={() => this.setState({modalShow: true})}>
                  <FontAwesomeIcon className="postbox-reply" icon="comments" />
                  <div className="postbox-reply-num">{this.getReplyNum()}</div>
                </Button>
                {this.getFightButton()}
                <BattleModal
                  {... this.props}
                  post = {this.state.post}
                  show = {this.state.battleShow}
                  onHide = {battleClose}
                  currentUser = {this.state.currentUser}
                />
                <Replymodal
                  {... this.props}
                  post = {this.state.post}
                  show = {this.state.modalShow}
                  onHide = {modalClose}
                  currentUser = {this.props.currentUser}
                  board = {this.state.board}
                  trophy = {this.state.trophy}
                />
              </Col>
              <Col>
                <div className="postbox-timestamp">{"timestamp" /*TODO: <mockup> change to createTimeStamp()*/}</div>
              </Col>
            </Row>
          </Container>
        </div>
      </Col>
    );
  }
}


class Replybox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      author: {
        username: this.props.reply.username,
        fname: this.props.reply.fname,
        mname: this.props.reply.mname,
        lname: this.props.reply.lname,
      },

      content: this.props.reply.content,
      // timestamp: this.props.reply.timestamp,
      isAnonymous: this.props.reply.isAnonymous,
    };

    var currentPost = this.state;
    currentPost.user = {username: this.state.author};
    this.setState({post: currentPost});
  }

  getAuthor(){
    if(this.state.isAnonymous){
      return(
        <Col xs={6}><div className="reply-author-anonymous">anonymous</div></Col>
      );
    } else {
      return(
        <Col xs={6}>
          <NavLink to={"/user/" + this.state.author.username}>
            <div className="reply-author-link">
              {createDisplayName(this.state.author.fname, this.state.author.mname, this.state.author.lname, this.state.author.username)}
            </div>
        </NavLink>
        </Col>
      );
    }
  }

  render(){
    return(
        <div className="reply-container">
          <Row>
            {this.getAuthor()}
            <Col xs={6}><div className="reply-tag">{"#classtag"}</div></Col>
          </Row>
          <Row>
            <Col>
              <div className="reply-content">
                {this.state.content /*TODO: <frontend> handle case where content is too long*/}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="reply-timestamp">{"timestamp" /*TODO: <mockup> change to createTimeStamp()*/}</div>
            </Col>
          </Row>
          <Row><div className="reply-breakline"></div></Row>
        </div>
    );
  }
}


class Replymodal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      post: this.props.post,
      board: this.props.board,
      reply: {
        author: this.props.currentUser,
        content: "",
        isAnonymous: (this.props.currentUser.uid === this.props.board.owner.uid) ? false: true,
        timestamp: null
      },
      trophy: this.props.trophy,
    };
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getToday = this.getToday.bind(this);
    this.calculateLevel = this.calculateLevel.bind(this);
    this.handleAnonimity = this.handleAnonimity.bind(this);
  }

  handleContentChange(event){
    var currentReply = this.state.reply;
    currentReply.content = event.target.value;
    this.setState({reply: currentReply});
  }

  handleAnonimity(event){
    var reply = this.state.reply;
    reply.isAnonymous = (event.target.value === "anonymous") ? true:false;
    this.setState({reply: reply});
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState(() => ({
        currentUser: this.props.currentUser,
        reply: {author: this.props.currentUser}}))
    }
    if (this.props.board !== prevProps.board) {
      this.setState(() => ({
        board: this.props.board,
        }))
    }
    if (this.props.post !== prevProps.post) {
      this.setState(() => ({
        post: this.props.post,
        }))
    }
  }

  getToday(){
    return {
      day: new Date().getDate(),
      month: (new Date().getMonth())+1,
      year: new Date().getFullYear()
    }
  }

  calculateLevel(total_XP){
    //change level
    return(total_XP%40 == 0)
  }

  handleSubmit(event){
    var boardOwner = this.state.board.owner.username;

    var uid = this.state.reply.author.uid;
    var username = this.state.reply.author.username;
    var fname = this.state.reply.author.fname;
    var mname = this.state.reply.author.mname;
    var lname = this.state.reply.author.lname;
    var content = this.state.reply.content;
    var isAnonymous = this.state.reply.isAnonymous;
    var postid = this.state.post.postid;
    const { history } = this.props;

    var today_XP = this.state.reply.author.status.today_XP
    var total_XP = this.state.reply.author.status.total_XP
    var level = this.state.reply.author.status.level
    var HP = this.state.reply.author.status.HP
    var weapon = this.state.reply.author.status.weapon
    var armor = this.state.reply.author.status.armor
    var trophy = this.state.reply.author.status.trophy
    var atk = 50 + weapon.atk
    var def = 50 + armor.def
    today_XP = today_XP + 10
    total_XP = total_XP + 10
    const day_now = this.getToday()
    //check time not same
    var day = day_now.day
    var month = day_now.month
    var year = day_now.year
    var day_user = this.state.reply.author.status.lastUpdate.day
    var month_user = this.state.reply.author.status.lastUpdate.month
    var year_user = this.state.reply.author.status.lastUpdate.year
    if(day !== day_user && month !== month_user && year !== year_user){
      today_XP = 10
    }
    var levelChange = this.calculateLevel(total_XP);
    //use this variable as get Trophy to be true or false
    var getTrophy = false;
    var getWeapon = false;
    var getArmor = false;
    var key;
    if(levelChange){
      level = level + 1;
      if(level%2 === 0){
        HP = (level/2) + 1;
      } else {
        HP = (level-1)/2 + 1;
      }

        if(level<10){
          key = "level0" + level
        }
        else{
          key = "level" + level
        }
        if(this.state.trophy[key].trophy!=null && this.state.trophy[key].trophy!=undefined){
          getTrophy = true
          trophy = this.state.trophy[key].trophy
          db.updatePoolTrophy(uid, trophy)
        }
        if(this.state.trophy[key].weapon!=null && this.state.trophy[key].weapon!=undefined){
          getWeapon = true
          weapon = this.state.trophy[key].weapon
          atk = atk + weapon.atk
          db.updatePoolWeapon(uid, weapon)
        }
        if(this.state.trophy[key].armor!=null && this.state.trophy[key].armor!=undefined){
          getArmor = true
          armor = this.state.trophy[key].armor
          def = def + armor.def
          db.updatePoolArmor(uid, armor)
        }
    }
    atk = 50 + weapon.atk
    def = 50 + armor.def
    const get_item = getTrophy || getWeapon || getArmor;
    

    //TODO: <database> update level to board.owner.status.level too
    db.updateXP(uid, today_XP, total_XP, day_now, HP , level, weapon, armor, trophy, atk, def, get_item)
    .then(() => {

      db.updateBoard(username,level)
        .then(() => {
              db.doCreateReply(boardOwner, uid, username, fname, mname, lname, content, isAnonymous, postid)
              .then(() => {
                console.log("reply");
                this.setState(() => ({
                  reply: {
                    author: this.props.currentUser,
                    content: "",
                    isAnonymous: true,
                    timestamp: null
                  },
                }),  () => {
                  if(get_item){
                    this.props.updateGet(true);
                  } else {
                    window.location.reload()
                  }
                });
              })
              .catch(error => {
                this.setState({ error });
              });
      }).catch(error => {
         this.setState({ error });
      })
    })
    .catch(error => {
      this.setState({ error });
    })
    event.preventDefault();

  }

  getRadio(){
    if(this.state.reply.author.uid !== this.state.board.owner.uid){
      return(
        <Form.Group>
          <Row>
            <Col xs={2}><div className="selector-text">reply as</div></Col>
            <Col>
              <div key="custom-inline-radio" className="mb-3">
                <Form.Check custom inline>
                  <Form.Check.Input type="radio" name="anonimity" value="anonymous"
                    defaultChecked
                    onChange={this.handleAnonimity}/>
                  <Form.Check.Label
                    bsPrefix= {this.state.reply.isAnonymous ? "selector-label-checked" : "selector-label"}>
                    Anonymous
                  </Form.Check.Label>
                </Form.Check>
                <Form.Check custom inline>
                  <Form.Check.Input type="radio" name="anonimity" value="public"
                    onChange={this.handleAnonimity}/>
                  <Form.Check.Label
                    bsPrefix={this.state.reply.isAnonymous ? "selector-label" : "selector-label-checked"}>
                    {createDisplayName(this.props.currentUser.fname, this.props.currentUser.mname, this.props.currentUser.lname, this.props.currentUser.username)}
                  </Form.Check.Label>
                </Form.Check>
              </div>
            </Col>
          </Row>
        </Form.Group>
      );
    } else {
      return(
        <Form.Group>
          <Row>
            <Col xs={2}><div className="selector-text">reply as</div></Col>
            <Col>
              <div key="custom-inline-radio" className="mb-3">
                <Form.Check custom inline>
                  <Form.Check.Input type="radio" name="anonimity" value="anonymous"
                    disabled />
                  <Form.Check.Label
                    bsPrefix= "selector-label-disabled">
                    Anonymous
                  </Form.Check.Label>
                </Form.Check>
                <Form.Check custom inline>
                  <Form.Check.Input type="radio" name="anonimity" value="public"
                    defaultChecked />
                  <Form.Check.Label
                    bsPrefix="selector-label-checked">
                    {createDisplayName(this.props.currentUser.fname, this.props.currentUser.mname, this.props.currentUser.lname, this.props.currentUser.username)}
                  </Form.Check.Label>
                </Form.Check>
              </div>
            </Col>
          </Row>
        </Form.Group>
      );
    }
  }

  render() {
    return (
      <Modal
        {...this.props}
        aria-labelledby = "reply-modal"
        dialogClassName = "custom-modal"
      >
        <Modal.Body>
          <Container fluid className="reply-stack-wrap">
            <div>{createReplyStack(this.state.post)}</div>
            <div className="custom-modal-header">
              <div style={iconStyle}><FontAwesomeIcon icon="reply" /></div>
              <div style={textStyle}>write a reply</div>
            </div>
            <Form>
              <Form.Group style={{textAlign: "center"}}>
                  <Form.Control
                    as = "textarea"
                    rows = "5"
                    name = "content"
                    value = {this.state.reply.content}
                    placeholder = "write your reply here"
                    onChange = {this.handleContentChange}
                  />
              </Form.Group>
              {this.getRadio()}
              <Form.Group>
                <Row><Col style={{textAlign: "center"}}>
                  <Button bsPrefix="submit-button" onClick={this.handleSubmit}>Reply</Button>
                </Col></Row>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

//TODO: <frontend> create timestamp
const createTimeStamp = (timestamp) => {
  return(
    timestamp
  );
}

//TODO: <frontend> create and link post tags
const createTag = (taglist) => {
  return(
    taglist
  );
}

const createReplyStack = (post) => {
  var stack = [];

  if(post.replys!=null){
    for (const [key, value] of Object.entries(post.replys)) {
      stack.push(
        <Replybox reply={value}/>
      );
    }
  }

  return(stack);
}

const textStyle = {
  fontFamily: "Lato-Bold",
  fontSize: "40px",
  color: "#47525E",
}

const iconStyle = {
  color: "#47525E",
  fontSize: "30px",
}

export default Board;
