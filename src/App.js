import React, { Component } from 'react';
import logo from './logo.svg';
import Myboard from './myboard.js'
import Login from './elements/login.js';
import { Route } from 'react-router-dom'
import './App.css';
import ModalSwitch from './modal-switch'

class App extends Component {
  render() {
    return (
      <Login>
        <Route component={ModalSwitch} />
      </Login>
    );
  }
}

export default App;
