export default [
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/pages/error/Error404.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
    },
  },
  // {
  //   path: '/overview',
  //   name: 'dashboard',
  //   component: () => import('@/views/dashboard/index'),
  //   meta: {
  //     // requiresAuth: true,
  //     dashboard: true,
  //     // permission: 'admin_system'
  //   },
  // },
  {
    path: '/reg/:invitation_token',
    name: 'checkInvitation',
    component: () => import('@/views/pages/authentication/Register'),
    meta: {
      layout: 'full',
      // resource: 'Auth',
      redirectIfLoggedIn: true,
      // public: true,
    },
  },
  {
    path: '/login',
    name: 'auth-login',
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
      public: true,
    },
  },
  {
    path: '/forgot-password',
    name: 'auth-forgot-password',
    component: () => import('@/views/pages/authentication/ForgotPassword.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
      public: true,
    },
  },
  {
    path: '/pages/authentication/reset-password-v1',
    name: 'auth-reset-password-v1',
    component: () => import('@/views/pages/authentication/ResetPassword-v1.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/pages/miscellaneous/coming-soon',
    name: 'misc-error-connections',
    component: () => import('@/views/pages/miscellaneous/ComingSoon.vue'),
    meta: {
      layout: 'full',
    },
  },
  {
    path: '/pages/miscellaneous/not-authorized',
    name: 'misc-not-authorized',
    component: () => import('@/views/pages/miscellaneous/NotAuthorized.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      public: true,
    },
  },
  {
    path: '/pages/miscellaneous/under-maintenance',
    name: 'misc-under-maintenance',
    component: () => import('@/views/pages/miscellaneous/UnderMaintenance.vue'),
    meta: {
      layout: 'full',
      public: true,
    },
  },
  {
    path: '/pages/miscellaneous/error',
    name: 'misc-error',
    component: () => import('@/views/pages/miscellaneous/Error.vue'),
    meta: {
      layout: 'full',
      public: true,
    },
  },
]
