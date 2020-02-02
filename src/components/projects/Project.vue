<template>
  <section>
    <!-- LOADER -->
    <loader v-if="!getProject"></loader>
    <!-- TITLE -->
    <v-container v-if="getProject && getProject.showStepper">
      <h1 class="display-2 font-weight-medium">{{ getProject.title }}</h1>
    </v-container>
    <!-- STEPPER -->
    <project-steppper
      :projectID="$route.params.projectID"
      :projectData="getProject"
      v-if="getProject && getProject.showStepper"
    ></project-steppper>

    <!-- Sidebar -->
    <router-view v-if="getProject" :projectData="getProject"></router-view>
    <!-- SITE MAP -->

    <!-- SIDEBARS -->
  </section>
</template>

<script>
import loader from "../global/Loader.vue";
import ProjectStepper from "./Project__stepper.vue";
export default {
  components: {
    loader,
    "project-steppper": ProjectStepper
  },
  data() {
    return {};
  },
  created() {
    if (this.currentTeam) {
      this.getData(this.currentTeam);
    }
  },
  computed: {
    currentTeam: {
      get() {
        return this.$store.getters["Teams/currentTeam"];
      }
    },
    getProject() {
      let data = this.$store.getters["Projects/projectData"];
      // if (data && data.showStepper === false) {
      //   this.$router.push({ name: "ProjectOverview" });
      // } else {
      return data;
      // }
    }
  },
  watch: {
    // Needed for page reload
    currentTeam(val) {
      if (val !== null) {
        this.getData(val);
      }
    }
  },
  methods: {
    getData(currentTeam) {
      const project = this.$route.params.projectID;
      this.$store.dispatch("Projects/getProjectData", {
        project,
        currentTeam
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
