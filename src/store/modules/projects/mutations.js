import { addPage, removePage, editPage } from "../../../util";

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

const ADD_PAGE = (state, { column, page }) => {
  // find an existing column
  const columnObj = state.projectData.pages.find(obj => {
    return obj.column === column;
  });
  if (typeof columnObj === "object") {
    columnObj.pages[0].pages.push(page);
  } else {
    state.projectData.pages.push({ column, pages: [page] });
  }
};

const EDIT_PAGE = (state, updatedPage) => {
  const pages = state.projectData.pages;
  editPage(pages, updatedPage);
};

export default {
  SET_PROJECTS,
  SET_PROJECT_DATA,
  SHOW_STEPPER,
  UPDATE_SITEMAP,
  ADD_PAGE,
  EDIT_PAGE
};
