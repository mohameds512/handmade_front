export default [
    {
      path: '/clients',
      name: 'clients',
      component: () => import('@/views/crm/clients/index'),
      meta: {
      
        breadcrumb: [
          { to: '/clients', text: 'Cleints' },
      ],
      },
    },
    {
      path: '/clients/create',
      name: 'clients-create',

      component: () => import('@/views/crm/clients/edit'),
      meta: {
          pageTitle: 'Create Client',
          breadcrumb: [
              { to: '/clients/create', text: 'Cleints' },
              { text: 'Create Client', active: true }
          ],
      },
    },
    {
      path: '/clients/edit/:id',
      name: 'clients-edit',

      component: () => import('@/views/crm/clients/edit'),
          meta: {
          pageTitle: 'Edit client',
          breadcrumb: [
              { to: '/clients', text: 'clients' },
              { text: 'Edit Client', active: true }
          ],
      },
    },
  ]
  