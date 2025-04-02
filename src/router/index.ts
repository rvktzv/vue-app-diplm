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
    {
      path: '/diplomas',
      name: 'diplomas',
      component: DiplomaListView
    },
    {
      path: '/diploma/:id',
      name: 'diploma-detail',
      component: DiplomaDetailView
    }
  ]
})

export default router
