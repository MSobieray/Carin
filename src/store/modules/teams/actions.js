import { firestore } from "@/firebase/config.js";

const getCurrentTeam = ({ commit, dispatch, rootState }) => {
  const userRef = firestore.collection("Users").doc(rootState.Auth.user.uid);
  userRef
    .get()
    .then(user => {
      let userData = user.data();
      commit("SET_CURRENT_TEAM", userData.CurrentTeam);
      dispatch("Projects/getProjects", userData.CurrentTeam, { root: true });
    })
    .catch(err => {
      console.log("Error getting documents: ", err);
      dispatch("Notifications/add", err, { root: true });
    });
};

const setActiveTeam = ({ commit, dispatch, rootState }, teamName) => {
  commit("SET_CURRENT_TEAM", teamName);
  const userRef = firestore.collection("Users").doc(rootState.Auth.user.uid);
  userRef.set(
    {
      CurrentTeam: teamName
    },
    { merge: true }
  );
  dispatch("Projects/getProjects", teamName, { root: true });
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
  setActiveTeam,
  createTeam,
  getTeams
};
