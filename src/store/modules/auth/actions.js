import { auth } from "@/firebase/config.js";
import { firestore } from "@/firebase/config.js";
import firebase from "firebase";
// import router from "@/router/";

const createUser = ({ dispatch }, user) => {
  firestore
    .doc(`Users/${user.uid}`)
    .set(
      {
        Name: user.displayName,
        Email: user.email
      },
      { merge: true }
    )
    .then(() => {
      // "getCurrentTeam" also dispatch() => {e s "getProjects" which dispatches "loading"
      // and sets it to false when the snapshot is connected
      dispatch("Teams/getTeams", "", { root: true }).then(() => {
        dispatch("Teams/getCurrentTeam", "", { root: true });
      });
    });
};
/**
 * Logout the user and clear the state
 * @param {Object} object - object of vuex methods
 * @param {Function} object.commit mutation handler
 * @param {Function} dispatch action handler
 * @return {Promise} firebase promise
 */
const logout = ({ commit, dispatch }) => {
  auth
    .signOut()
    .then(() => {
      commit("LOGOUT");
      dispatch("clearState", null, { root: true });
    })
    .catch(err => {
      dispatch("Notifications/add", { type: "error", ...err }, { root: true });
    });
};

/**
 * login the user and redirect, adding of the user data into state is handled in the main.js
 * @param {Object} vuex - object of vuex methods
 * @param {Function} object.dispatch action handler
 * @param {String} provider login provider name
 * @return {Promise} firbase sign in
 */
const login = async ({ dispatch }, provider) => {
  dispatch("loading", true, { root: true });
  const authProvider = new firebase.auth[`${provider}AuthProvider`]();
  try {
    await auth.signInWithPopup(authProvider);
  } catch (err) {
    // // Handle Errors here.
    // var errorCode = err.code;
    // var errorMessage = err.message;
    // // The email of the user's account used.
    // var email = err.email;
    // // The firebase.auth.AuthCredential type that was used.
    // var credential = err.credential;
    // console.log(errorCode, errorMessage, email, credential);
    dispatch("Notifications/add", { type: "error", ...err }, { root: true });
    dispatch("loading", false, { root: true });
  }
};

export default {
  createUser,
  logout,
  login
};
