import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Users from "../views/Users.vue";
import User from "../views/User.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      auth: true
    },
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/about",
    name: "About",
    component: () =>  import("../views/About.vue")
  },
  {
    path: "/users",
    name: "Users",
    meta: {
      auth: true
    },
    component: Users
  },
  {
    path: "/user",
    name: "User",
    meta: {
      auth: true
    },
    component: User
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('userToken');
  if (to.matched.some(record => record.meta.auth) && !loggedIn) next('/login');
  else next();
})

export default router;
