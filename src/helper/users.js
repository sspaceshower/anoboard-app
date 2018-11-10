import Firebase from '../firebase/main.js'

export const createUser = ({ user }) => {
  const rootRef = Firebase.database.ref()
  const usersRef = rootRef.child('student')
  console.log(user)
  if (user) {
    // usersRef.child(user.uid)
    console.log(user)
    usersRef.child(user.uid).set({
      fname: user.fname,
      mname: user.mname,
      lname: user.lname,
      username: user.username,
      password: user.password,
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
