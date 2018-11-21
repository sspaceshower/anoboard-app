const initialState = {
  currentUser: {},
  loggedIn: false,
  renderFlag: 0,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return Object.assign({}, state, { currentUser: action.payload });
    case "LOGIN_STATUS":
      return Object.assign({}, state, { loggedIn: action.payload });
    case "RERENDER":
      return Object.assign({}, state, { renderFlag: action.payload });
    default:
      return state;
  }
};

export default rootReducer;
