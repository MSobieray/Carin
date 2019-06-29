<template>
  <v-footer v-show="user" app fixed height="auto">
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
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>
