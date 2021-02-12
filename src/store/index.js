import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        auth_user: null,
    },
    mutations: {
        SET_USER(state, payload) {
            state.auth_user = payload;
        },
    },
    actions: {
    },
});
