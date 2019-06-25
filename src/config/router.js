import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/home/Home";
import AdminPages from "@/components/admin/AdminPages";

import UserAdmin from "@/components/admin/UserAdmin";

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
    meta: { requiresAdmin: true },
    children: [
      {
        path: "user",
        component: UserAdmin,
        meta: { requiresAdmin: true }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
