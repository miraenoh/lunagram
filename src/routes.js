import Home from "./components/Home.vue";
import Main from "./components/pages/Main.vue";
import Login from "./components/auth/Login.vue";
import SignUp from "./components/auth/SignUp.vue";

export const routes = [
  { path: "", component: Home, children: [{ path: "", component: Main }] },
  { path: "/auth/login", component: Login },
  { path: "/auth/signup", component: SignUp }
];
