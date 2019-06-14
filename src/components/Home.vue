<template>
  <div class="home">
    <v-layout column v-if="projects.length !== 0">
      <v-flex xs12 sm6>
        <v-card>
          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex
                v-for="project in projects"
                v-bind="{
                  [`lg${project[0].flex}`]: true,
                  sm6: true,
                  xs12: true
                }"
                :key="project.title"
              >
                <v-card>
                  <v-responsive
                    v-if="project[0].img_src"
                    :src="project[0].img_src"
                    height="300px"
                    to="/settings"
                  >
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span
                            class="headline white--text"
                            v-text="project[0].title"
                          />
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-responsive>
                  <v-responsive v-else height="300px" class="disabled">
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span
                            class="headline white--text"
                            v-text="project[0].title"
                          />
                        </v-flex>
                        <v-btn icon>
                          <v-icon>photo_camera</v-icon>
                        </v-btn>
                      </v-layout>
                    </v-container>
                  </v-responsive>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                      <v-icon medium>notification_important</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>favorite_border</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                    <v-btn
                      :to="`/team/${slug(currentTeam)}/project/${project[1]}`"
                      color="accent"
                      flat
                    >
                      Open
                      <v-icon>navigate_next</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout d-flex v-else-if="loading">
      <v-container>
        <loader />
      </v-container>
    </v-layout>
    <v-layout v-else>
      <v-container>
        <h1 class="title">Create Your First Project</h1>
      </v-container>
    </v-layout>
    <v-layout>
      <v-btn
        fab
        color="accent"
        fixed
        bottom
        right
        @click.native.stop="modal = !modal"
      >
        <v-icon>add</v-icon>
      </v-btn>

      <!-- TODO: Create A modal Component with a SLOT -->
      <v-dialog
        v-model="modal"
        max-width="1000"
        lazy
        transition="slide-y-reverse-transition"
      >
        <v-card>
          <v-card-title class="headline" primary-title
            >Add A Project</v-card-title
          >

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Project Title"
                    required
                    v-model="project.title"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent" flat @click="createProject()"
              >Create Project</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import loader from "./global/loader";
export default {
  name: "home",
  components: {
    loader
  },
  data() {
    return {
      modal: false,
      project: {
        title: null,
        active: true, // New Firebase timestamp query:
        created_on: new Date(), // const timestamp = snapshot.get('created_at');
        updated_on: new Date(), // const date = timestamp.toDate();
        flex: 4,
        showStepper: true
      }
    };
  },
  computed: {
    ...mapState("Projects", ["projects"]),
    ...mapState(["loading"]),
    currentTeam() {
      return this.$store.getters["Teams/currentTeam"];
    }
  },
  methods: {
    createProject() {
      this.$store.dispatch("Projects/createProject", this.project);
      this.modal = false;
      this.project.title = null;
    },
    slug(path) {
      return path
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase();
    }
  }
};
</script>

<style lang="stylus" scoped>
.layout {
  .fill-height {
    background-color: $primray;
  }
}
</style>
