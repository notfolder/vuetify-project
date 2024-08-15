import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HelloWorld.vue'
import Edit from '../components/Edit.vue'

const routes = [
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/edit',
        component: Edit
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
