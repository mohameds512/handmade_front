import Vue from "vue";
import VueRouter from "vue-router";
import Cookies from "js-cookie";

let auth = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null;

// Routes
import { canNavigate } from "@/libs/acl/routeProtection";
import {
  isUserLoggedIn,
  getUserData,
  getHomeRouteForLoggedInUser,
} from "@/auth/utils";
import dashboard from "./routes/dashboard";
import pages from "./routes/pages";
import administration from "./routes/administration";
import ecb_forms from "./routes/ecb-forms";
import hr from "./routes/hr";
import chat from "./routes/chats";
import accounting from "./routes/accounting";
import crm from "./routes/crm";
import inventory from "./routes/inventory";
import category from "./routes/category";
import purchases from "./routes/purchases";



Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    { path: "/", redirect: { path: "overview" } },
    ...dashboard,
    ...pages,
    ...administration,
    ...hr,
    ...chat,
    ...accounting,
    ...inventory,
    ...category,
    ...crm,
    ...purchases,
    ...ecb_forms,
    {
      path: "*",
      redirect: "error-404",
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = isUserLoggedIn();
  if (!isLoggedIn && !to.meta.redirectIfLoggedIn) {
    return next({ name: "auth-login" });
  }

  console.log(to);
  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    console.log("77777" + isLoggedIn);
    if (!isLoggedIn) {
      return next({ name: "auth-login" });
    }
    return next({ name: "misc-not-authorized" });
  } else {
    return next();
  }
});

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach((to) => {
  const isLoggedIn = isUserLoggedIn();
  if (to.name == "auth-login" && isLoggedIn) {
    router.push({ name: "dashboard" });
  }
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
