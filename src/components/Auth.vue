<template>
  <section>
    <v-container align-content-center>
      <v-layout row wrap>
        <v-flex lg12 text-lg-center>
          <div v-if="!isLoggedIn && !loading">
            <v-btn @click="login('Google')" color="green">
              Google Login
            </v-btn>
            <v-btn @click="login('Github')" color="orange">
              Github Login
            </v-btn>
            <v-btn @click="login('Facebook')" color="blue">
              Facebook Login
            </v-btn>
            <v-btn @click="login('Twitter')" color="purple">
              Twitter Login
            </v-btn>
          </div>
          <div v-else-if="!isLoggedIn && loading">
            <loader />
          </div>
          <div v-else>
            <v-btn @click="logout()" color="error">Logout</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import { mapState } from "vuex";
import loader from "./global/loader";
export default {
  components: {
    loader
  },
  methods: {
    login(provider) {
      this.$store.dispatch("Auth/login", provider);
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
    },
    ...mapState(["loading"])
  }
};
</script>

<style lang="stylus"></style>
