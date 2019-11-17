import { addPage, removePage } from "../../../util";

const SET_PROJECTS = (state, payload) => {
  state.projects = payload;
};
const SET_PROJECT_DATA = (state, payload) => {
  state.projectData = payload;
};

const SHOW_STEPPER = (state, payload) => {
  state.projectData.showStepper = payload;
};
const UPDATE_SITEMAP = (state, { movedPage, toPageId, toPageIndex }) => {
  const pagesArray = state.projectData.pages;
  removePage(pagesArray, movedPage, toPageId);
  addPage(pagesArray, toPageId, toPageIndex, movedPage);
};

export default {
  SET_PROJECTS,
  SET_PROJECT_DATA,
  SHOW_STEPPER,
  UPDATE_SITEMAP
};
