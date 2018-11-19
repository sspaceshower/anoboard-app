import React from 'react';
import Group from './components/group.js'

function GroupPage({ match }){
  const groupname = match.params.groupname;
  const group = {};
  //TODO: <backend> use username to fectch board object which board.
  return(
    <Group groupname = {groupname} />
  )
}

export default GroupPage;
