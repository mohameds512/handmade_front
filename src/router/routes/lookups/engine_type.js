export default [
    {
      path: '/engine_types',
      name: 'engine_type',
      component: () => import('@/views/lookups/engine_type/index'),
      meta: {
      
        breadcrumb: [
          { to: '/engine_types', text: 'Engine Types' },
          // { text: 'add_engine_types', active: true }
      ],
      },
    },
    {
      path: '/engine_types/add',
      name: 'engine_types-add',
      component: () => import('@/views/lookups/engine_type/edit'),
      meta: {
        pageTitle: 'Add Engine Type',
        breadcrumb: [
          { to: '/engine_types', text: 'Engine Types' },
          { text: 'Add Engine Type', active: true }
      ],
      },
    },
    {
      path: '/engine_types/edit/:id',
      name: 'engine_types-edit',

      component: () => import('@/views/lookups/engine_type/edit'),
      meta: {
          pageTitle: 'Edit Engine Type',
          breadcrumb: [
              { to: '/engine_types', text: 'Engine Type' },
              { text: 'Edit Engine Type', active: true }
          ],
      },
    },
  ]
  