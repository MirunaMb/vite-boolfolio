import { createWebHistory, createRouter } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import BlogPage from '../pages/BlogPage.vue';
import ProjectPage from '../pages/ProjectPage.vue';
import BlogTypePage from '../pages/BlogTypePage.vue';
import AdvancedFilterPage from '../pages/AdvancedFilterPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: HomePage
        },
        {
            path: '/blog',
            name: 'blog',
            component: BlogPage,
        },
        {
            path: '/blog/:id',
            name: 'project-detail',
            component: ProjectPage,
        },
        {
            path: '/blog/type/:type_id',
            name: 'blog-type',
            component: BlogTypePage,
        },
        {
            path: '/advanced-filter',
            name: 'advanced-filter',
            component: AdvancedFilterPage,
        }
    ]
});

export { router };
