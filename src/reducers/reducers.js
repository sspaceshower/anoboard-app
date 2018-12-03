const initialState = {
  uid: 0,
  username: '',
  email: '',
  fname: '',
  mname: '',
  lname: '',
  bio: '',
  groups: '',
  pool: '',
  hp: 0,
  status: '',
  fvh: '',
  fvg: '',
  fvgs: '',
  fvt: '',
  get_item: false,
  loggedIn: false,
  renderFlag: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_UID":
      return Object.assign({}, state, { uid: action.payload });
    case "UPDATE_USERNAME":
      return Object.assign({}, state, { username: action.payload });
    case "UPDATE_EMAIL":
      return Object.assign({}, state, { email: action.payload });
    case "UPDATE_FNAME":
      return Object.assign({}, state, { fname: action.payload });
    case "UPDATE_MNAME":
      return Object.assign({}, state, { mname: action.payload });
    case "UPDATE_LNAME":
      return Object.assign({}, state, { lname: action.payload });
    case "UPDATE_GROUPS":
      return Object.assign({}, state, { groups: action.payload });
    case "UPDATE_POOL":
      return Object.assign({}, state, { pool: action.payload });
    case "UPDATE_HP":
      return Object.assign({}, state, { hp: action.payload });
    case "UPDATE_STATUS":
      return Object.assign({}, state, { status: action.payload });
    case "UPDATE_BIO":
      return Object.assign({}, state, { bio: action.payload });
    case "UPDATE_FVH":
      return Object.assign({}, state, { fvh: action.payload });
    case "UPDATE_FVG":
      return Object.assign({}, state, { fvg: action.payload });
    case "UPDATE_FVGS":
      return Object.assign({}, state, { fvgs: action.payload });
    case "UPDATE_FVT":
      return Object.assign({}, state, { fvt: action.payload });
    case "UPDATE_GET":
      return Object.assign({}, state, { get_item: action.payload });
    case "LOGIN_STATUS":
      return Object.assign({}, state, { loggedIn: action.payload });
    case "RERENDER":
      return Object.assign({}, state, { renderFlag: action.payload });
    default:
      return state;
  }
};

export default rootReducer;
