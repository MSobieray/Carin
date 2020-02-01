import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  user: {
    displayName: null,
    email: null,
    uid: null,
    photphotoURL: null
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
