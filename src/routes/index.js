import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
        name: 'notes',
        path: '/',
        component: () => import('../views/Notes.vue'),
    },
    {
        name: 'settings',
        path: '/settings',
        component: () => import('../views/Settings.vue'),
    },
    {
        name: 'my',
        path: '/my',
        component: () => import('../views/My.vue'),
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('../views/Login.vue'),
    },
    {
        name: 'about',
        path: '/about',
        component: () => import('../views/About.vue'),
    },
    {
        name: 'editor',
        path: '/editor/:index',
        component: () => import('../views/Editor.vue')
    },
    {
        name: 'markdown',
        path: '/markdown/:index',
        component: () => import('../views/Markdown.vue')
    }
];

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

router.beforeEach((to, from, next) => {
    if (to.name == 'my') {
        // 获取本地存储的token
        const token = localStorage.getItem('token')
        // 如果有token
        if (token) {
            // console.log(1)
            next()
        } else {
            // 如果没有token，则重定向到login路由
            if (to.name !== 'login') {
                next({ name: 'login' })
            } else {
                // 否则继续导航
                next()
            }
        }
    } else {
        next()
    }

})

export default router