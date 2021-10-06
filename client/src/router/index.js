import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/Login.vue'),
  },
  {
    path: '/journeys',
    name: 'Jornadas',
    component: () => import('../pages/Journeys.vue'),
  },
  {
    path: '/users',
    name: 'Editar Usuários',
    component: () => import('../pages/UserEditor.vue'),
  },
  {
    path: '/phases',
    name: 'Editar Fases',
    component: () => import('../pages/PhaseEditor.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const token = () => localStorage.getItem('token');

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !token()) next({ name: 'Login' });
  else if (to.name === 'Login' && token()) next({ name: 'Home' });
  else next();
});

export default router;
