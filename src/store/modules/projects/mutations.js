const SET_PROJECTS = (state, payload) => {
  state.projects = payload;
};
const SET_PROJECT_DATA = (state, payload) => {
  state.projectData = payload;
};

const SHOW_STEPPER = (state, payload) => {
  state.projectData.showStepper = payload;
};
const UPDATE_SITEMAP = (state, { fromPageId, toPageId, toColumnId }) => {
  console.log(
    state.projectData.pages,
    "from:",
    fromPageId,
    "to:",
    toPageId,
    "toCol:",
    toColumnId
  );
  // const pages = state.projectData.pages;
};

export default {
  SET_PROJECTS,
  SET_PROJECT_DATA,
  SHOW_STEPPER,
  UPDATE_SITEMAP
};
