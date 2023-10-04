export default [
  {
    path: "/accounts",
    name: "Accounts",
    component: () => import("@/views/accounting/accounts/index"),
    meta: {
      pageTitle: "Accounting",
      breadcrumb: [
        { to: "Accounting", text: "Accounting" },
        { text: "accounts", active: true },
      ],
    },
  },
  {
    path: "/accounts/create",
    name: "accounts-create",
    component: () => import("@/views/accounting/accounts/create"),
    meta: {
      pageTitle: "Create Account",
      breadcrumb: [
        { to: "/accounting", text: "Accounting" },
        { text: "Create Account", active: true },
      ],
    },
  },
  {
    path: "/entries",
    name: "entries",
    component: () => import("@/views/accounting/entries/index"),
    meta: {
      pageTitle: "Journal Entries",
      breadcrumb: [
        {
          to: "/entries",
          text: "Entries",
        },
      ],
     
    },
  },
  {
      path: '/entries/create',
      name: "entry-create",
      component: () => import('@/views/accounting/entries/create'),
      meta: {
        pageTitle: "Create Entry",
        breadcrumb: [
          { to: "/entries", text: "entries" },
          { text: "Create Entry", active: true },
        ],
      },
    },
];
