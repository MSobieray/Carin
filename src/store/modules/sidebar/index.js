import mutations from "./mutations";
import actions from "./actions";
const state = {
  visible: null,
  type: "login",
  page: null
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
