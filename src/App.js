import React, { Component } from 'react';
import logo from './logo.svg';
import Myboard from './myboard.js'
import Login from './elements/login.js';
import { Route } from 'react-router-dom'
import './App.css';
import ModalSwitch from './modal-switch'
import Signup from './elements/signup';

class App extends Component {
  render() {
    return (
      <Myboard>
        <Route component={ModalSwitch} />
      </Myboard>
    );
  }
}

export default App;
