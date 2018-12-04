import React from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { auth } from './firebase';
import { mapStateToProps, mapDispatchToProps } from './reducers/map.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { SIGN_OUT } from './constants/routes.js';
import withAuthorization from './session/withAuthorization.js';
import './scss/hamburger.scss'

library.add(faHeart);

class Hamburger extends React.Component {
  constructor(props){
    super(props);
    this.state={
      menuOpen:false,
    }
  }

  handleMenuClick() {
     this.setState({menuOpen:!this.state.menuOpen});
   }

   handleLinkClick() {
     this.setState({menuOpen: false});
   }

   createHPbar(){
     var hpbar = [];
     for(let i=0; i<this.props.status.HP; i++){
       hpbar.push(
         <FontAwesomeIcon className="hp-heart-h" icon="heart" />
       )
     }
     console.log(hpbar);
     return hpbar;
   }

   render(){
     const menulist = [
       {label: "myboard", url: "/home"},
       {label: "notifications", url: "/notifications"},
       {label: "messages", url: "/messages"},
       {label: "inventory", url: "/inventory"},
       {label: "my groups", url: "/groups"},
       {label: "join", url: "/search"},
       {label: "sign out", url: SIGN_OUT}
     ];

     var menuItems = [];
     for(let i=0; i< menulist.length; i++){
       menuItems.push(
         <MenuItem
           label={menulist[i].label}
           url={menulist[i].url}
           delay={`${i * 0.1}s`}
           />
      );
    }

     return(
       <div>
         <div className="hamburger-container">
           <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='#A19797'/>
           <div className="hamburger-logo">Anoboard</div>
         </div>
         <Menu open={this.state.menuOpen}>
           <Row className="hp-wrap-h justify-content-center">
             <div className="hp-text-h"> Current HP: </div>
             {this.createHPbar()}
           </Row>
           {menuItems}
         </Menu>
       </div>
     )
   }
 }

 /* MenuItem.jsx*/
 class MenuItem extends React.Component{
   constructor(props){
     super(props);
     this.state = {
       hover:false,
     }
   }

   handleHover(){
     this.setState({hover:!this.state.hover});
   }

   render(){
     const styles={
       container: {
         animationDelay: this.props.delay,
       },
       menuItem:{
         animationDelay:this.props.delay,
       },

       line: {
         animationDelay:this.props.delay,
       }
     }
     return(
       <div className="menu-list" style={styles.container}>
         <NavLink to={this.props.url} className="menu-item" style={styles.menuItem}>
           {this.props.label}
         </NavLink>
       <div className="line" style={styles.line}/>
     </div>
     )
   }
 }

 /* Menu.jsx */
 class Menu extends React.Component {
   constructor(props){
     super(props);
     this.state={
       open: this.props.open? this.props.open:false,
     }
   }

   componentWillReceiveProps(nextProps){
     if(nextProps.open !== this.state.open){
       this.setState({open:nextProps.open});
     }
   }

   render(){
     const styles={
       container: {
         position: 'absolute',
         top: 0,
         left: 0,
         height: this.state.open? '100%': 0,
         width: '100vw',
         display: 'flex',
         flexDirection: 'column',
         background: 'white',
         opacity: 0.99,
         color: '#fafafa',
         transition: 'height 0.3s ease',
         zIndex: 2,
       },
       menuList: {
         paddingTop: '4rem',
       }
     }
     return(
       <div style={styles.container}>
         {
           this.state.open?
             <div style={styles.menuList}>
               {this.props.children}
             </div>:null
         }
       </div>
     )
   }
 }

 /* MenuButton.jsx */
 class MenuButton extends React.Component {
   constructor(props){
     super(props);
     this.state={
       open: this.props.open? this.props.open:false,
       color: this.props.color? this.props.color:'black',
     }
   }

   componentWillReceiveProps(nextProps){
     if(nextProps.open !== this.state.open){
       this.setState({open:nextProps.open});
     }
   }

   handleClick(){
   this.setState({open:!this.state.open});
   }

   render(){
     const styles = {
       container: {
         height: '32px',
         width: '32px',
         display:'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         cursor: 'pointer',
         padding: '4px',
         marginLeft: '8px'
       },
       line: {
         height: '2px',
         width: '20px',
         background: this.state.color,
         transition: 'all 0.2s ease',
       },
       lineTop: {
         transform: this.state.open ? 'rotate(45deg)':'none',
         transformOrigin: 'top left',
         marginBottom: '5px',
       },
       lineMiddle: {
         opacity: this.state.open ? 0: 1,
         transform: this.state.open ? 'translateX(-16px)':'none',
       },
       lineBottom: {
         transform: this.state.open ? 'translateX(-1px) rotate(-45deg)':'none',
         transformOrigin: 'top left',
         marginTop: '5px',
       },
     }
     return(
       <div style={styles.container}
         onClick={this.props.onClick ? this.props.onClick:
           ()=> {this.handleClick();}}>
         <div style={{...styles.line,...styles.lineTop}}/>
         <div style={{...styles.line,...styles.lineMiddle}}/>
         <div style={{...styles.line,...styles.lineBottom}}/>
       </div>
     )
   }
 }



const authCondition = (authUser) => !!authUser;

export default connect(mapStateToProps, mapDispatchToProps)(withAuthorization(authCondition)(Hamburger));
