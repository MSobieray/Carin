const actions = {
  clearState: ({ commit }) => {
    commit("CLEAR_STATE");
  },
  loading: ({ commit }, payload) => {
    commit("LOADING", payload);
  }
};
export default actions;
