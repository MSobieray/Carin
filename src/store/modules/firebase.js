// import { firestore } from "../../firebase/config.js"
import { firestorage } from "../../firebase/config.js";
// import { auth } from "../../firebase/config.js"

const fireStore = {
  namespaced: true,
  state: {
    progress: 0,
    image: ""
  },
  getters: {
    image: state => state.image
  },
  mutations: {
    uploadProgress(state, payload) {
      state.progress = payload;
    },
    setImage(state, payload) {
      state.image = payload;
    }
  },
  actions: {
    // POST TO FIRESTORAGE
    uploadImage({ commit }, file) {
      const upload = firestorage.ref(`images/${file.name}`).put(file);
      upload.on(
        "state_changed",
        function progress(snapshot) {
          const uploadPercentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          commit("uploadProgress", uploadPercentage);
        },
        function error(err) {
          console.log(err);
        },
        function complete() {
          console.log(upload.snapshot.downloadURL);
        }
      );
    }
    // FIRESTORE QUERIES
    // getImages({ commit }, file) {
    //   var gsReference = firestorage.refFromURL(
    //     `gs://carin-3da86.appspot.com/images/vanlife.jpg`
    //   );
    //   gsReference.getDownloadURL().then(function(url) {
    //     commit("setImage", url);
    //   });
    //   console.log(firestorage.ref(`/images/vanlife.jpg`).name);
    // }
  }
};

export default fireStore;
