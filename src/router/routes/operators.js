export default [
    {
      path: '/operators',
      name: 'operators',
      component: () => import('@/views/operators'),
      meta: {
         requiresAuth: true,
        dashboard: true,
        // permission: 'admin_system'
      },
    },
  ]
  