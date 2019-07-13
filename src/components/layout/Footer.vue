<template>
  <v-footer v-if="user && currentTeam" app fixed height="auto">
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
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    user: {
      type: [Object, Boolean]
    }
  },
  computed: {
    ...mapState("Teams", ["currentTeam"])
  }
};
</script>
