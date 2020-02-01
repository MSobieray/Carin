// import Vue from "vue";
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
  ADD_LISTENER: (state, { listener, id, type }) => {
    state.listeners.push({
      id,
      type,
      unsubscribe: listener
    });
  },
  REMOVE_LISTENER: (state, id) => {
    const activeListeners = state.listeners.filter(
      listener => listener.id === id
    );

    activeListeners.forEach(listener => {
      listener.unsubscribe();
    });

    const filteredListeners = state.listeners.filter(
      listener => listener.id != id
    );
    state.listeners = filteredListeners;
  }
};

export default mutations;
