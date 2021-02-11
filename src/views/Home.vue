<template lang="pug">
    .home
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
