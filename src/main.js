import Vue from "vue";
import App from "./App.vue";

import * as firebase from "firebase/app";
import VueResource from "vue-resource";

Vue.config.productionTip = false;

Vue.use(VueResource);

// Initialize firebase
// TODO Move firebaseconfig to .env
var firebaseConfig = {
  apiKey: "AIzaSyAFz7yvyF8EuZ1RNQD8eWCjG2PBWJxUlT8",
  authDomain: "lunagram-server.firebaseapp.com",
  databaseURL: "https://lunagram-server.firebaseio.com",
  projectId: "lunagram-server",
  storageBucket: "lunagram-server.appspot.com",
  messagingSenderId: "206176125906",
  appId: "1:206176125906:web:ef7ccd9cf982d19813be0b",
  measurementId: "G-QH55N2VG9E",
};
firebase.initializeApp(firebaseConfig);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
