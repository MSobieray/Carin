<template>
  <section>
    <v-container align-content-center>
      <v-layout row wrap>
        <v-flex lg12 text-lg-center>
          <v-form v-model="valid">
            <!-- create a team -->

            <!-- pick a team name -->
            <v-text-field
              id="team"
              name="team"
              label="Team Name"
              v-model="team"
              :rules="teamRules"
              required
            ></v-text-field>

            <!-- pick a alias -->
            <!-- <v-text-field
              id="alias"
              name="alias"
              label="Your User Alias"
              v-model="alias"
              :rules="aliasRules"
              :counter="10"
              required
            ></v-text-field> -->
            <v-btn @click="createTeam()">Create team</v-btn>
          </v-form>
          <div v-if="exsistingTeam">That team name is already taken</div>
          <v-form v-model="valid">
            <v-text-field
              id="addMember"
              name="addMember"
              label="Add A Team Member"
              v-model="teamMember"
              required
            ></v-text-field>
            <v-btn @click="addMember()">Invite Team Member</v-btn>
          </v-form>
        </v-flex>
        <!-- !!! TODO: Create a global error component -->
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  data() {
    return {
      team: "",
      teamRules: [v => !!v || "A team name is required"],
      // alias: "",
      // aliasRules: [v => !!v || "Please pick you user's alias name", v => v.length <= 10 || "Alias must be less than 10 characters"],
      valid: false,
      teamMember: ""
    };
  },
  methods: {
    createTeam() {
      this.$store.dispatch("Teams/createTeam", { name: this.team });
    },
    addMember() {
      console.log("Getting Teams");
      this.$store.dispatch("Teams/getTeams");
    }
  },
  computed: {
    exsistingTeam() {
      return this.$store.getters["Teams/exsistingTeam"];
    }
  }
};
</script>

<style lang="stylus"></style>
