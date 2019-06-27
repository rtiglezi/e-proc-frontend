import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/home/Home";
import UserAdmin from "@/components/admin/UserAdmin";
import DivisionAdmin from "@/components/admin/DivisionAdmin";

import Confirm from "@/components/admin/Confirm";


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
  },
  {
    name: "divisionAdmin",
    path: "/admin/division",
    component: DivisionAdmin,
    meta: { requiresAdmin: true }
  },
  {
    name: "confirm",
    path: "/admin/confirm",
    component: Confirm,
    meta: { requiresAdmin: true }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
