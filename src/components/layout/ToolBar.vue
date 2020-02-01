<template>
  <v-app-bar app>
    <v-app-bar-nav-icon
      @click.stop="toggleDrawer"
      v-if="currentTeam"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>Cairn Website Management</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ToolBar",
  props: {
    drawer: {
      required: true
    }
  },
  methods: {
    toggleDrawer() {
      this.$emit("toggleDrawer");
    }
  },
  computed: {
    ...mapState("Teams", ["currentTeam"])
  }
};
</script>
