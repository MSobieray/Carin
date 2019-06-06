<template>
  <section>
    <v-layout column>
      <v-flex xs12 sm6>
        <v-card>
          <v-container fluid grid-list-md>
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
                    <v-switch
                      v-model="Activeteam"
                      @click="setTeam(`${team.teamName}`)"
                      :value="`${team.teamName}`"
                    ></v-switch>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </section>
</template>
<script>
export default {
  data() {
    return {
      Activeteam: ""
      // activeRules: [
      //   // TODO: remove all error when a valid selection is made
      //   // v => {
      //   //   console.log(v)
      //   //   if (v === null) {
      //   //     return "You Must Select a Team"
      //   //   } else {
      //   //     this.Activeteam = v
      //   //     return true
      //   //   }
      //   // }
      // ]
    };
  },
  created() {},
  computed: {
    teams() {
      // this.Activeteam = this.$store.getters["Teams/currentTeam"];
      return this.$store.getters["Teams/teams"];
    }
  },
  methods: {
    setTeam(teamName) {
      // show the active team
      if (!teamName) {
        alert("you must select a team");
      } else {
        this.Activeteam = teamName;
        this.$store.dispatch("Teams/setActiveTeam", teamName);
      }
      // TODO: Set the team in the store and database
    }
  }
};
</script>
<style scoped></style>
