export default [
  {
    path: "/add-project/:id?",
    name: "Add Project",
    component: () => import("@/views/pages/ECB/index"),
    // meta: { pageTitle: "users", breadcrumb: [{ text: "users" }] },
  },


  {
    path: "/projects",
    name: "projects",
    component: () => import("@/views/pages/ECB/project_view"),
    // meta: { pageTitle: "users", breadcrumb: [{ text: "users" }] },
  },

]
