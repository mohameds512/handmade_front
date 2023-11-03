export default [
  {
    path: "/users",
    name: "users",
    component: () => import("@/views/hr/users/index"),
    meta: { pageTitle: "users", breadcrumb: [{ text: "users" }] },
  },
  {
    path: "/users/access/:id",
    name: "user-access",
    permission: "user_access_users",
    component: () => import("@/views/hr/users/user_access"),
    meta: {
      public: true,
      pageTitle: "access",
      breadcrumb: [
        { to: "/users", text: "Users" },
        { text: "User Access", active: true },
      ],
    },
  },
  {
    path: '/users/add',
    name: "user-add",
    component: () => import("@/views/hr/users/edit"),
    meta: {
      pageTitle: "Add User",
      breadcrumb: [ 
        { to: "/users", text: "users" },
        { text: "Add User", active: true },
      ],
    },
  },
  { 
    path: "/users/:id",  
    name: "user-show",
    permission: "access_users",
    component: () => import("@/views/hr/users/show"),
    meta: {
      public: true,
      pageTitle: "user",
      breadcrumb: [
        { to: "/users", text: "Users" },
        { text: "user", active: true },
      ],
    },
  },
  {
    path: "/users/edit/:id",
    name: "user-edit",
    permission: "access_users",
    component: () => import("@/views/hr/users/edit"),
    meta: {
      pageTitle: "Edit User",
      breadcrumb: [
        { to: "/users", text: "users" },
        { text: "Edit User", active: true },
      ],
    },
  },

  {
    path: "/settings/roles",
    name: "roles",
    component: () => import("@/views/hr/roles/index"),
    meta: { pageTitle: "Roles", breadcrumb: [{ text: "Roles" }] },
  },
  {
    path: "/settings/user/role/:id",
    name: "user-role",
    component: () => import("@/views/hr/roles/show"),
    meta: {
      pageTitle: "Roles",
      breadcrumb: [{ to: "/users", text: "Users" }, { text: "User Role" }],
    },
  },
  {
    path: "/employees",
    name: "employees",
    component: () => import("@/views/hr/employees/index"),
    meta: { pageTitle: "employees", breadcrumb: [{ text: "employees" }] },
  },
  {
    path: '/employees/add',
    name: "employee-add",
    component: () => import("@/views/hr/employees/edit"),
    meta: {
      pageTitle: "Add employee",
      breadcrumb: [
        { to: "/employees", text: "employees" },
        { text: "Add employee", active: true },
      ],
    },
  },
  {
    path: "/employees/edit/:id",
    name: "employee-edit",
    // permission: "access_users",
    component: () => import("@/views/hr/employees/edit"),
    meta: {
      pageTitle: "Edit Employee",
      breadcrumb: [
        { to: "/employees", text: "employees" },
        { text: "Edit Employees", active: true },
      ],
    },
  },

  {
    path: '/employees/:id',
    name: "employee-show",
    component: () => import("@/views/hr/employees/show"),
    meta: {
      pageTitle: "Show employee",
      breadcrumb: [
        { to: "/employees", text: "employees" },
        { text: "Show employee", active: true },
      ],
    },
  },
  // {
  //     path: '/profile',
  //     name: 'user-profile',
  //     component: () => import('@/views/profile/show'),
  //     meta: {
  //         public: true,
  //         pageTitle: 'profile',
  //         breadcrumb: [{ text: 'profile', active: true }],
  //     },
  // },
];
