<template>
  <div>
    <v-list>
      <v-list-item>
        <v-list-item-action>
          <v-icon>info</v-icon>
        </v-list-item-action>
        <v-list-item-title>Overview</v-list-item-title>
      </v-list-item>

      <v-list-group>
        <v-list-item slot="activator">
          <v-list-item-content>
            <v-list-item-title>Development</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content
            >Repository URL:
            {{ projectData.development.repo.url }}</v-list-item-content
          >
        </v-list-item>
      </v-list-group>

      <v-list-group>
        <v-list-item slot="activator">
          <v-list-item-content>
            <v-list-item-title>Tech Stack</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              v-text="
                `Front-End: ${projectData.development.techStack.front_end}`
              "
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              v-text="`Back-End: ${projectData.development.techStack.back_end}`"
            ></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-btn rounded text color="accent" @click="edit">Edit</v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProjectSidebar",
  computed: mapState("Projects", ["projectData"]),
  methods: {
    edit() {
      this.$store.commit("Projects/SHOW_STEPPER", true);
    }
  }
};
</script>

<style lang="scss" scoped></style>
