export default [{
        path: '/settings/logs',
        name: 'logs',
        component: () =>
            import ('@/views/administration/logs/index'),
        meta: { pageTitle: 'Logs', breadcrumb: [{ text: 'Logs', active: true }] },
    },
    {
        path: '/settings/logs/view/:id',
        name: 'log',
        component: () =>
            import ('@/views/administration/logs/show'),
        meta: {
            pageTitle: 'Manage',
            breadcrumb: [
                { text: 'Logs', to: '/settings/logs' },
                { text: 'Log', active: true },
            ],
        },
    },
    {
        path: '/management',
        name: 'management',
        component: () =>
            import ('@/views/administration/management/management'),
        meta: { pageTitle: 'Settings', breadcrumb: [{ text: 'Management', active: true }] },
    },
    {
        path: '/send_invit',
        name: 'sendInvitation',
        component: () => import('@/views/administration/invitation/sendInvitation.vue'),
         meta: {
           // requiresAuth: true,
           dashboard: true,
            // permission: 'admin_system'
         },
      },
      {
        path: '/regInvit',
        name: 'inviRegister',
        component: () => import('@/views/administration/invitation/regWinvit'),
         meta: {
           // requiresAuth: true,
           dashboard: true,
            // permission: 'admin_system'
         },
      },

]