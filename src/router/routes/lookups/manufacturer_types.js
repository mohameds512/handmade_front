export default [
    {
      path: '/manufacturer_types',
      name: 'manufacturer_types',
      component: () => import('@/views/lookups/manufacturer_types/index'),
      meta: {
        breadcrumb: [
          { to: '/manufacturer_types', text: 'Manufacturer Types' },
          // { text: 'add_aircrafts', active: true }
      ],
        // permission: 'admin_system'
      },
    },

    {
      path: '/ManufacturerTypesAdd',
      name: 'ManufacturerTypesAdd',
 
      component: () => import('@/views/lookups/manufacturer_types/edit'),
      meta: {
          pageTitle: 'Add Manufacturer Type',
          breadcrumb: [
              { to: '/manufacturer_types', text: 'manufacturer_types' },
              { text: 'Add Manufacturer Types', active: true }
          ],
      },
  },

  {
    path: '/manufacturer_types/edit/:id',
    name: 'manufacturer_types-edit',
   
      component: () => import('@/views/lookups/manufacturer_types/edit'),
  
    meta: {
        pageTitle: 'Edit Manufacturer Types',
        breadcrumb: [
            { to: '/manufacturer_types', text: 'manufacturer_types' },
            { text: 'Edit Manufacturer Types', active: true }
        ],
    },
},



  ]
  