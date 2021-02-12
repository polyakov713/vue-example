<template lang="pug">
    .app
        <router-view/>
</template>

<script>
import Auth from './setup/Auth';

export default {
    name: 'App',
    async created() {
        // await Auth.logIn({
        //     email: 'test@zonesmart.ru',
        //     password: '4815162342test',
        // });
        try {
            await this.tryToGetTokens();
        } catch (err) {
            console.error(err);
        }
    },
    methods: {
        async tryToGetTokens() {
            const tokens = await Auth.checkTokens();
            console.log(tokens);
            if (!tokens) {
                console.log('show auth window');
            }
        },
    },
};
</script>
