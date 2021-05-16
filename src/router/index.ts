import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/totalAssets",
    name: "TotalAssets",
    component: () => import(/* webpackChunkName: "publish" */ "../views/TotalAssets.vue"),
    meta: {
      title: "总资产",
    },
    props: (route) => ({
      userId: route.query.userId,
      aId: route.query.aId,
    }),
  },
  {
    path: "/cardManage",
    name: "",
    component: () => import("../views/cardManage.vue"),
    meta: {
      title: "俱乐部卡管理",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
