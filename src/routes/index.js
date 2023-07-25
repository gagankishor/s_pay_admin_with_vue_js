import { createRouter, createWebHistory } from "vue-router";

import { admin_routes } from "./admin";
import { web_routes } from "./web";

const routes = [...admin_routes, ...web_routes];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
