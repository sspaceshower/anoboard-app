import { db } from './firebase';

// User API

export const doCreateUser = (id, username,fname,mname,lname,biography, email) =>
  db.ref(`users/${id}`).set({
    username,
    fname,
    mname,
    lname,
    biography,
    email,
  });

export const doCreateBoard = (id, username, content, isAnonymous) =>  
  db.ref(`boards/${id}`).set({
    username,
    content,
    isAnonymous
  });
  
export const onceGetUsers = () =>
  db.ref('users').once('value');

export const onceGetBoards = () =>
  db.ref('boards').once('value');
// Other db APIs ...
