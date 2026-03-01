import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'KRS',
      component: () => import('@/views/HomeView/HomeView.vue')
    },
    {
      path: '/note',
      name: 'Создать',
      component: () => import('@/views/NotesListView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('@/views/Page404.vue')
    }
  ],
})

export default router
