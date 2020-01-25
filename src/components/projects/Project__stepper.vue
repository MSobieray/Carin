<template>
  <v-container grid-list-xl>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1"
          >Development</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :complete="step > 2" step="2">Design</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Name of step 3</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="form" v-model="development.formIsValid">
            <!-- REPO INFO -->
            <h3 class="title pt-3 pb-3">Repository Information</h3>
            <v-layout row wrap>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="development.repo.url"
                  label="Repository URL"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-checkbox
                  v-model="development.repo.hasPassword"
                  label="Do you want to share password info for your repo?"
                ></v-checkbox>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-if="development.repo.hasPassword"
                  v-model="development.repo.username"
                  label="Repositories Username"
                  :rules="[v => !!v || 'Username is Required']"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-if="development.repo.hasPassword"
                  v-model="development.repo.password"
                  label="Repositories Password"
                  :rules="[v => !!v || 'Password is Required']"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>

            <!-- TECH STACK -->
            <h3 class="title pt-3 pb-3">Tech Stack</h3>
            <v-layout row wrap>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="development.techStack.front_end"
                  label="Front-End Technology"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="development.techStack.back_end"
                  label="Back-End Technology"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <!-- DATABASE -->
            <h3 class="title pt-3 pb-3">Database</h3>
            <v-layout row wrap>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="development.database.type"
                  label="Database Type"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="development.database.adminPanel"
                  label="Database Admin Panel URL"
                ></v-text-field>
              </v-flex>
            </v-layout>

            <!-- URL INFO -->
            <h3 class="title pb-3 pt-3">Hosting / URLs</h3>
            <v-layout row wrap>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="development.domain.staging"
                  label="Staging URL"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="development.domain.production"
                  label="Production URL"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="development.domain.hosting"
                  label="Hosting Company"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  v-model="development.domain.registar"
                  label="Domain Name Registar"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>

          <v-btn
            color="accent"
            @click="step = 2"
            :disabled="!development.formIsValid"
          >
            Next
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form>
            <h3 class="title mb-1 mt-3 pb-3">Design Info</h3>
            <v-text-field
              v-model="design.software"
              label="Design Software"
            ></v-text-field>
            <v-text-field
              v-model="design.url"
              label="Link To Design Files"
            ></v-text-field>
            <v-select
              :items="desingSelect"
              v-model="design.responsive"
              label="Responsive Design"
              required
            ></v-select>
            <v-textarea
              box
              class="pb-5 mt-3"
              name="design-notes"
              label="Notes"
              v-model="design.notes"
              hint="Any notes that might be helpful"
            ></v-textarea>
          </v-form>

          <v-btn color="accent" @click="step = 3">
            Next
          </v-btn>

          <v-btn flat @click="step -= 1">Back</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-form>
            <v-text-field
              v-model="general.info"
              label="General Information"
            ></v-text-field>
          </v-form>
          <v-btn color="accent" @click="save()">
            Save
          </v-btn>

          <v-btn flat @click="step -= 1">Back</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  props: ["projectID", "projectData"],
  data() {
    return {
      step: 1,
      validate: {
        step1: false
      },
      desingSelect: [true, false],
      development: {
        formIsValid: true,
        repo: {
          url: "",
          hasPassword: false,
          username: "",
          password: ""
        },
        techStack: {
          front_end: "",
          back_end: ""
        },
        database: {
          type: "",
          adminPanel: ""
        },
        domain: {
          staging: "",
          production: "",
          hosting: "",
          registar: ""
        }
      },
      design: {
        software: "",
        url: "",
        responsive: "",
        notes: ""
      },
      general: {
        info: ""
      }
    };
  },
  methods: {
    save() {
      this.$store.dispatch("Projects/updateProject", {
        showStepper: false,
        projectID: this.projectID,
        development: this.development,
        design: this.design,
        general: this.general,
        updated_on: new Date()
      });
      this.$router.push({ name: "ProjectOverview" });
    }
  },
  computed: {
    data() {
      return this.projectData;
    }
  },
  created() {
    if (this.projectData.development) {
      this.development.repo.url = this.projectData.development.repo.url;
      this.development.repo.url = this.projectData.development.repo.url;
      this.development.repo.hasPassword = this.projectData.development.repo.hasPassword;
      this.development.repo.username = this.projectData.development.repo.username;
      this.development.repo.password = this.projectData.development.repo.password;
      this.development.techStack.front_end = this.projectData.development.techStack.front_end;
      this.development.techStack.back_end = this.projectData.development.techStack.back_end;
      this.development.database.type = this.projectData.development.database.type;
      this.development.database.adminPanel = this.projectData.development.database.adminPanel;
      this.development.domain.staging = this.projectData.development.domain.staging;
      this.development.domain.production = this.projectData.development.domain.production;
      this.development.domain.hosting = this.projectData.development.domain.hosting;
      this.development.domain.registar = this.projectData.development.domain.registar;
    }
    if (this.projectData.design) {
      this.design.software = this.projectData.design.software;
      this.design.url = this.projectData.design.url;
      this.design.responsive = this.projectData.design.responsive;
      this.design.notes = this.projectData.design.notes;
    }
    if (this.projectData.general) {
      this.general.info = this.projectData.general.info;
    }
  }
};
</script>

<style lang="scss">
.v-stepper {
  &__wrapper {
    overflow: visible;
  }
}
</style>
