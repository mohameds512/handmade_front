export default [
  {
    path: '/overview',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index'),
     meta: {
       // requiresAuth: true,
       dashboard: true,
        // permission: 'admin_system'
     },
  },
  {
    path: '/help',
    name: 'helpPage',
    component: () => import('@/views/dashboard/help'),
     meta: {
       // requiresAuth: true,
       dashboard: true,
        // permission: 'admin_system'
     }, 
  },
  {
    path: '/settings',
    name: 'settingPage', 
    component: () => import('@/views/dashboard/settings'),
    meta: {
    pageTitle: 'Setting',
    breadcrumb: [
        { to: '/settings/', text: 'settings' },
    ],
},
    // component: () => import('@/views/dashboard/settings'),
    //  meta: {
    //    // requiresAuth: true,
    //    dashboard: true,
    //     // permission: 'admin_system'
    //  },
  },
  
  
]
