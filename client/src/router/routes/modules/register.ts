import { AppRouteRecordRaw } from '../types';

const REGISTER: AppRouteRecordRaw = {
  path: '/register',
  name: 'register',
  component: () => import('@/views/register/index.vue'),
  meta: {
    requiresAuth: false,
    roles: ['*'],
  },
};

export default REGISTER;