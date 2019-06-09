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
    .catch(error => {
      console.log("Error getting documents: ", error);
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

const createTeam = ({ commit, rootState }, team) => {
  // create a new team
  // USE A FIRESTORE TRANSACTION TO READ AND WRITE
  let teamDocRef = firestore.doc(`Teams/${team.name}`);

  firestore
    .runTransaction(transaction => {
      return transaction.get(teamDocRef).then(teamDoc => {
        if (!teamDoc.exists) {
          // create new team
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
          // Set Mutation to Throw an error to the user
          // reject the promise
          // Log the error
          throw "TEAM NAME IS TAKEN";
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
};
const getTeams = ({ commit, rootState }) => {
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
    .catch(error => {
      console.log("Error getting documents: ", error);
    });
};
export default {
  getCurrentTeam,
  setActiveTeam,
  createTeam,
  getTeams
};
