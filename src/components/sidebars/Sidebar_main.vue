<template>
  <v-list dense>
    <v-list-item-group>
      <v-list-item>
        <v-list-item-icon>
          <v-avatar size="28">
            <img :src="user.photoURL" alt="user.displayName" />
          </v-avatar>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon>dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/settings">
        <v-list-item-icon>
          <v-icon>settings</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item to="/team/switch">
        <v-list-item-icon>
          <v-icon>swap_horiz</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Switch Teams</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout()">
        <v-list-item-icon>
          <v-icon>person_outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
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
