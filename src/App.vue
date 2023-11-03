<template>
  <div
    id="app"
    class="h-100 main_app_container_for_elements"
    :class="[skinClasses]"
  >
    <!-- style="overflow: scroll !important" -->
    <component :is="layout">
      <router-view />
    </component>

    <scroll-to-top v-if="enableScrollToTop" />
  </div>
</template>

<script>
import ScrollToTop from "@core/components/scroll-to-top/ScrollToTop.vue";

// This will be populated in `beforeCreate` hook
import { $themeColors, $themeBreakpoints, $themeConfig } from "@themeConfig";
import { provideToast } from "vue-toastification/composition";
import { watch } from "@vue/composition-api";
import useAppConfig from "@core/app-config/useAppConfig";

import { useWindowSize, useCssVar } from "@vueuse/core";

import store from "@/store";


import { initializeApp } from "firebase/app";
import { getMessaging, getToken ,onMessage} from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAn1-7_MRnT11EDG0cwQrRqsudC19EeWQM",
  authDomain: "antika-3c76f.firebaseapp.com",
  projectId: "antika-3c76f",
  storageBucket: "antika-3c76f.appspot.com",
  messagingSenderId: "943515890689",
  appId: "1:943515890689:web:cfb107c678d3f908c4bc00"
};

const firebaseApp = initializeApp(firebaseConfig);

const analytics = getAnalytics(firebaseApp);

const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  console.log('Message messaging messaging. ', messaging);

  
  const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/logo_one.png'
    };
  console.log("notifTitllr " , notificationTitle);
});
if (Notification.permission !== 'granted') {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      getToken(messaging, { vapidKey: 'BKIkiUKC4YpGBHof15RhZFuzUlJ1WNZqJ6iKqhUUaOAaz5Kbb4ax0cfADOWzgOxBUH99Qwb493wIbxdofX49Bvk' })
        .then((currentToken) => {
          
          store.commit('app/SET_FCM_USER_TOKEN', currentToken)
          

        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);

        });
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  });
}else{
  getToken(messaging, { vapidKey: 'BKIkiUKC4YpGBHof15RhZFuzUlJ1WNZqJ6iKqhUUaOAaz5Kbb4ax0cfADOWzgOxBUH99Qwb493wIbxdofX49Bvk' })
        .then((currentToken) => {
          
          store.commit('app/SET_FCM_USER_TOKEN', currentToken); 
          console.log("token id 11 : ",currentToken);
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
}

const LayoutVertical = () => import("@/layouts/vertical/LayoutVertical.vue");
const LayoutHorizontal = () =>
  import("@/layouts/horizontal/LayoutHorizontal.vue");
const LayoutFull = () => import("@/layouts/full/LayoutFull.vue");

export default {
  components: {
    // Layouts
    LayoutHorizontal,
    LayoutVertical,
    LayoutFull,

    ScrollToTop,
  },

  // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
  // Currently, router.currentRoute is not reactive and doesn't trigger any change
  computed: {
    layout() {
      if (this.$route.meta.layout === "full") return "layout-full";
      if (this.authUser().id) {
        return `layout-${this.contentLayoutType}`;
      }
    },
    contentLayoutType() {
      return this.$store.state.appConfig.layout.type;
    },
  },
  watch: {
    $route(from, to) {
      // if (this.authUser().id) {
      //   this.$store.dispatch('roles/getAuthUserRolesPermissions', this.authUser().id);
      // }
      // this.$store.commit('app/UPDATE_PAGE_DETAILS',null)
    },
  },
  beforeCreate() {
    // Set colors in theme
    const colors = [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "danger",
      "light",
      "dark",
    ];

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(
        `--${colors[i]}`,
        document.documentElement
      ).value.trim();
    }

    // Set Theme Breakpoints
    const breakpoints = ["xs", "sm", "md", "lg", "xl"];

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(
        useCssVar(
          `--breakpoint-${breakpoints[i]}`,
          document.documentElement
        ).value.slice(0, -2)
      );
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout ;
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  },
  setup() {
    const { skin, skinClasses } = useAppConfig();
    const { enableScrollToTop } = $themeConfig.layout;

    // If skin is dark when initialized => Add class to body
    if (skin.value === "dark") document.body.classList.add("dark-layout");

    // Provide toast for Composition API usage
    // This for those apps/components which uses composition API
    // Demos will still use Options API for ease
    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: "Vue-Toastification__fade",
    });

    // Set Window Width in store
    store.commit("app/UPDATE_WINDOW_WIDTH", window.innerWidth);
    const { width: windowWidth } = useWindowSize();
    watch(windowWidth, (val) => {
      store.commit("app/UPDATE_WINDOW_WIDTH", val);
    });

    return {
      skinClasses,
      enableScrollToTop,
    };
  },
};
</script>

