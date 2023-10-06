export default [
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/category/index'),
      meta: {
        requiresAuth: true,
        breadcrumb: [
          { to: '/categories', text: 'categories' },
          // { text: 'add_aircrafts', active: true }
      ],
      }, 
    },
  ]
  