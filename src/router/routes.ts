import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/parts', component: () => import('src/modules/parts/PartsPage.vue') },
      {
        path: '/customizations',
        component: () => import('src/modules/customs/CustomPage.vue'),
        children: [
          { path: '/customizations/attributes', component: () => import('src/modules/customs/CustomAttributesPage.vue') },
          { path: '/customizations/attributeLinks', component: () => import('src/modules/customs/AttributeLinksPage.vue') },
        ],
      },
    ],
  },
  {
    path: '/login',
    component: () => import('src/modules/authentications/LoginPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
