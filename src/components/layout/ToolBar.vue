<template>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon
      @click.stop="toggleDrawer"
      v-if="currentTeam"
    ></v-toolbar-side-icon>
    <v-toolbar-title>Cairn Website Management</v-toolbar-title>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ToolBar",
  props: {
    drawer: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleDrawer() {
      this.$emit("toggleDrawer", !this.drawer);
    }
  },
  computed: {
    ...mapState("Teams", ["currentTeam"])
  }
};
</script>
