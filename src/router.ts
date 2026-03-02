import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // TODO: replace main page with vault, replace this with AboutView
        {
            path: '/',
            name: 'KRS',
            component: () => import('@/views/HomeView/HomeView.vue')
        },
        {
            path: '/login',
            name: 'Войти',
            component: () => import('@/views/AuthView/AuthView.vue'),
            props: _ => ({
                login: true
            })
        },
        {
            path: '/register',
            name: 'Регистрация',
            component: () => import('@/views/AuthView/AuthView.vue'),
            props: _ => ({
                login: false
            })
        },
        {
            path: '/note',
            name: 'Создать',
            component: () => import('@/views/NotesListView.vue')
        },
        {
            path: '/vault',
            name: 'Хранилище',
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
