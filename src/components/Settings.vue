<template>
  <v-container>
    <v-form v-model="valid" ref="form" lazy-validation>
      <input type="file" name="newImage" id="newImage" />
      <v-btn @click="submit" :disabled="!valid">submit</v-btn>
    </v-form>
    <v-progress-linear
      color="secondary"
      background-color="primary"
      v-model="this.$store.state.Firebase.progress"
    ></v-progress-linear>
    <!-- <button @click="getImages">Get Images</button> -->
    <!-- <img :src="getImages" alt="" width="300px" style="display:block;"> -->
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true
  }),
  computed: {
    // getImages() {
    //   this.$store.dispatch("Firebase/getImages")
    //   return this.$store.getters["Firebase/image"]
    // }
  },
  methods: {
    submit() {
      this.$store.dispatch("Firebase/uploadImage", this.file);
    }
  },
  mounted() {
    let newFile = document.querySelector("#newImage");
    newFile.addEventListener("change", e => {
      this.file = e.target.files[0];
    });
  }
};
</script>

<style lang="stylus"></style>
