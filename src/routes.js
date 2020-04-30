import Home from "./components/Home.vue";
import Login from "./components/auth/Login.vue";
import SignUp from "./components/auth/SignUp.vue";

export const routes = [
  { path: "", component: Home },
  { path: "/login", component: Login },
  { path: "/signup", component: SignUp }
];
