import Firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

const firebase = Firebase.initializeApp(config);

export default firebase;

export const firestore = firebase.firestore(),
  firestorage = firebase.storage(),
  auth = firebase.auth(),
  currentUser = firebase.auth().currentUser;
