<template>
  <div class="home">
    <form @submit.prevent="sendData">
      <input v-model="data" type="text">
      <input type="submit" value="Submit">
    </form>
    <ul>
      <li v-for="data in getData" :key="data['.key']">{{ data.data }}</li>
    </ul>
  </div>
</template>

<script>
import Firebase from 'firebase'
import fireConfig from '../firebase/config.js'

const firebaseApp = Firebase.initializeApp(fireConfig)
const db = firebaseApp.database()

export default {
  name: 'home',
  data () {
    return {
      data: ''
    }
  },
  firebase: {
    getData: db.ref('/data/')
  },
  methods: {
    sendData () {
      db.ref('/data/').push({
        data: this.data
      })
      this.data = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
