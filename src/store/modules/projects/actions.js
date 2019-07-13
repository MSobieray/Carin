import { firestore } from "@/firebase/config.js";

const createProject = ({ rootState }, project) => {
  const projectDoc = firestore
    .collection("Teams")
    .doc(rootState.Teams.currentTeam)
    .collection("Projects")
    .doc();
  projectDoc.set(project);
};
/**
 * Get a realtime snapshot of the current teams projects
 * @param {Object} vuex - object of vuex methods
 * @param {Function} commit mutation handler
 * @param {Function} dispatch action handler
 * @return {Promise} firebase promise
 */
const getProjects = ({ commit, dispatch }, { currentTeam, unsubscribe }) => {
  console.log("GETPROJECTS", currentTeam, unsubscribe);
  const projectRef = firestore
    .collection("Teams")
    .doc(currentTeam)
    .collection("Projects");

  const projectListner = projectRef
    .orderBy("created_on", "desc")
    .onSnapshot(snapshot => {
      let projects = [];
      snapshot.forEach(project => {
        projects.push([project.data(), project.id]);
      });
      commit("SET_PROJECTS", projects);
      dispatch("loading", false, { root: true });
    });
  dispatch("addListener", projectListner, { root: true });
};

const getProjectData = ({ commit, dispatch }, { project, currentTeam }) => {
  const projectDoc = firestore
    .collection("Teams")
    .doc(currentTeam)
    .collection("Projects")
    .doc(project);

  const projectDataListner = projectDoc.onSnapshot(snapshot => {
    commit("SET_PROJECT_DATA", snapshot.data());
  });
  dispatch("addListener", projectDataListner, { root: true });
};

const updateProject = ({ rootState }, data) => {
  const batch = firestore.batch();

  const projectRef = firestore
    .collection("Teams")
    .doc(rootState.Teams.currentTeam)
    .collection("Projects")
    .doc(data.projectID);

  // Delete any fields that are empty as to not overwrite any saved data
  // delete data.development.formIsValid

  if (data.development) {
    batch.set(projectRef, { development: data.development }, { merge: true });
  }
  if (data.design) {
    batch.set(projectRef, { design: data.design }, { merge: true });
  }
  if (data.general) {
    batch.set(projectRef, { general: data.general }, { merge: true });
  }
  if (data.showStepper !== null) {
    console.log(data);
    batch.set(projectRef, { showStepper: data.showStepper }, { merge: true });
  }

  batch.set(projectRef, { updated_on: data.updated_on }, { merge: true });

  // Add additonal conditonal login for other data types

  // Commit the batch
  batch.commit();
};
const addPage = ({ rootState }, data) => {
  const projectRef = firestore
    .collection("Teams")
    .doc(rootState.Teams.currentTeam)
    .collection("Projects")
    .doc(data.projectId);

  return projectRef.set({ pages: data.pages }, { merge: true });
};

export default {
  addPage,
  createProject,
  getProjects,
  getProjectData,
  updateProject
};
