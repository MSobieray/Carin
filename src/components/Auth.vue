<template>
  <section>
    <v-container align-content-center>
      <v-layout row wrap>
        <v-flex lg12 text-lg-center>
          <div v-if="!this.isLoggedIn">
            <v-btn @click="login()" color="accent">
              Login
            </v-btn>
          </div>
          <div v-else>
            <v-btn @click="logout()" color="error">
              Logout
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { auth } from "@/firebase/config.js";
import { firestore } from "@/firebase/config.js";
import { provider } from "@/firebase/config.js";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      // Make this an action so it fires when the page is refreshed
      // Not just when the user logs in.
      auth
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Google Access Token.
          //You can use it to access the Google API.
          // !-- NOT SURE WE NEED THIS --!
          // let token = result.credential.accessToken;

          // The signed-in user info.
          let user = result.user;
          // Create refernce to the users document
          return user;
        })
        .then(user => {
          // set a new user doc but if an exsisting user get their teams
          // let userRef = firestore.collection("Users").doc(user.uid);
          firestore
            .collection("Users")
            .doc(user.uid)
            .get()
            .then(doc => {
              if (doc.exists) {
                // get the users teams
                this.$store.dispatch("Firebase/getTeams", user);
              } else {
                // Create a new user in the users collection
                firestore
                  .collection("Users")
                  .doc(user.uid)
                  .set({
                    Name: user.displayName,
                    Email: user.email,
                    Teams: {}
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          console.log(errorCode, errorMessage, email, credential);
        });
    },
    logout() {
      this.$store.dispatch("Auth/logout");
    }
  },
  computed: {
    isLoggedIn() {
      if (this.$store.getters["Auth/user"]) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="stylus"></style>
