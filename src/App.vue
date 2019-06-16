<template>
  <v-app dark>
    <NavigationDrawer :user="user" :drawer="drawer" />
    <ToolBar
      :drawer="drawer"
      @toggleDrawer="payload => (this.drawer = payload)"
    />
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
  computed: mapState("Auth", ["user"])
};
</script>

<style lang="stylus"></style>
