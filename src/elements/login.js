import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Login extends React.Component {  

    constructor(props){
        super(props);        
        this.state = {          
          input: "20160843"
        }
    }
  handleChange(e) {
    this.setState({ input: e.target.value });
  }

  render(){
    return(
        <Router>
            <div>
                Student ID
                <input type="text" onChange={ this.handleChange.bind(this) }/>                
                <Link to={`/myboard/${this.state.input}`} style={{textDecoration: "none"}}>                                
                    <input
                    type="button"
                    value="Sign in"                    
                    />
                </Link>
                <Link to={"/signup"} style={{textDecoration: "none"}}>                                
                    <input
                    type="button"
                    value="Sign up"                    
                    />
                </Link>
            </div>
        </Router>
    );
  }
}

export default Login;