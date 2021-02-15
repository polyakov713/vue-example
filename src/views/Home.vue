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
                    prop: 'order_id',
                    label: 'ID',
                    width: 70,
                },
                {
                    prop: 'goods',
                    label: 'Товары',
                },
                {
                    prop: 'create_date',
                    label: 'Дата заказа',
                },
                {
                    prop: 'status',
                    label: 'Статус',
                },
                {
                    prop: 'is_paid',
                    label: 'Оплачено',
                },
                {
                    prop: 'is_shipped',
                    label: 'Отправлено',
                },
                {
                    prop: 'is_delivered',
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
                    prop: 'total_price',
                    label: 'Стоимость',
                },
            ],
            table_data: [],
            table_total: 0,
            data_is_loading: false,
        };
    },
    created() {
        this.updateTable();
    },
    methods: {
        async updateTable(params) {
            try {
                this.data_is_loading = true;

                const { data } = await axios.get('https://zonesmart.su/api/v1/zonesmart/order/', { params: { ...params, limit: 50 } });
                this.table_data = data.results;
                this.table_total = data.count;
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