<style lang="scss">
html[dir="rtl"]
  .vue-form-wizard
  .wizard-card-footer
  .wizard-footer-right
  .wizard-btn::after {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
  display: inline-block;
}
.no_hover {
  &.btn-flat-primary:hover:not(.disabled):not(:disabled) {
    background-color: transparent !important;
    color: #746d69;
  }
  &.btn-flat-primary {
    color: #746d69;
  }
}
.vue-form-wizard {
  box-shadow: none !important;
}
.vue-form-wizard
  .wizard-navigation
  .wizard-nav
  li.active
  a
  .wizard-icon-circle {
  .wizard-icon {
    color: #dae1e7 !important;
  }
}
.wizard-nav.wizard-nav-pills li {
  padding-bottom: 0.5rem !important;
}
.vue-form-wizard .wizard-navigation .wizard-nav li a .wizard-icon-circle {
  box-shadow: none !important;
  margin-right: 0.2rem !important;
  width: auto !important;
  background-color: transparent !important;
  height: auto;
  .wizard-icon {
    color: #746d69 !important;
  }
  .wizard-icon-container {
    border-radius: 0px;
  }
}
.wizard-navigation .wizard-nav.wizard-nav-pills li a {
  background-color: transparent !important;
  border-color: #ededed #ededed #dae1e7;
  border-radius: 0.2rem;
  padding: 0.786rem 1rem;
  .wizard-icon-circle {
    // display: none;
  }
  span {
    font-weight: normal !important;
    color: #746d69;
  }
}
.wizard-navigation .wizard-nav.wizard-nav-pills li.active a {
  background-color: #054978 !important;
  border-color: #054978 !important;
  border-radius: 0.2rem;
  padding: 0.786rem 1rem;
  .wizard-icon-circle {
    // display: none;
  }
  span {
    color: #fff !important;
    font-weight: normal !important;
  }
}
[dir="ltr"] .vertical.wizard-vertical.vue-form-wizard .wizard-card-footer {
  margin-left: 259px !important;
}
[dir="rtl"] .vertical.wizard-vertical.vue-form-wizard .wizard-card-footer {
  margin-right: 258px !important;
}
.vertical.wizard-vertical.vue-form-wizard .wizard-navigation .wizard-nav {
  min-width: 260px !important;
}
.custom_drop {
  .dropdown-menu {
    width: 100%;
    top: 140px !important;
  }
  .dropdown {
    .dropdown-toggle {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
@media screen and (max-width: 980px) {
  .nav.nav-tabs {
    display: -webkit-inline-box;
    width: 100%;
    flex-wrap: nowrap;
    overflow: scroll;
  }
}
@media screen and (max-width: 800px) {
  .custom_slider {
    display: none;
  }
}
@media screen and (max-width: 680px) {
  .mt-sm-2 {
    margin-top: 4px;
  }
}
.custom_search {
  width: 50%;
}
.custom_link:hover {
  text-decoration: underline;
}
.custom_hover:hover {
  color: #000;
}
[dir="ltr"] .right_left {
  direction: rtl !important;
}
.left_right {
  direction: ltr !important;
}
.left_right > * {
  direction: ltr !important;
}
.custom_invalid {
  .input-group-text,
  .vs1__combobox,
  .vs__dropdown-toggle {
    border-color: #ea5455;
  }
}
.top_100 {
  .dropdown-menu {
    top: 100px !important;
  }
}
.disabled_all {
  pointer-events: none;
  opacity: 0.2;
  cursor: not-allowed;
}
html {
  scroll-behavior: smooth;
}
.card {
  box-shadow: none !important;
}
.header-navbar.navbar-shadow {
  box-shadow: none !important;
}
.gap {
  gap: 0.5rem;
}
[dir="ltr"]
  .table.b-table.table-sm
  > thead
  > tr
  > [aria-sort]:not(.b-table-sort-icon-left),
[dir="ltr"]
  .table.b-table
  > tfoot
  > tr
  > [aria-sort]:not(.b-table-sort-icon-left) {
  background-position: left calc(1rem / 4) center !important;
}
[dir="ltr"]
  .table.b-table
  > thead
  > tr
  > [aria-sort]:not(.b-table-sort-icon-left),
[dir="ltr"]
  .table.b-table
  > tfoot
  > tr
  > [aria-sort]:not(.b-table-sort-icon-left) {
  background-position: left calc(2.5rem / 3) center !important;
}
[dir="rtl"]
  .table.b-table
  > thead
  > tr
  > [aria-sort]:not(.b-table-sort-icon-left),
[dir="ltr"]
  .table.b-table
  > tfoot
  > tr
  > [aria-sort]:not(.b-table-sort-icon-left) {
  background-position: right calc(2.5rem / 2) center !important;
}
.w-80 {
  width: 250px;
}
.mask_gradient_left {
  -webkit-mask-image: linear-gradient(to left, black 70%, transparent 120%);
  mask-image: linear-gradient(to left, black 70%, transparent 120%);
}
.mask_gradient_right {
  -webkit-mask-image: linear-gradient(to right, black 73%, transparent 100%);
  mask-image: linear-gradient(to right, black 73%, transparent 100%);
}
.nav-pills .nav-link,
.nav-tabs .nav-link {
  justify-content: start !important;
}
.nav-item .nav-link.active {
  border-color: #054978 !important;
  background-color: #054978 !important;
  box-shadow: none;
  text-align: start;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.786rem 1.5rem;
  border-radius: 0.2rem;
  margin: 0;
  color: #fff !important;
  font-weight: 500;
  display: block;
  width: 100%;
  display: inline-block;
  font-weight: 400;
  color: #746d69;
  vertical-align: middle;
  user-select: none;
  font-size: 1rem;
  line-height: 1;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, background 0s,
    border 0s;
  text-transform: none;
  font-family: inherit;
}
.nav-hidden ul li a::after {
  display: none;
}
.cover {
  background-size: cover;
}
.pointer {
  cursor: pointer !important;
}
.mr-05 {
  margin-right: 5px;
}
.mx-05 {
  margin-right: 5px;
  margin-left: 5px;
}
.customWidth {
  width: 100px;
  margin: 0px;
  text-align: end;
}
.customDetailsWidth {
  width: 150px;
  margin: 0px;
  text-align: end;
}
.customWidth div,
.customDetailsWidth div {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding-inline-end: 9px;
}
.customAction {
  text-align: end;
}
.customAction div {
  margin: 0px 1rem;
}
#myHeader {
  position: fixed;
  z-index: 999;
  margin-top: -15px;
  min-height: auto !important;
}
.sticky {
  background: #fff;
  margin-top: -35px !important;
}
.main-menu.menu-light .navigation > li ul li > a {
  padding-left: 10px !important;
}
// Style App For Hidden Scroll
.main_app_container_for_elements {
  overflow: scroll;
  @media (min-width: 320px) and (max-width: 991px) {
    overflow-y: scroll;
    overflow-x: hidden;
  }
}
</style>
