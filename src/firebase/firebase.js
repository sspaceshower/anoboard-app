import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyCmIOQJTDrkqjXxfXmcqsusKboegb5CZiQ",
  authDomain: "anoboard.firebaseapp.com",
  databaseURL: "https://anoboard.firebaseio.com",
  projectId: "anoboard",
  storageBucket: "anoboard.appspot.com",
  messagingSenderId: "22433272067"
};

// const devConfig = {
// apiKey: process.env.REACT_APP_API_KEY,
// authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// databaseURL: process.env.REACT_APP_DATABASE_URL,
// projectId: process.env.REACT_APP_PROJECT_ID,
// storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// };

// const config = process.env.NODE_ENV === 'production'
//   ? prodConfig
//   : devConfig;

// if (!firebase.apps.length) {
  firebase.initializeApp(config);
// }

const db = firebase.database();
const auth = firebase.auth();
const classRef = db.ref("class")

export {
  db,
  auth,
  classRef
};
