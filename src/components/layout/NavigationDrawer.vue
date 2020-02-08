<template>
  <v-navigation-drawer v-model="drawerProp" width="80%" app>
    <!-- TODO: Only Show the tabs if inside of a project else just use main sidebar -->

    <template slot="prepend">
      <v-tabs
        v-model="tab"
        show-arrows
        center-active
        slider-size="1"
        centered
        grow
        background-color="primary"
        v-if="displayTabs"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#sidebar-main">Main</v-tab>
        <v-tab href="#sidebar-project">Project Info</v-tab>
        <v-tab v-if="page" href="#sidebar-page">Page Info</v-tab>
      </v-tabs>
    </template>
    <template slot="default">
      <v-tabs-items v-model="tab">
        <v-tab-item :value="`${type}`">
          <component :is="`${type}`" :user="user" />
        </v-tab-item>
      </v-tabs-items>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import SidebarMain from "@/components/sidebars/Sidebar_main";
import SidebarLogin from "@/components/sidebars/Sidebar_login";
import SidebarPage from "@/components/sidebars/Sidebar_page";
import SidebarProject from "@/components/sidebars/Sidebar_project";
export default {
  name: "NavigationDrawer",
  props: {
    user: {
      type: [Object, Boolean]
    },
    drawer: {
      // vuetify requires default to be null
      required: true
    }
  },
  components: {
    SidebarMain,
    SidebarLogin,
    SidebarPage,
    SidebarProject
  },
  computed: {
    ...mapState("Sidebar", ["type", "page"]),
    drawerProp: {
      get() {
        return this.drawer;
      },
      set(val) {
        if (val !== this.drawer) {
          this.$emit("toggleDrawer", val);
        }
      }
    },
    tab: {
      get() {
        return this.type;
      },
      set(val) {
        this.$store.dispatch("Sidebar/set", { type: val });
      }
    },
    displayTabs() {
      return this.$route.name === "ProjectOverview";
    }
  }
};
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  max-width: 400px;
}
</style>
