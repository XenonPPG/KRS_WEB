import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'KRS',
      component: () => import('@/components/views/HomeView/HomeView.vue')
    },
    {
      path: '/note',
      name: 'Создать',
      component: () => import('@/components/views/NotesListView.vue')
    },
  ],
})

export default router
