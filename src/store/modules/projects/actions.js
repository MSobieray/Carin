import { firestore } from "@/firebase/config.js";

const createProject = ({ rootState }, project) => {
  const projectDoc = firestore
    .collection("Teams")
    .doc(rootState.Teams.currentTeam)
    .collection("Projects")
    .doc();
  projectDoc.set(project);
};

const getProjects = ({ commit, dispatch }, currentTeam) => {
  const projectRef = firestore
    .collection("Teams")
    .doc(currentTeam)
    .collection("Projects");

  projectRef.onSnapshot(snapshot => {
    let projects = [];
    snapshot.forEach(project => {
      projects.push([project.data(), project.id]);
    });
    commit("SET_PROJECTS", projects);
    dispatch("loading", false, { root: true });
  });
};

const getProjectData = ({ commit }, proj) => {
  const projectDoc = firestore
    .collection("Teams")
    .doc(proj.currentTeam)
    .collection("Projects")
    .doc(proj.project);

  projectDoc.onSnapshot(snapshot => {
    commit("SET_PROJECT_DATA", snapshot.data());
  });
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
