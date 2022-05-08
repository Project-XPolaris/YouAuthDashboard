export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        name: 'oauth',
        path: '/user/oauth',
        component: './user/AppLogin',
      },
      {
        name: 'redirect',
        path: '/user/oauth/redirect',
        component: './user/LoginRedirect',
      },
      {
        name: 'register',
        path: '/user/register',
        component: './user/Register',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/app',
    name: 'App',
    icon: 'AppstoreFilled',
    routes: [
      {
        name: 'List',
        path: '/app/list',
        icon: 'ProjectOutlined',
        component: './app/List',
      },
    ],
  },
  {
    path: '/my',
    name: 'My',
    icon: 'UserOutlined',
    routes: [
      {
        name: 'Tokens',
        icon: 'AuditOutlined',
        path: '/my/tokens',
        component: './my/tokens',
      },
      {
        name: 'Change password',
        icon: 'AuditOutlined',
        path: '/my/password',
        component: './my/password',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
