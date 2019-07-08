<template>
  <section>
    <v-layout column>
      <v-flex xs12 sm6>
        <v-container fluid grid-list-md>
          <v-radio-group v-model="currentTeam">
            <v-layout row wrap>
              <v-flex
                v-for="team in teams"
                v-bind="{ [`xs${team.flex}`]: true }"
                :key="team.name"
              >
                <v-card>
                  <!--  -->
                  <v-responsive height="300px" :src="team.logo">
                    <v-container fill-height fluid>
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                          <span
                            class="headline white--text"
                            v-text="team.teamName"
                          />
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-responsive>
                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <!-- <v-btn icon>
                        <v-icon>notifications</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>favorite_border</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>more_vert</v-icon>
                      </v-btn>-->
                    <v-radio
                      :value="`${team.teamName}`"
                      :label="
                        currentTeam === team.teamName
                          ? 'Current Team'
                          : 'Activate Team'
                      "
                    ></v-radio>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-radio-group>
        </v-container>
      </v-flex>
    </v-layout>
  </section>
</template>
<script>
export default {
  name: "SwitchTeam",
  computed: {
    currentTeam: {
      get() {
        return this.$store.state.Teams.currentTeam;
      },
      set(team) {
        if (!team) {
          alert("you must select a team");
        } else {
          this.$store.dispatch("Teams/setCurrentTeam", team);
        }
      }
    },
    teams() {
      // this.Activeteam = this.$store.getters["Teams/currentTeam"];
      return this.$store.getters["Teams/teams"];
    }
  }
};
</script>
<style scoped lang="stylus">
.v-input {
  display: block;
}
</style>
