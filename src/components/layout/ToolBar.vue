<template>
  <v-toolbar app fixed clipped-left>
    <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>Carin Website Managment</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: "ToolBar",
  props: {
    drawer: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    toggleDrawer() {
      this.$emit("toggleDrawer", !this.drawer);
    }
  },
  computed: {}
};
</script>

<style lang="stylus"></style>
