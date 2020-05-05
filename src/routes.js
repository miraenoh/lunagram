import Home from "./components/Home.vue";
import Login from "./components/auth/Login.vue";
import SignUp from "./components/auth/SignUp.vue";

export const routes = [
  { path: "", component: Home },
  { path: "/auth/login", component: Login },
  { path: "/auth/signup", component: SignUp }
];
