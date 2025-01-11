import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  routes,
  history: createWebHistory(),
//   linkActiveClass: "active",
});

router.beforeEach(async (to, from) => {});

export default router;
