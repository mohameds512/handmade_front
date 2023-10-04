export default [
    {
      path: '/invoices',
      name: 'invoices',
      component: () => import('@/views/aircraft/index'),
      meta: {
        requiresAuth: true,
        breadcrumb: [
          { to: '/invoices', text: 'invoices' },
          // { text: 'add_aircrafts', active: true }
      ],
      },
    },
  ]
  