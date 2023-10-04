export default [
    {
      path: '/delay_codes',
      name: 'delay_codes',
      component: () => import('@/views/lookups/delay_codes/index'),
      meta: {
        breadcrumb: [
          { to: '/delay_codes', text: 'Delay Codes' },
          // { text: 'add_aircrafts', active: true }
      ],
        // permission: 'admin_system'
      },
    },
    {
      path: '/DelayCodesAdd',
      name: 'DelayCodesAdd',
 
      component: () => import('@/views/lookups/delay_codes/edit'),
      meta: {
          pageTitle: 'Add Delay Codes',
          breadcrumb: [
              { to: '/delay_codes', text: 'delay_codes' },
              { text: 'Add Delay Codes', active: true }
          ],
      },
  },

  {
    path: '/delay_codes/edit/:id',
    name: 'delay_codes-edit',
   
      component: () => import('@/views/lookups/delay_codes/edit'),
  
    meta: {
        pageTitle: 'Edit Delay Codes',
        breadcrumb: [
            { to: '/delay_codes', text: 'delay_codes' },
            { text: 'Edit Delay Codes', active: true }
        ],
    },
},
  ]
