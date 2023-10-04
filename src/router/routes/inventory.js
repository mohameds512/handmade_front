export default [
  {
    path: '/Orders',
    name: 'Orders',
    component: () => import('@/views/inv/Orders/index'),
    meta: {
    
      breadcrumb: [
        { to: '/Orders', text: 'Orders' },
    ],
    },
  },
  // {
  //   path: '/Orders/:id',
  //   name: 'Orders-show',

  //   component: () => import('@/views/inv/Orders/show'),
  //       meta: {
  //       pageTitle: 'warehouse',
  //       breadcrumb: [
  //           { to: '/Orders/', text: 'Orders' },
  //           { text: 'warehouse', active: true }
  //       ],
  //   },
  // },
  // {
  //   path: '/Orders/create',
  //   name: 'warehouse-create',

  //   component: () => import('@/views/inv/Orders/edit'),
  //   meta: {
  //       pageTitle: 'Create warehouse',
  //       breadcrumb: [
  //           { to: '/Orders/create', text: 'Orders' },
  //           { text: 'Create warehouse', active: true }
  //       ],
  //   },
  // },
  {
    path: '/Orders/edit/:id',
    name: 'Orders-edit',

    component: () => import('@/views/inv/Orders/edit'),
        meta: {
        pageTitle: 'Edit Orders',
        breadcrumb: [
            { to: '/Orders/edit', text: 'Orders' },
            { text: 'Edit Orders', active: true }
        ],
    }, 
  },


  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/inv/products/index'),
    meta: {
    
      breadcrumb: [
        { to: '/products', text: 'products' },
    ],
    },
  },
  {
    path: '/products/archived',
    name: 'archived',
    component: () => import('@/views/inv/products/archive'),
    meta: {
    
      breadcrumb: [
        { to: 'archived', text: 'products' },
        { text: 'archived', active: false }

    ],
    },
  },
  {
    path: '/products/:id',
    name: 'products-show',

    component: () => import('@/views/inv/products/show'),
        meta: {
        pageTitle: 'products',
        breadcrumb: [
            { to: '/products/', text: 'products' },
            { text: 'products', active: true }
        ],
    },
  },
  {
    path: '/products/create',
    name: 'products-create',

    component: () => import('@/views/inv/products/edit'),
    meta: {
        pageTitle: 'Create product',
        breadcrumb: [
            { to: '/products/create', text: 'products' },
            { text: 'Create product', active: true }
        ], 
    },
  },
  {
    path: '/products/edit/:id',
    name: 'products-edit',

    component: () => import('@/views/inv/products/edit'),
        meta: {
        pageTitle: 'Edit product',
        breadcrumb: [
            { to: '/products/edit', text: 'products' },
            { text: 'Edit product', active: true }
        ],
    },
  },
]
