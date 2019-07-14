const mutations = {
  CLEAR_STATE: state => {
    state.Projects.projects = [];
    state.Projects.projectData = null;
    state.Teams.teams = [];
    state.Teams.currentTeam = null;
    state.loading = false;
  },
  LOADING: (state, payload) => {
    state.loading = payload;
  },
  ADD_LISTENER: (state, { listener, id }) => {
    state.listeners.push({
      id,
      unsubscribe: listener
    });
  },
  REMOVE_LISTENER: (state, id) => {
    const activeListeners = state.listeners.filter(
      listener => listener.id === id
    );
    // Promise to unsubscribe from current listeners before removing them from state
    const unsubscribePromise = () =>
      new Promise(resolve => {
        activeListeners.forEach(listener => {
          listener.unsubscribe();
        });
        resolve("unsubscribed");
      });
    unsubscribePromise().then(() => {
      state.listeners = state.listeners.filter(listener => listener.id != id);
    });
  }
};

export default mutations;
