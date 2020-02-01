<template>
  <v-navigation-drawer v-model="drawerProp" width="75%" app>
    <v-tabs
      v-model="tab"
      show-arrows
      center-active
      slider-size="1"
      centered
      grow
      background-color="primary"
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab href="#tab-1">Main</v-tab>
      <v-tab href="#tab-2">Project Info</v-tab>
      <v-tab href="#tab-3">Page Info</v-tab>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
          <component :is="`sidebar-${type}`" :user="user" />
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>

    <!-- Use a component :is to display the correct sidebar -->

    <!-- <sidebar-main :user="user" v-if="user && type === 'default'" />
    <sidebar-login v-else-if="!user" />
    <sidebar-page v-if="type === 'page'" /> -->
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import SidebarMain from "@/components/sidebars/Sidebar_main";
import SidebarLogin from "@/components/sidebars/Sidebar_login";
import SidebarPage from "@/components/sidebars/Sidebar_page";

export default {
  name: "NavigationDrawer",
  props: {
    user: {
      type: [Object, Boolean]
    },
    drawer: {
      required: true
    }
  },
  data() {
    return {
      tab: null
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
