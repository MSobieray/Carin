import { auth } from "@/firebase/config.js";
import { firestore } from "@/firebase/config.js";
import firebase from "firebase";
import router from "@/router/";
const createUser = user => {
  firestore.collection("users").add(user);
};

const logout = ({ commit }) => {
  auth
    .signOut()
    .then(() => {
      commit("LOGOUT");
    })
    .catch(error => {
      console.log(error);
    });
};

const login = async ({ commit, dispatch }, provider) => {
  const authProvider = new firebase.auth[`${provider}AuthProvider`]();
  try {
    const signin = await auth.signInWithPopup(authProvider);
    const user = () => {
      let user = signin.user;
      commit("LOGIN", user);
      return user;
    };
    dispatch("Teams/getTeams", user, { root: true });
  } catch (err) {
    // Handle Errors here.
    var errorCode = err.code;
    var errorMessage = err.message;
    // The email of the user's account used.
    var email = err.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = err.credential;
    console.log(errorCode, errorMessage, email, credential);
  }
  router.push("/");
};

export default {
  createUser,
  logout,
  login
};
