<template>
  <v-list>
    <v-list-tile-title>{{ page.name }}</v-list-tile-title>
  </v-list>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState("Sidebar", ["page"])
};
</script>

<style lang="scss" scoped></style>
