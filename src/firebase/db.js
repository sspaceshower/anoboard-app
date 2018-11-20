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

export const doCreateBoard = (uid, username,fname,mname,lname,biography, email) =>
  db.ref(`boards/${uid}`).child("owner").set(
    {uid,
      username,
      fname,
      mname,
      lname,
      biography,
      email,}
  );

export const doCreatePost = (uid, username, content, isAnonymous) =>
  db.ref(`boards/${uid}/posts`).push({
    uid,
    username,
    content,
    isAnonymous
  }).then((snap) => {
    db.ref(`boards/${uid}/posts/${snap.key}`).update({
      postid: snap.key
 })});

export const doCreateReply = (uid, username, content, isAnonymous, postid) =>
 db.ref(`boards/${uid}/posts/${postid}/replys`).push({
   uid,
   username,
   content,
   isAnonymous
 }).then((snap) => {
   db.ref(`boards/${uid}/posts/${postid}/replys/${snap.key}`).update({
     replyid: snap.key
})});

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const onceGetBoards = () =>
  db.ref('boards').once('value');

export const onceGetOneUser = (uid) =>
  db.ref(`users/${uid}`).once('value');

export const onceGetOnePost = (uid,postid) =>
  db.ref(`boards/${uid}/posts/${postid}`).once('value');
// Other db APIs ...
