<template>
  <div>
    <v-list dense>
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
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: [Object, Boolean],
      required: true
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("Auth/logout");
    }
  }
};
</script>

<style lang="scss" scoped></style>
