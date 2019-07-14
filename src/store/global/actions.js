const actions = {
  clearState: ({ commit }) => {
    commit("CLEAR_STATE");
  },
  loading: ({ commit }, payload) => {
    commit("LOADING", payload);
  },
  addListener: ({ commit }, payload) => {
    commit("ADD_LISTENER", payload);
  },
  removeListener: ({ commit }, payload) => {
    commit("REMOVE_LISTENER", payload);
  }
};
export default actions;
