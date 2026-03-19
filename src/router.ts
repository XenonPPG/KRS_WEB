import {createRouter, createWebHistory} from 'vue-router'
import {useUserData} from "@/stores/userData.ts";
import {InitialLogin} from "@/api/initialLogin.ts";
import {pinia} from "@/main.ts";
import {useGlobalLoading} from "@/stores/loading.ts";
import {UserV1UserRole} from "@/api/gen/Api.ts";

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
            component: () => import('@/views/CreateEditNoteView.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/note/:id',
            name: 'Редактировать',
            component: () => import('@/views/CreateEditNoteView.vue'),
            props: _ => ({
                editMode: true,
            }),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/vault',
            name: 'Хранилище',
            component: () => import('@/views/VaultView/VaultView.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/user/:id/edit',
            name: 'Изменить',
            component: () => import('@/views/UpdateUserView/UpdateUserView.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/users',
            name: 'Пользователи',
            component: () => import('@/views/UserListView/UserListView.vue'),
            meta: {
                requiresAuth: true,
                admin: true
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

router.beforeEach(async (to, from) => {
    const userData = useUserData(pinia)
    const loading = useGlobalLoading()

    if (!userData.initialized) {
        try {
            await InitialLogin()
        } catch (e) {
            console.error("Initial login failed:", e)
        } finally {
            userData.initialized = true
        }
    }

    if ((to.meta.requiresAuth && !userData.loggedIn) || (to.meta.admin && userData.user.role != UserV1UserRole.UserRoleADMIN)) {
        return '/unauthorized'
    } else if (to.path === '/unauthorized' && userData.loggedIn) {
        return '/'
    }
})

export default router
