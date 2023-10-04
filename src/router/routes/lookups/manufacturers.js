export default [
    {
      path: '/manufacturers',
      name: 'manufacturers',
      component: () => import('@/views/lookups/manufacturers/index'),
      meta: {
        breadcrumb: [
          { to: '/manufacturers', text: 'Manufacturers' },
          // { text: 'add_aircrafts', active: true }
      ],
        // permission: 'admin_system'
      },
    },
    {
      path: '/manufacturers/add',
      name: 'manufacturers-add',
      component: () => import('@/views/lookups/manufacturers/edit'),
      meta: {
        pageTitle: 'Add Manufacturers',
        breadcrumb: [
          { to: '/manufacturers', text: 'Manufacturers' },
          { text: 'Add Manufacturers', active: true }
      ],
      },
    },
    {
      path: '/manufacturers/edit/:id',
      name: 'manufacturers-edit',

      component: () => import('@/views/lookups/manufacturers/edit'),
      meta: {
          pageTitle: 'Edit Manufacturers',
          breadcrumb: [
              { to: '/manufacturers', text: 'Manuacturers' },
              { text: 'Edit Manufacturers', active: true }
          ],
      },
    },
  ]
  