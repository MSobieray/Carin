const SET_PROJECTS = (state, payload) => {
  state.projects = payload;
};
const SET_PROJECT_DATA = (state, payload) => {
  state.projectData = payload;
};

const SHOW_STEPPER = (state, payload) => {
  state.projectData.showStepper = payload;
};

export default {
  SET_PROJECTS,
  SET_PROJECT_DATA,
  SHOW_STEPPER
};
