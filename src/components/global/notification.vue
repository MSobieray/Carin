<template>
  <div>
    <v-snackbar
      v-for="notification in notifications"
      :key="notification.id"
      :timeout="timeout"
      :color="notification.type"
      :auto-height="true"
      :multi-line="true"
      :top="true"
      v-model="notification.message"
    >
      {{ notification.message }}
      <v-btn color="white" flat @click="remove(notification.id)">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    timeout: 0
  }),
  computed: mapState("Notifications", ["notifications"]),
  methods: {
    remove(id) {
      this.$store.dispatch("Notifications/remove", id);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
