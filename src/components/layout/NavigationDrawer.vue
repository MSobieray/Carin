<template>
  <v-navigation-drawer clipped fixed v-model="drawerProp" app>
    <v-list dense v-if="user && type === 'default'">
      <v-list-tile>
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
    <!-- In not logged in just display Login  -->
    <v-list dense v-else-if="!user">
      <v-list-tile to="/login">
        <v-list-tile-action>
          <v-icon>person_outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Login</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list v-else>
      <v-list-tile-title>PAGE NAME</v-list-tile-title>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "NavigationDrawer",
  props: {
    user: {
      type: [Object, Boolean]
    },
    drawer: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapState("Sidebar", ["type"]),
    drawerProp: {
      get() {
        return this.drawer;
      },
      set(val) {
        if (val !== this.drawer) {
          this.$emit("toggleDrawer", val);
        }
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("Auth/logout");
    }
  }
};
</script>
