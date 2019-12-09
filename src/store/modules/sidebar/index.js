import mutations from "./mutations";

const state = {
  visible: true,
  type: "default"
};

export default {
  namespaced: true,
  state,
  mutations
};
