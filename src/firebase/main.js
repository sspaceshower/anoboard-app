import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyCmIOQJTDrkqjXxfXmcqsusKboegb5CZiQ",
  authDomain: "anoboard.firebaseapp.com",
  databaseURL: "https://anoboard.firebaseio.com",
  projectId: "anoboard",
  storageBucket: "anoboard.appspot.com",
  messagingSenderId: "22433272067"
}

class Firebase {
  constructor () {
    if (typeof window !== 'undefined') {
      firebase.initializeApp(config)
      this.auth = firebase.auth()
      this.database = firebase.database()
    }
  }
}

export default new Firebase()
