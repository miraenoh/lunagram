import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";

import firebase from "firebase";

import { routes } from "./routes";
import { FIREBASE_CONFIG } from "./properties";

firebase.initializeApp(FIREBASE_CONFIG);

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: "history"
});

Vue.config.productionTip = false;

let app = null;
firebase
  .app()
  .auth()
  .onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      console.log("logged in");
    } else {
      console.log("signed out");
    }

    if (!app) {
      app = new Vue({
        router,
        render: (h) => h(App)
      }).$mount("#app");
    }
  });
