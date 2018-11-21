import { updateUser, loginStatus, reRender } from './actions.js'

export const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    loggedIn: state.loggedIn,
    renderFlag: state.renderFlag,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user)),
    loginStatus: status => dispatch(loginStatus(status)),
    reRender: value => dispatch(reRender(value))
  };
};
