import Vue from 'vue';
import Notifications from 'vue-notification';
import App from './App.vue';
import router from './router';
import store from './store';

import AppComponents from './plugins/AppComponents';

import './assets/styles/base.sass';

Vue.config.productionTip = false;

Vue.use(Notifications);
Vue.use(AppComponents);

new Vue({
    router,
    store,
    render: function (h) { return h(App) },
}).$mount('#app');
