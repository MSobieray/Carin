<template>
  <section>
    <v-container align-content-center>
      <v-layout row wrap>
        <v-flex lg12 text-lg-center>
          <div v-if="!this.isLoggedIn">
            <v-btn @click="login()" color="accent">
              Google Login
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
export default {
  methods: {
    login() {
      this.$store.dispatch("Auth/login", "Google");
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
