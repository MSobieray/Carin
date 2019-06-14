import { auth } from "@/firebase/config.js";
import { firestore } from "@/firebase/config.js";
import firebase from "firebase";
import router from "@/router/";
const createUser = user => {
  firestore.collection("users").add(user);
};

const logout = ({ commit, dispatch }) => {
  auth
    .signOut()
    .then(() => {
      commit("LOGOUT");
      dispatch("clearState", null, { root: true });
    })
    .catch(error => {
      console.log(error);
    });
};

const login = async ({ dispatch }, provider) => {
  const authProvider = new firebase.auth[`${provider}AuthProvider`]();
  try {
    await auth.signInWithPopup(authProvider);
  } catch (err) {
    // Handle Errors here.
    var errorCode = err.code;
    var errorMessage = err.message;
    // The email of the user's account used.
    var email = err.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = err.credential;
    console.log(errorCode, errorMessage, email, credential);
    dispatch("Notifications/add", err, { root: true });
  }
  router.push("/");
};

export default {
  createUser,
  logout,
  login
};
