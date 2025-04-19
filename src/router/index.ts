import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DiplomaListView from '@/views/DiplomaListView.vue'
import DiplomaDetailView from '@/views/DiplomaDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
   /* {
      path: '/diplomas',
      name: 'diplomas',
      component: DiplomaListView
    },*/
    {
      path: '/diplomas',
      name: 'Diplomas',
      component: () => import('../views/DiplomaListView.vue')
    },
    {
      path: '/diplomas/:id(\\d+-[a-z0-9-]+)', // Более точное regex-выражение
      name: 'diploma-detail',
      component: () => import('@/views/DiplomaDetailView.vue'),
      //props: (route) => ({ id: route.params.id }) // Передаем id как prop
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

export default router
