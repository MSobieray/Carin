<template>
  <v-navigation-drawer v-model="drawerProp" width="80%" app>
    <template slot="prepend">
      <v-tabs
        v-model="tab"
        show-arrows
        center-active
        slider-size="1"
        centered
        grow
        background-color="primary"
        v-show="projectData || page"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#sidebar-main">Main</v-tab>
        <v-tab v-if="projectData" href="#sidebar-project">Project Info</v-tab>
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
    ...mapState("Projects", ["projectData"]),
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
    }
  }
};
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
  max-width: 400px;
}
</style>
