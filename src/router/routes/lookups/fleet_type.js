export default [
    {
      path: '/fleet_type',
      name: 'fleet_type',
      component: () => import('@/views/lookups/fleet_types/index'),
      meta: {
      
        breadcrumb: [
          { to: '/fleet_type', text: 'Fleet Types' },
          // { text: 'add_fleet_type', active: true }
      ],
      },
    },
    {
      path: '/fleet_types/add',
      name: 'fleet_types-add',
      component: () => import('@/views/lookups/fleet_types/edit'),
      meta: {
        pageTitle: 'Fleet Types',
        breadcrumb: [
          { to: '/fleet_types', text: 'Fleet Types' },
          { text: 'Add Fleet Types', active: true }
      ],
      },
    },
    {
      path: '/fleet_types/edit/:id',
      name: 'fleet_types-edit',

      component: () => import('@/views/lookups/fleet_types/edit'),
      meta: {
          pageTitle: 'Edit Fleet Type',
          breadcrumb: [
              { to: '/fleet_types', text: 'Fleet Type' },
              { text: 'Edit Fleet Type', active: true }
          ],
      },
    },
  ]
  