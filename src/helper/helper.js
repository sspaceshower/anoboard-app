export const createDisplayName = (fname, mname, lname, username, lnameFull = true) => {

  const dfname = (fname !== undefined && fname)? fname: "";
  const dmname = mname? " " + mname.charAt(0) + ".": "";
  const dlname = lname? " " + (lnameFull?  lname: lname.charAt(0) + "."): "";
  var displayName = "";

  if (!(fname || mname || lname)){
    displayName = username;
  } else {
    displayName = dfname + dmname + dlname;
  }
  return(displayName);
}
