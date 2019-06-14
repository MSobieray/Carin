const add = ({ commit }, notification) => {
  commit("PUSH", notification);
};

const remove = ({ commit }, id) => {
  commit("REMOVE", id);
};

export default {
  add,
  remove
};
