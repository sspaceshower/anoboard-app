import React from 'react';
import '../scss/userboard.scss';
import { createUser, deleteUser } from '../helper/users.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fname: null,
      mname: null,
      lname: null,
      username: null,
      password: null,
      uid: null
    };
  }

  fname_handle(e) {
    this.setState({ fname: e.target.value });
  }

  mname_handle(e) {
    this.setState({ mname: e.target.value });
  }

  lname_handle(e) {
    this.setState({ lname: e.target.value });
  }
  
  username_handle(e) {
    this.setState({ username: e.target.value });
  }

  pwd_handle(e) {
    this.setState({ password: e.target.value });
  }
  std_id_handle(e) {
    this.setState({ uid: e.target.value });
  }

  render(){
    // TODO: change /myboard Link to /myboard/{student_id}
    return(
    <Router>
        <div>
            First Name
            <input type="text" onChange={this.fname_handle.bind(this)}/>
            Middle Name
            <input type="text" onChange={this.mname_handle.bind(this)}/>
            Last Name
            <input type="text" onChange={this.lname_handle.bind(this)}/>
            student_id          
            <input type="text" onChange={this.std_id_handle.bind(this)}/>
            User Name
            <input type="text" onChange={this.username_handle.bind(this)}/>
            Password
            <input type="text" onChange={this.pwd_handle.bind(this)}/>

            {createUser(this.state)}
            <Link to={"/myboard"} style={{textDecoration: "none"}}>                                
                <input
                type="button"
                value="Sign in"                    
                />
            </Link>            
        </div>
    </Router>
    );
  }
}

export default Signup;