import Vue from "vue";
import App from "./App.vue";

import * as postService from "./services/postService";

Vue.config.productionTip = false;

postService.initFirebase();

new Vue({
  render: (h) => h(App)
}).$mount("#app");
