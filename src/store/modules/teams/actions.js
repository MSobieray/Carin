import { firestore } from "@/firebase/config.js";
import router from "../../../router";

const getCurrentTeam = ({ commit, dispatch, rootState }) => {
  const userRef = firestore.collection("Users").doc(rootState.Auth.user.uid);
  userRef
    .get()
    .then(user => {
      let userData = user.data();
      // check current team and handle route change to force team creation or activation
      if (!userData) {
        throw "There is an issue with your team setup";
      } else if (!userData.CurrentTeam && rootState.Teams.teams.length === 0) {
        router.push({ name: "team" });
        throw "You do not have an active team, please create one";
      } else if (!userData.CurrentTeam && rootState.Teams.teams.length > 0) {
        router.push({ name: "switch-teams" });
        throw "You do not have an active team, please select one";
      }

      commit("SET_CURRENT_TEAM", userData.CurrentTeam);
      dispatch(
        "Projects/getProjects",
        { currentTeam: userData.CurrentTeam },
        { root: true }
      );
    })
    .catch(err => {
      console.log("Error getting documents: ", err);
      dispatch(
        "Notifications/add",
        { message: err, type: "error" },
        { root: true }
      );
    });
};

const setCurrentTeam = ({ commit, dispatch, rootState }, teamName) => {
  const userRef = firestore.collection("Users").doc(rootState.Auth.user.uid);
  userRef.set(
    {
      CurrentTeam: teamName
    },
    { merge: true }
  );
  commit("SET_CURRENT_TEAM", teamName);
  dispatch("Projects/getProjects", { currentTeam: teamName }, { root: true });
};

/**
 * Use a Firestore transaction to create a new team
 * @param {*} param0
 * @param {Object} team the team info
 */
const createTeam = ({ commit, dispatch, rootState }, team) => {
  let teamDocRef = firestore.doc(`Teams/${team.name}`);
  firestore
    .runTransaction(transaction => {
      return transaction.get(teamDocRef).then(teamDoc => {
        if (!teamDoc.exists) {
          transaction.set(teamDocRef, {
            teamName: team.name,
            created_on: new Date(),
            admin: {
              name: rootState.Auth.user.displayName,
              email: rootState.Auth.user.email
            },
            teamMembers: {
              [rootState.Auth.user.uid]: {
                role: "admin",
                status: "active",
                joined: new Date()
              }
            }
          });
          commit("SET_CURRENT_TEAM", team.name);
        } else {
          // stop the transaction and throw an error to the catch.
          throw "Sorry, but it seems a team with that name has already been created";
        }
      });
    })
    .then(() => {
      let userDocRef = firestore.doc(`Users/${rootState.Auth.user.uid}`);
      userDocRef.set(
        {
          CurrentTeam: team.name
        },
        { merge: true }
      );
    })
    .catch(err => {
      dispatch(
        "Notifications/add",
        { type: "error", message: err },
        { root: true }
      );
    });
};
const getTeams = ({ commit, dispatch, rootState }) => {
  firestore
    .collection("Teams")
    .where(`teamMembers.${rootState.Auth.user.uid}.status`, "==", "active")
    .get()
    .then(querySnapshot => {
      if (querySnapshot) {
        let teams = [];
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          teams.push(doc.data());
        });
        commit("SET_TEAMS", teams);
      } else {
        console.log("This user does not belong to any Teams");
      }
    })
    .catch(err => {
      console.log("Error getting documents: ", err);
      dispatch("Notifications/add", { type: "error", ...err }, { root: true });
    });
};
export default {
  getCurrentTeam,
  setCurrentTeam,
  createTeam,
  getTeams
};
