export default [
    {
      path: '/operators',
      name: 'operators',
      component: () => import('@/views/lookups/operators/index'),
      meta: {
        breadcrumb: [
          { to: '/operators', text: 'Operators' },
          // { text: 'add_aircrafts', active: true }
      ],
        // permission: 'admin_system'
      },
    },
    {
      path: '/operators/add',
      name: 'operators-add',
      component: () => import('@/views/lookups/operators/edit'),
      meta: {
        pageTitle: 'Add Operators',
        breadcrumb: [
          { to: '/operators', text: 'Operators' },
          { text: 'Add Operators', active: true }
      ],
      },
    },
    {
      path: '/operators/edit/:id',
      name: 'operators-edit',

      component: () => import('@/views/lookups/operators/edit'),
      meta: {
          pageTitle: 'Edit Operator',
          breadcrumb: [
              { to: '/operators', text: 'Operators' },
              { text: 'Edit Operators', active: true }
          ],
      },
    },
  ]
  