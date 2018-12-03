import * as actions from './actions.js'

export const mapStateToProps = state => {
  return {
    uid: state.uid,
    username: state.username,
    email: state.email,
    fname: state.fname,
    mname: state.mname,
    lname: state.lname,
    bio: state.bio,
    groups: state.groups,
    status: state.status,
    pool: state.pool,
    fvh: state.fvh,
    fvg: state.fvg,
    fvgs: state.fvgs,
    fvt: state.fvt,
    get_item: state.get_item,
    loggedIn: state.loggedIn,
    renderFlag: state.renderFlag,
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    updateUid: uid => {dispatch(actions.updateUid(uid))},
    updateUsername: username => {dispatch(actions.updateUsername(username))},
    updateEmail: email => {dispatch(actions.updateEmail(email))},
    updateFname: fname => {dispatch(actions.updateFname(fname))},
    updateMname: mname => {dispatch(actions.updateMname(mname))},
    updateLname: lname => {dispatch(actions.updateLname(lname))},
    updateBio: bio => {dispatch(actions.updateBio(bio))},
    updateStatus: status => {dispatch(actions.updateStatus(status))},
    updateGroups: groups => {dispatch(actions.updateGroups(groups))},
    updatePool: pool => {dispatch(actions.updatePool(pool))},
    updateFVG: fvg => {dispatch(actions.updateFVG(fvg))},
    updateFVH: fvh => {dispatch(actions.updateFVH(fvh))},
    updateFVGS: fvgs => {dispatch(actions.updateFVGS(fvgs))},
    updateFVT: fvt => {dispatch(actions.updateFVT(fvt))},
    updateGet: getItem => {dispatch(actions.updateGet(getItem))},
    reRender: bool => {dispatch(actions.reRender(bool))}
  };
};
