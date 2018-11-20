import React from 'react';
import Fullboard from './components/fullboard.js'
import { db } from './firebase'

function Userboard({ match }){
  const username = match.params.username;
  var userboard;
  //TODO: <backend> use username to fectch board object which board.
//   find board of that username
db.onceGetBoards().then(snapshot =>
    snapshot.val().forEach(board => {
        if(board.child().owner.username === username){
            userboard = board
        }
    })
  );
  return(
    <div>
      <Fullboard currentUser={username} board={userboard} />
    </div>
  )
}

export default Userboard;
