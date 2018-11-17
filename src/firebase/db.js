import { db } from './firebase';

// User API

export const doCreateUser = (uid, username,fname,mname,lname,biography, email) =>
  db.ref(`users/${uid}`).set({
    uid,
    username,
    fname,
    mname,
    lname,
    biography,
    email,
  });

export const doCreateBoard = (uid, username, content, isAnonymous) =>  
  db.ref(`users/${uid}/posts`).push().set({
    uid,
    username,
    content,
    isAnonymous
  });
  
export const onceGetUsers = () =>
  db.ref('users').once('value');

export const onceGetBoards = () =>
  db.ref('boards').once('value');

export const onceGetOneUser = (uid) =>
  db.ref(`users/${uid}`).once('value');
// Other db APIs ...
