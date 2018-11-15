import React from 'react';

export const createDisplayName = (user, lnameFull = true) => {
  console.log("user")
  console.log(user.fname)
  const fname = user.fname? user.fname: "";
  const mname = user.mname? " " + user.mname.charAt(0) + ".": "";
  const lname = user.lname? " " + (lnameFull?  user.lname: user.lname.charAt(0) + "."): "";
  var displayName = "";

  if (!(user.fname || user.mname || user.lname)){
    displayName = user.username;
  } else {
    displayName = fname + mname + lname;
  }

  return(displayName);
}
