import { updateUser } from './actions.js'

export const mapStateToProps = state => {
  return { currentUser: state.currentUser };
};

export const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  };
};
