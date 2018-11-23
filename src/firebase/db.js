import { db } from './firebase';

// User API

export const doCreateUser = (uid, username, fname, mname, lname, biography, email) =>
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
  db.ref(`boards/${username}`).child("owner").set(
    {uid,
      username,
      fname,
      mname,
      lname,
      biography,
      email,}
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

export const doCreateReply = (boardOwner, uid, username, content, isAnonymous, postid) =>
 db.ref(`boards/${boardOwner}/posts/${postid}/replys`).push({
   uid,
   username,
   content,
   isAnonymous
 }).then((snap) => {
   db.ref(`boards/${boardOwner}/posts/${postid}/replys/${snap.key}`).update({
     replyid: snap.key
})});

export const doAddGroupList = (uid, username, fname, mname, lname, groupName) => {
  //return new grouplist
  var user_list = [];
  db.ref("groups/").child(groupName).child("/students").on("value", function (snapshot) {
    snapshot.forEach(function (data) {
      user_list.push(data.val().uid);
    });
    if (user_list.indexOf(uid) > -1) {
        console.log("group: repeated!")
    } else {
      db.ref('groups/').child(groupName + "/students").push({
          "uid": uid,
          "username": username,
          "fname": fname,
          "mname": mname,
          "lname": lname,
        }
      )
    }
  });

  // add group to user
  // user needs existing grouplist
  var data_list = []
  // Add Group to User in grouplist
  onceGetOneUser(uid).then(snapshot => {
    if (snapshot.val().grouplist !== undefined) {
      for (const [key, value] of Object.entries(snapshot.val().grouplist)) {
        var childData = value.name;
        data_list.push(childData);
      }
      console.log(data_list);
      if (data_list.indexOf(groupName) > -1) {
        //In the array!
        console.log("user: repeated!")
      } else {
        data_list.push(groupName)
        db.ref(`users/${uid}/grouplist`).push({
            "name": groupName
        })
      }
    } else {
      db.ref(`users/${uid}/grouplist`).push(
        {"name": groupName})
    }});

    return(data_list);
}
export const onceGetUsers = () =>
  db.ref('users').once('value');

export const onceGetBoards = () =>
  db.ref('boards').once('value');

export const onceGetOneUser = (uid) =>
  db.ref(`users/${uid}`).once('value');

export const onceGetOnePost = (username, postid) =>
  db.ref(`boards/${username}/posts/${postid}`).once('value');

export const onceGetOneGroup = (groupname) =>
  db.ref(`groups/${groupname}`).once('value');

// Other db APIs ...
