const EXISTING_TEAM = (state, payload) => {
  state.exsistingTeam = payload;
};
const SET_TEAMS = (state, payload) => {
  state.teams = payload;
};
const SET_CURRENT_TEAM = (state, payload) => {
  state.currentTeam = payload;
};

export default {
  EXISTING_TEAM,
  SET_TEAMS,
  SET_CURRENT_TEAM
};
