<template>
  <div id="app">
    <header>
      <span>Vue.js PWA</span>
    </header>
    <main>
      <img src="./assets/logo.png" alt="Vue.js PWA">
      <router-view></router-view>
    </main>
    <form @submit="sendData">
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
import fireConfig from './firebase/config.js'

const firebaseApp = Firebase.initializeApp(fireConfig)
const db = firebaseApp.database()

export default {
  name: 'app',
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
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
