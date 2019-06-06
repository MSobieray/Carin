import { auth } from "@/firebase/config.js";
import { firestore } from "@/firebase/config.js";

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

export default {
  createUser,
  logout
};
