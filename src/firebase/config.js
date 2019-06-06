import Firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAKPznXszuDabDs5RlNLRDBCu2evmY9fDY",
  authDomain: "carin-3da86.firebaseapp.com",
  databaseURL: "https://carin-3da86.firebaseio.com",
  projectId: "carin-3da86",
  storageBucket: "carin-3da86.appspot.com",
  messagingSenderId: "332544731833"
};

const firebase = Firebase.initializeApp(config);

// firebase.firestore().settings(settings)

export default firebase;

export const firestore = firebase.firestore(),
  firestorage = firebase.storage(),
  auth = firebase.auth(),
  provider = new Firebase.auth.GoogleAuthProvider(),
  currentUser = firebase.auth().currentUser;
