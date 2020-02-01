<template>
  <v-list>
    <v-list-item-title>{{ page.name }}</v-list-item-title>
  </v-list>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState("Sidebar", ["page"])
};
</script>

<style lang="scss" scoped></style>
