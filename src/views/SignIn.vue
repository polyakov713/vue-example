<template lang="pug">
    article.sign-in
        form.sign-in__form(
            @submit.prevent="onSubmit"
        )
            h1.sign-in__title Вход
            app-input.sign-in__input(
                v-model.trim="email"
                placeholder="E-mail или телефон"
                :disabled="form_is_loading"
            )
            app-input.sign-in__input(
                v-model.trim="password"
                type="password"
                placeholder="Пароль"
                :disabled="form_is_loading"
            )
            app-button.sign-in__button(
                type="submit"
                size="big"
                :disabled="form_is_loading"
            ) {{ form_is_loading ? 'Загрузка...' : 'Войти' }}
</template>

<script>
import { mapMutations } from 'vuex';
import Auth from '@/setup/Auth';

export default {
    name: 'SignIn',
    data() {
        return {
            email: '',
            password: '',
            form_is_loading: false,
        };
    },
    methods: {
        ...mapMutations(['SET_USER']),
        async onSubmit() {
            try {
                this.form_is_loading = true;

                await Auth.logIn({ email: this.email, password: this.password });

                const tokens = await Auth.checkTokens();
                this.SET_USER(tokens.decoded);

                this.$router.push('/');
            } catch (err) {
                console.error('SignIn ERROR:', err);
                this.$notify({
                    type: 'error',
                    title: 'Ошибка',
                    text: (err.response && err.response.data && err.response.data.detail) || err.message,
                });
            } finally {
                this.form_is_loading = false;
            }
        },
    },
};
</script>

<style lang="sass" scoped>
.sign-in
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    &__form
        width: 350px;
        padding: 32px 40px;
        background-color: #fff;
        box-shadow: 0px 14px 64px rgba(48, 56, 64, 0.16);
        border-radius: 6px;
        text-align: center;
    
    &__input
        margin-bottom: 30px;
</style>
