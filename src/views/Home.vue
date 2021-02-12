<template lang="pug">
    article.home
        app-input(
            v-model="input"
        )
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            input: '',
        };
    },
};
</script>
