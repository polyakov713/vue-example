import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/sign-in',
        name: 'SignIn',
        component: () => import(/* webpackChunkName: "signIn" */ '@/views/SignIn.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const token_pair = localStorage.getItem('token_pair');

    if (token_pair) {
        if (to.name === 'SignIn') {
            next(false);
        } else {
            next();
        }
    } else {
        if (to.name !== 'SignIn') {
            next({ name: 'SignIn' });
        } else {
            next();
        }
    }
});

export default router;
