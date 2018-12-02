import { db } from './firebase';

// User API

export const doCreateUser = (uid, username, fname, mname, lname, biography, email, day_now) =>
  db.ref(`users/${uid}`).set({
    uid,
    username,
    fname,
    mname,
    lname,
    biography,
    email,
    status: {
      atk: 50,
      def: 50,
      HP: 1,
      level: 1,
      today_XP: 0,
      total_XP: 0,
      lastUpdate: {
         day: day_now.day,
         month: day_now.month,
         year: day_now.year,
       },
      armor: {
        def: 5,
        name: "Cool leather jacket",
        url: "anoboard-app/public/img/leather-jacket.png"
      },
      weapon: {
        atk: 5,
        name: "Baseball bat",
        url: "anoboard-app/public/img/baseball-bat.png"
      },
      trophy: {
        name: "First Grader",
        url: "anoboard-app/public/img/first.png"
      },
    },
    pool: {
      armor: {
        somekey: {
          def: 5,
          name: "Cool leather jacket",
          url: "anoboard-app/public/img/leather-jacket.png"
        }
      },
      weapon: {
        somekey: {
          atk: 5,
          name: "Baseball bat",
          url: "anoboard-app/public/img/baseball-bat.png"
        }
      },
      trophy: {
        somekey:{
          name: "First Grader",
          url: "anoboard-app/public/img/first.png"
        }
      },
    },
    first_visit_home: true,
    first_visit_group: true,
    first_visit_group_search: true,
    first_visit_trophy: true,
  });

export const doCreateBoard = (uid, username,fname,mname,lname,biography, email) =>
  db.ref(`boards/${username}`).child("owner").set(
    {uid,
      username,
      fname,
      mname,
      lname,
      biography,
      email,
      first_visit_home: true,
      first_visit_group: true,
      first_visit_group_search: true,
      first_visit_trophy: true,}
  );

export const doCreatePost = (boardOwner,uid, username, content, isAnonymous) =>
  db.ref(`boards/${boardOwner}/posts`).push({
    uid,
    username,
    content,
    isAnonymous
  }).then((snap) => {
    db.ref(`boards/${boardOwner}/posts/${snap.key}`).update({
      postid: snap.key
 })});

export const doCreateReply = (boardOwner, uid, username, fname, mname, lname, content, isAnonymous, postid) =>
 db.ref(`boards/${boardOwner}/posts/${postid}/replys`).push({
   uid,
   username,
   fname,
   mname,
   lname,
   content,
   isAnonymous
 }).then((snap) => {
   db.ref(`boards/${boardOwner}/posts/${postid}/replys/${snap.key}`).update({
     replyid: snap.key
})});

export const updateXP = (user, today_XP, total_XP, lastUpdate, HP , level, weapon, armor, trophy, atk, def) =>
 db.ref(`users/${user}/status`).update({
   today_XP,
   total_XP,
   lastUpdate,
   HP,
   level,
   weapon,
   armor,
   trophy,
   atk,
   def
 });

export const updatePoolWeapon = (user, weapon) =>
 db.ref(`users/${user}/pool/weapon`).push({
    atk: weapon.atk,
    name: weapon.name,
    url: weapon.url
 });
export const updatePoolArmor = (user, armor) =>
 db.ref(`users/${user}/pool/armor`).push({
  def: armor.def,
  name: armor.name,
  url: armor.url
 });
export const updatePoolTrophy = (user, trophy) =>
 db.ref(`users/${user}/pool/trophy`).push({
   name: trophy.name,
   url: trophy.url
 });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const onceGetBoards = () =>
  db.ref('boards').once('value');

export const onceGetOneUser = (uid) =>
  db.ref(`users/${uid}`).once('value');

export const onceGetTrophy = () =>
  db.ref(`trophy`).once('value');

export const onceGetOnePost = (username, postid) =>
  db.ref(`boards/${username}/posts/${postid}`).once('value');

export const onceGetOneGroup = (groupname) =>
  db.ref(`groups/${groupname}`).once('value');

// Other db APIs ...
