import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  user: {
    displayName: "",
    email: "",
    uid: "",
    photphotoURL: ""
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
