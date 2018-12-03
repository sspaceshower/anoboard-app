/*export const updateUser = currentUser => (
  {
    type: 'UPDATE_USER',
    payload: currentUser
  }
);*/

export const updateUid = uid => (
  {
    type: 'UPDATE_UID',
    payload: uid
  }
);

export const updateUsername = username => (
  {
    type: 'UPDATE_USERNAME',
    payload: username
  }
);

export const updateEmail = email => (
  {
    type: 'UPDATE_EMAIL',
    payload: email
  }
);

export const updateFname = fname => (
  {
    type: 'UPDATE_FNAME',
    payload: fname
  }
);

export const updateMname = mname => (
  {
    type: 'UPDATE_MNAME',
    payload: mname
  }
);

export const updateLname = lname => (
  {
    type: 'UPDATE_LNAME',
    payload: lname
  }
);


export const updateBio = bio => (
  {
    type: 'UPDATE_BIO',
    payload: bio
  }
);

export const updateGroups = groups => (
  {
    type: 'UPDATE_GROUPS',
    payload: groups
  }
);

export const updateStatus = status => (
  {
    type: 'UPDATE_STATUS',
    payload: status
  }
);

export const updatePool = pool => (
  {
    type: 'UPDATE_POOL',
    payload: pool
  }
);

export const updateFVH = fvh => (
  {
    type: 'UPDATE_FVH',
    payload: fvh
  }
);

export const updateFVG = fvg => (
  {
    type: 'UPDATE_FVG',
    payload: fvg
  }
);

export const updateFVGS = fvgs => (
  {
    type: 'UPDATE_FVGS',
    payload: fvgs
  }
);

export const updateFVT = fvt => (
  {
    type: 'UPDATE_FVT',
    payload: fvt
  }
);

export const updateGet = (getItem) => (
  {
    type: 'UPDATE_GET',
    payload: getItem,
  }
)

export const loginStatus = status => (
  {
    type: 'LOGIN_STATUS',
    payload: status
  }
);

export const reRender = (value) => (
  {
    type: 'RERENDER',
    payload: value,
  }
)
