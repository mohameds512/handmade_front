export default [
    {
      path: '/bills',
      name: 'bills',
      component: () => import('@/views/purchases/bills/index'),
      meta: {
      
        breadcrumb: [
          { to: '/bills', text: 'bills' },
          // { text: 'list', active: true }
      ],
      },
    },
    {
      path: '/bills/create',
      name: 'bills-create',

      component: () => import('@/views/purchases/bills/edit'),
      meta: {
          pageTitle: 'Create bill',
          breadcrumb: [
              { to: '/bills/create', text: 'bills' },
              { text: 'Create bill', active: true }
          ],
      },
    },
    {
      path: '/bills/:id',
      name: 'bills-show',

      component: () => import('@/views/purchases/bills/show'),
          meta: {
          pageTitle: 'bills',
          breadcrumb: [
              { to: '/bills', text: 'bills' },
              { text: 'bills', active: true }
          ],
      },
    },
    
    {
      path: '/bills/edit/:id',
      name: 'bills-edit', 
      component: () => import('@/views/purchases/bills/edit'),
          meta: {
          pageTitle: 'Edit bill',
          breadcrumb: [
              { to: '/bill', text: 'bill' },
              { text: 'Edit bill', active: true }
          ],
      },
    },
    {
      path: '/payments',
      name: 'payments',
      component: () => import('@/views/purchases/payments/index'),
      meta: {
      
        breadcrumb: [
          { to: '/payments', text: 'payments' },
          // { text: 'payments', active: true }
      ],
      },
    },
    {
      path: '/payments/:id',
      name: 'payments-show',

      component: () => import('@/views/purchases/payments/show'),
          meta: {
          pageTitle: 'payments',
          breadcrumb: [
              { to: '/payments', text: 'payments' },
              { text: 'payments', active: true }
          ],
      },
    },
    {
      path: '/payments/create',
      name: 'payments-create',

      component: () => import('@/views/purchases/payments/edit.vue'),
      meta: {
          pageTitle: 'Create payment',
          breadcrumb: [
              { to: '/payments/create', text: 'payments' },
              { text: 'Create payment', active: true }
          ],
      },
    },
    {
      path: '/payments/edit/:id',
      name: 'payments-edit',

      component: () => import('@/views/purchases/payments/edit.vue'),
          meta: {
          pageTitle: 'Edit payment',
          breadcrumb: [
              { to: '/payments', text: 'payments' },
              { text: 'Edit payment', active: true }
          ],
      },
    },

    {
      path: '/vendors',
      name: 'vendors',
      component: () => import('@/views/purchases/vendors/index'),
      meta: {
      
        breadcrumb: [
          { to: '/vendors', text: 'vendors' },
          // { text: 'vendors', active: true }
      ],
      },
    },
    {
      path: '/vendors/create',
      name: 'vendors-create',

      component: () => import('@/views/purchases/vendors/edit.vue'),
      meta: {
          pageTitle: 'Create vendor',
          breadcrumb: [
              { to: '/vendors/create', text: 'vendors' },
              { text: 'Create vendor', active: true }
          ],
      },
    },
    {
      path: '/vendors/:id',
      name: 'vendors-show',

      component: () => import('@/views/purchases/vendors/show'),
          meta: {
          pageTitle: 'vendor',
          breadcrumb: [
              { to: '/vendor', text: 'vendor' },
              { text: 'vendor', active: true }
          ],
      },
    },
   
    {
      path: '/vendors/edit/:id',
      name: 'vendors-edit',

      component: () => import('@/views/purchases/vendors/edit.vue'),
          meta: {
          pageTitle: 'Edit vendor',
          breadcrumb: [
              { to: '/vendors', text: 'vendors' },
              { text: 'Edit vendor', active: true }
          ],
      },
    },

  ]
  