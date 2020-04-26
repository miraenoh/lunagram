import Vue from "vue";
import App from "./App.vue";

import * as firebase from "firebase/app";
import VueResource from "vue-resource";

Vue.config.productionTip = false;

Vue.use(VueResource);

// Initialize firebase
var firebaseConfig = process.env.VUE_APP_FIREBASE_CONFIG;
firebase.initializeApp(firebaseConfig);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
