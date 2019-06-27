import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/home/Home";
import UserAdmin from "@/components/admin/UserAdmin";


Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: Home
  },
  {
    name: "userAdmin",
    path: "/admin/user",
    component: UserAdmin,
    meta: { requiresAdmin: true }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
