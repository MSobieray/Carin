<template>
  <v-navigation-drawer clipped fixed v-model="drawerProp" app>
    <!-- TODO: Add icons to toggle sidebars -->
    <!-- Use a component :is to display the correct sidebar -->
    <component :is="`sidebar-${type}`" :user="user" />
    <!-- <sidebar-main :user="user" v-if="user && type === 'default'" />
    <sidebar-login v-else-if="!user" />
    <sidebar-page v-if="type === 'page'" /> -->
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import SidebarMain from "../sidebars/Sidebar_main";
import SidebarLogin from "../sidebars/Sidebar_login";
import SidebarPage from "../sidebars/Sidebar_page";
export default {
  name: "NavigationDrawer",
  props: {
    user: {
      type: [Object, Boolean]
    },
    drawer: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      sidebar: this.type
    };
  },
  components: {
    SidebarMain,
    SidebarLogin,
    SidebarPage
  },
  computed: {
    ...mapState("Sidebar", ["type"]),
    drawerProp: {
      get() {
        return this.drawer;
      },
      set(val) {
        if (val !== this.drawer) {
          this.$emit("toggleDrawer", val);
        }
      }
    }
  },
  watch: {
    type(val) {
      this.sidebar = val;
    }
  }
};
</script>
