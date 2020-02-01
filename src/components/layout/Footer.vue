<template>
  <v-footer v-if="user && currentTeam" app>
    <v-row no-gutters>
      <v-col>
        <v-btn color="secondary" text block to="/">
          <v-icon>dashboard</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn color="secondary" text block to="/settings">
          <v-icon>terrain</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn color="secondary" text block to="/team/switch">
          <v-icon>swap_horiz</v-icon>
        </v-btn>
      </v-col>
    </v-row>
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
