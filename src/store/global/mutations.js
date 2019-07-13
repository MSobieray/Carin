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
  ADD_LISTENER: (state, payload) => {
    const listeners = state.listeners;
    listeners.push(payload);
    state.listeners = listeners;
  }
};

export default mutations;
