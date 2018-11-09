import Firebase from '../firebase/main.js'

export const createUser = ({ user }) => {
  // const rootRef = Firebase.database().ref().child('anoboard')
  // const usersRef = rootRef.child('student')
  if (user) {
    // usersRef.child(user.uid)
    Firebase.database.ref(`anoboard/users/${user.uid}`).set({
      fname: user.fname,
      mname: user.mname,
      lname: user.lname,
      username: user.username,
      password: user.pwd,
      uid: user.uid
    })
  }
}

export const deleteUser = async () => {
  const currentUser = Firebase.auth.currentUser
  await Firebase.database
    .ref('list')
    .orderByChild('userId')
    .equalTo(currentUser.uid)
    .ref.remove()
  await Firebase.database
    .ref('/boards')
    .orderByChild('userId')
    .equalTo(currentUser.uid)
    .ref.remove()
  await Firebase.database.ref(`/users/${currentUser.uid}`).remove()
  await currentUser.delete()
}
