import './assets/main.css'

import { createApp } from 'vue';
import { createRouter, createWebHistory } from  'vue-router';
import { createPinia } from 'pinia';
import App from './App.vue';

import Dashboard from './pages/Dashboard.vue';
import LoginPage from './pages/LoginPage.vue';

const app = createApp(App);
const pinia = createPinia();

app.config.globalProperties.$userData;
app.config.globalProperties.$userTasks;

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: LoginPage,
        },
        {
            path: '/dashboard',
            component: Dashboard,
        }
    ]
});

app.use(pinia);
app.use(router);
app.mount('#app');