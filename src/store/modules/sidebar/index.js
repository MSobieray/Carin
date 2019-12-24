import mutations from "./mutations";
import actions from "./actions";
const state = {
  visible: true,
  type: "login",
  page: null
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
