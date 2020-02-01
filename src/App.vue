<template>
  <v-app dark>
    <NavigationDrawer
      :user="user"
      :drawer="visible"
      @toggleDrawer="toggleSidebar"
    />
    <ToolBar :drawer="visible" @toggleDrawer="toggleSidebar" />
    <!-- START Main Content -->
    <v-content>
      <router-view />
      <notification />
    </v-content>
    <Footer :user="user" />
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import Footer from "./components/layout/Footer";
import NavigationDrawer from "./components/layout/NavigationDrawer";
import Notification from "./components/global/Notification";
import ToolBar from "./components/layout/ToolBar";
export default {
  name: "app",

  components: {
    Footer,
    NavigationDrawer,
    Notification,
    ToolBar
  },
  data: () => ({
    drawer: false
  }),
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapState("Sidebar", ["visible"])
  },
  methods: {
    toggleSidebar() {
      this.$store.commit("Sidebar/TOGGLE");
    }
  }
};
</script>

<style lang="scss"></style>
