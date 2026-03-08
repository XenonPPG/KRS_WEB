import {createRouter, createWebHistory} from 'vue-router'
import {useUserData} from "@/stores/userData.ts";
import {InitialLogin} from "@/scripts/api/initialLogin.ts";
import {pinia} from "@/main.ts";

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
            path: '/jwt',
            name: 'JWT',
            component: () => import('@/views/JWTView/JWTView.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/note',
            name: 'Создать',
            component: () => import('@/views/CreateNoteView.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/vault',
            name: 'Хранилище',
            component: () => import('@/views/NotesListView.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/unauthorized',
            name: '403',
            component: () => import('@/views/ErrorPage.vue'),
            props: _ => ({
                errorCode: 403,
                message: "Не доступно"
            })
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('@/views/ErrorPage.vue'),
            props: _ => ({
                errorCode: 404,
                message: "Не найдено"
            })
        }
    ],
})

router.beforeEach(async (to, from, next) => {
    const userData = useUserData(pinia)

    // perform initial login if not initialized
    if (!userData.initialized) {
        try {
            await InitialLogin()
        } catch (e) {
            console.error("Initial login failed:", e)
        } finally {
            userData.initialized = true
        }
    }

    if (to.meta.requiresAuth && !userData.loggedIn) {
        next('/unauthorized')
    } else if (to.path === '/unauthorized' && userData.loggedIn) {
        next('/')
    } else {
        next()
    }
})

export default router
