import HomePage from "@/pages/HomePage.vue";
import RegionsPage from "@/pages/RegionsPage.vue";
import RegionsCompare from "@/pages/RegionsCompare.vue";
import NotFoundErrorPage from "../pages/errors/NotFoundErrorPage.vue";
import Adjara from "@/pages/regions/adjara/Adjara.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/regions",
    name: "Regions",
    component: RegionsPage,
  },
  {
    path: "/regionscompare",
    name: "RegionsCompare",
    component: RegionsCompare,
  },
  {
    path: "/:notFound(.*)",
    name: "error.404",
    component: NotFoundErrorPage,
  },
  {
    path: "/regions/adjara/adjara",
    name: "Adjara",
    component: Adjara,
  },
];

export default routes;
