import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import AppComponents from './plugins/AppComponents';

Vue.config.productionTip = false;

Vue.use(AppComponents);

new Vue({
    router,
    store,
    render: function (h) { return h(App) },
}).$mount('#app');
