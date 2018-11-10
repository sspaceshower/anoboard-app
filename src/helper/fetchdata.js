import React from 'react';
import Firebase from '../firebase/main.js'

//TODO: <API> fetch login status
export const loginStatus = () => {

}

//TODO: <API> fetch user data
export const fetchUserData = (userid) => {
  
  var rootRef = Firebase.database.ref()
  var usersRef = rootRef.child('student').child(String(userid))
  
  // ERROR~~ cannot return userdata and use it outside .once function
  return usersRef.once('value').then(function(snap){
    const userdata = snap.val()
    console.log(userdata)
    // console.log(userdata.fname)
    return userdata 
  })
  //TODO: <mockup> To be deleted after the request to user information has been completed
  // const userdata = {
  //     username: "johnweasly",
  //     fname: "John",
  //     mname: "Michael",
  //     lname: "Weasly",
  //     biography: "this is a short biography that I type just because I can't think of anything else\
  //     and yeah it have to be loooooong, for testing",
  //     grouplist: ["CS473", "CS555", "CS250", "CS101"],
  //     trophy: ["A","B","C","D","E"],
  //     setTrophyList: ["A", "B", "C"]
  // };
  
  
}

//TODO: <API> fetch board data
export const fetchBoardData = (userid) => {
  /*TODO: fill in these part
  const boarddata = {
    owner: null;
    posts: null;
  }
  */
  //TODO: create mock board data in firebase!!





  //TODO: <mockup> to be deleted after implementation of fetchBoardData()
  const boarddata = {
    owner: fetchUserData(), //I am just too lazy to think of more userdata
    posts: [
      {
        author: fetchUserData("20160843"),
        content: "Hello",
        tag: ["CS473", "CS555"],
        isAnonymous: true,
        replies: null,
        timestamp: "20180909-14:09:09"
        /*I dont know what timestamp look like, so I'll wait for this part to
        be implemented before adding timestamp to posts*/
      },
      {
        author: fetchUserData("20160843"),
        content: "Hello",
        tag: ["CS473", "CS555"],
        isAnonymous: true,
        replies: null,
        timestamp: "20180909-14:09:09"
        /*I dont know what timestamp look like, so I'll wait for this part to
        be implemented before adding timestamp to posts*/
      },
      {
        author: fetchUserData("20160843"),
        content: "Hello",
        tag: ["CS473", "CS555"],
        isAnonymous: true,
        replies: null,
        timestamp: "20180909-14:09:09"
        /*I dont know what timestamp look like, so I'll wait for this part to
        be implemented before adding timestamp to posts*/
      }
    ]
  }
  return(
    boarddata
  );
}

//TODO: <API> fetch group data, see list of attribuites in Trello
export const fetchGroupData = (groupname) => {
  return(
    null
  );
}

//TODO: <API> fetch user data when searched
export const fetchUserQuery = (searchdata) => {
  return(
    null
  );
}
//TODO: <API> fetch group data when searched
export const fetchGroupQuery = (searchdata) => {
  return(
    null
  );
}
