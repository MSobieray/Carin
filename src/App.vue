<template>
  <v-app dark>
    <!-- START Navigation -->
    <v-navigation-drawer clipped fixed v-model="drawer" app>
      <v-list dense v-if="this.user">
        <v-list-tile>
          <!-- @clcik="" -->

          <v-list-tile-action>
            <v-avatar size="32">
              <img :src="user.photoURL" alt="user.displayName" />
            </v-avatar>
          </v-list-tile-action>
          <v-list-tile-content>
            {{ user.displayName }}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/settings">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/team/switch">
          <v-list-tile-action>
            <v-icon>swap_horiz</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Switch Teams</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="logout()">
          <v-list-tile-action>
            <v-icon>person_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense v-else>
        <v-list-tile to="/login">
          <v-list-tile-action>
            <v-icon>person_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Login</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Carin Website Managment</v-toolbar-title>
    </v-toolbar>
    <!-- START Content -->
    <v-content>
      <router-view></router-view>
    </v-content>
    <!-- START FOOTER -->
    <v-footer v-show="this.user" app fixed height="auto">
      <v-layout justify-center>
        <v-btn color="secondary" dark block flat to="/">
          <v-icon>dashboard</v-icon>
        </v-btn>
        <v-btn color="secondary" dark block flat to="/settings">
          <v-icon>terrain</v-icon>
        </v-btn>
        <v-btn color="secondary" dark block flat to="/team/switch">
          <v-icon>swap_horiz</v-icon>
        </v-btn>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data: () => ({
    drawer: false
  }),
  computed: {
    user() {
      return this.$store.getters["Auth/user"];
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("Auth/logout");
    }
  }
};
</script>

<style lang="stylus">
$body-font-family = 'OpenSans';

@import '~vuetify/src/stylus/main';

.btn {
  &--block {
    margin: 0;
    height: 60px;
  }
}
</style>
