import React from 'react'
import { object } from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import Login from './elements/login.js';
import Signup from './elements/signup.js';
import Myboard from './myboard.js';



class ModalSwitch extends React.PureComponent {
  static propTypes = {
    location: object.isRequired,
    history: object.isRequired,
  }

  previousLocation = this.props.location

  render () {
    const { location, history } = this.props

    const isNotModal = !location.state || !location.state.modal

    if (
      history.action !== 'POP' &&
      history.action !== 'REPLACE' &&
      isNotModal
    ) {
      this.previousLocation = location
    }

    // Not initial render
    const isModal = Boolean(
      location.state &&
        location.state.modal &&
        this.previousLocation !== location
    )

    return (
      // TODO: <frontend> resolve path, to be done after everything elese is finished
      <React.Fragment>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path='/' component={Myboard} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default ModalSwitch
