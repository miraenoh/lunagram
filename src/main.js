import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";

import { routes } from "./routes";
import * as postService from "./services/postService";

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: "history"
});

Vue.config.productionTip = false;

postService.initFirebase();

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
