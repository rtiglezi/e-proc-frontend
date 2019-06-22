import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/home/Home";
import AdminPages from "@/components/admin/AdminPages";

import UserAdminCad from "@/components/admin/UserAdminCad";
import UserAdminList from "@/components/admin/UserAdminList";

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    component: Home
  },
  {
    name: "adminPages",
    path: "/admin",
    component: AdminPages,
    meta: { requiresAdmin: true }
  },
  {
    name: "userAdminCad",
    path: "/user/cad/:id?/:mode?",
    component: UserAdminCad,
    meta: { requiresAdmin: true }
  },
  {
    name: "userAdminList",
    path: "/user/list",
    component: UserAdminList,
    meta: { requiresAdmin: true }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
