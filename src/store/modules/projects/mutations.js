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
  // TODO: find away to pass the correcrt toPageIndex of where the item should get placed
  // TODO: Create a remove Page function to delete the moved page from the object it was in.
  removePage(pagesArray, movedPage);
  addPage(pagesArray, toPageId, toPageIndex, movedPage);
};

export default {
  SET_PROJECTS,
  SET_PROJECT_DATA,
  SHOW_STEPPER,
  UPDATE_SITEMAP
};
