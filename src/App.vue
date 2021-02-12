<template lang="pug">
    .app
        router-view
        notifications
</template>

<script>
import { mapMutations } from 'vuex';
import event_bus from './event_bus';
import Auth from './setup/Auth';

export default {
    name: 'App',
    async created() {
        event_bus.$on('unauthorized', this.handleUnauthorized);

        try {
            const tokens = await Auth.checkTokens();
            if (tokens) {
                this.SET_USER(tokens.decoded);
            }
        } catch (err) {
            console.error(err);
        }
    },
    beforeDestroy() {
        event_bus.$off('unauthorized', this.handleUnauthorized);
    },
    methods: {
        ...mapMutations(['SET_USER']),
        handleUnauthorized() {
            console.log('handleUnauthorized');
            this.SET_USER(null);
            this.$router.push({ name: 'SignIn' });
        },
    },
};
</script>
