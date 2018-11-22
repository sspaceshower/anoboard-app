import React from 'react';
import { firebase } from '../firebase';

export const withAuthConst = () =>

  class withAuthConst extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.listener = firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      const { authUser } = this.state;

      return (
        authUser
      );
    }
  }
