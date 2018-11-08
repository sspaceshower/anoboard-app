import React from 'react';

//TODO: <API> fetch login status
export const loginStatus = () => {

}

//TODO: <API> fetch user data
export const fetchUserData = (username) => {
  /*TODO: fill in these parts
    const userdata = {
    username: null,
    fname: null,
    mname: null,
    lname: null,
    biography: null,
    grouplist: null,
    trophy: null,
    setTrophyList: null,
  };*/

  //TODO: <mockup> To be deleted after the request to user information has been completed
  const userdata = {
      username: "johnweasly",
      fname: "John",
      mname: "Michael",
      lname: "Weasly",
      biography: "this is a short biography that I type just because I can't think of anything else",
      grouplist: ["CS473", "CS555", "CS250", "CS101"],
      trophy: ["A","B","C","D","E"],
      setTrophyList: ["A", "B", "C"]
  };

  return(userdata);
}

//TODO: <API> fetch board data
export const fetchBoardData = (username) => {
  /*TODO: fill in these part
  const boarddata = {
    owner: null;
    posts: null;
  }
  */

  //TODO: <mockup> to be deleted after implementation of fetchBoardData()
  const boarddata = {
    owner: fetchUserData(), //I am just too lazy to think of more userdata
    posts: [
      {
        author: fetchUserData(),
        content: "Hello",
        tag: ["CS473", "CS555"],
        isAnonymous: true,
        replies: null,
        timestamp: "20180909-14:09:09"
        /*I dont know what timestamp look like, so I'll wait for this part to
        be implemented before adding timestamp to posts*/
      },
      {
        author: fetchUserData(),
        content: "Hello",
        tag: ["CS473", "CS555"],
        isAnonymous: true,
        replies: null,
        timestamp: "20180909-14:09:09"
        /*I dont know what timestamp look like, so I'll wait for this part to
        be implemented before adding timestamp to posts*/
      },
      {
        author: fetchUserData(),
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
