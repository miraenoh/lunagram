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

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
