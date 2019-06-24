import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/home/Home";
import AdminPages from "@/components/admin/AdminPages";

import UserAdmin from "@/components/admin/UserAdmin";
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
    meta: { requiresAdmin: true },
    children: [
      {
        path: "user",
        component: UserAdmin,
        meta: { requiresAdmin: true },
        children: [
          {
            path: "cad/:id?/:mode?",
            component: UserAdminCad,
            meta: { requiresAdmin: true }
          },
          {
            path: "list",
            component: UserAdminList,
            meta: { requiresAdmin: true }
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
