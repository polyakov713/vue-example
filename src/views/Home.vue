<template lang="pug">
    article.home
        header.home__header
            h1.home__title Таблица заказов
            .home__buttons
                app-button.home__header-button(
                    color="black"
                ) Отправления
                app-button.home__header-button Экспортировать
        section.home__body
            app-table.home__table(
                :headers="table_headers"
                :table_data="table_data"
            )
</template>

<script>
import axios from 'axios';

export default {
    name: 'Home',
    data() {
        return {
            table_headers: [
                {
                    prop: 'id',
                    label: 'ID',
                    width: 70,
                },
                {
                    prop: 'goods',
                    label: 'Товары',
                },
                {
                    prop: 'date',
                    label: 'Дата заказа',
                },
                {
                    prop: 'status',
                    label: 'Статус',
                },
                {
                    prop: 'payed',
                    label: 'Оплачено',
                },
                {
                    prop: 'shipped',
                    label: 'Отправлено',
                },
                {
                    prop: 'delivered',
                    label: 'Доставлено',
                },
                {
                    prop: 'sales_channel',
                    label: 'Канал продаж',
                },
                {
                    prop: 'buyer',
                    label: 'Покупатель',
                },
                {
                    prop: 'send_method',
                    label: 'Метод отправки',
                },
                {
                    prop: 'price',
                    label: 'Стоимость',
                },
            ],
            table_data: [
                {
                    id: 123,
                    goods: 'blabla',
                },
            ],
            data_is_loading: false,
        };
    },
    created() {
        // this.updateTable();
    },
    methods: {
        async updateTable(params) {
            try {
                this.data_is_loading = true;

                const { data } = await axios.get('https://zonesmart.su/api/v1/zonesmart/order/', { params });
                console.log(data);
            } catch (err) {
                console.error('updateTable ERROR:', err);
                this.$notify({
                    type: 'error',
                    title: 'Ошибка',
                    text: (err.response && err.response.data && err.response.data.detail) || err.message,
                });
            } finally {
                this.data_is_loading = false;
            }
        },
    },
};
</script>

<style lang="sass" scoped>
.home
    padding: 30px;

    &__header
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

    &__title
        margin: 0;

    &__buttons
        display: flex;
        align-items: center;
    
    &__header-button
        margin-right: 10px;
        &:last-child
            margin-right: 0;
</style>
