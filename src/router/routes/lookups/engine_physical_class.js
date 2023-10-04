export default [
    {
      path: '/engine_physical_class',
      name: 'engine_physical_class',
      component: () => import('@/views/lookups/engine_physical_class/index'),
      meta: {
        breadcrumb: [
          { to: '/engine_physical_class', text: 'Engine Physical Class' },
          // { text: 'add_aircrafts', active: true }
      ],
        // permission: 'admin_system'
      },
    },

    {
      path: '/EnginePhysicalClassAdd',
      name: 'EnginePhysicalClassAdd',
 
      component: () => import('@/views/lookups/engine_physical_class/edit'),
      meta: {
          pageTitle: 'Add Engine Physical Class',
          breadcrumb: [
              { to: '/engine_physical_class', text: 'engine_physical_class' },
              { text: 'Add Engine Physical Class', active: true }
          ],
      },
  },

  {
    path: '/engine_physical_class/edit/:id',
    name: 'engine_physical_class-edit',
   
      component: () => import('@/views/lookups/engine_physical_class/edit'),
  
    meta: {
        pageTitle: 'Edit Engine Physical Class',
        breadcrumb: [
            { to: '/engine_physical_class', text: 'engine_physical_class' },
            { text: 'Edit Engine Physical Class', active: true }
        ],
    },
},
  ]
  