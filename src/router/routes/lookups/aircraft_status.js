export default [
  {
    path: '/aircraft_status',
    name: 'aircraft_status',
    component: () => import('@/views/lookups/aircraft_status/index'),
    meta: {
      breadcrumb: [
        { to: '/aircraft_status', text: 'Aircraft Status' },
        // { text: 'add_aircrafts', active: true }
      ],
      // permission: 'admin_system'
    },
  },
  {
    path: '/AircraftStatusAdd',
    name: 'AircraftStatusAdd',

    component: () => import('@/views/lookups/aircraft_status/edit'),
    meta: {
      pageTitle: 'Add Aircraft Status',
      breadcrumb: [
        { to: '/aircraft_status', text: 'aircraft_status' },
        { text: 'Add Aircraft Status', active: true }
      ],
    },
  },

  {
    path: '/aircraft_status/edit/:id',
    name: 'aircraft_status-edit',

    component: () => import('@/views/lookups/aircraft_status/edit'),

    meta: {
      pageTitle: 'Edit Aircraft Status',
      breadcrumb: [
        { to: '/aircraft_status', text: 'aircraft_status' },
        { text: 'Edit Aircraft Status', active: true }
      ],
    },
  },
]
  