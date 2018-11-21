export const updateUser = currentUser => (
  {
    type: 'UPDATE_USER',
    payload: currentUser
  }
);

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
