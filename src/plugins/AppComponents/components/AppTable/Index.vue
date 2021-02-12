<template lang="pug">
    .app-table
        table.app-table__table(
            cellpadding="0"
            cellspacing="0"
        )
            thead.app-table__thead
                tr
                    th.app-table__th cb
                    th.app-table__th(
                        v-for="(col, idx) in headers"
                        :key="`table-th-${idx}`"
                    )
                        span {{ col.label }}
            tbody.app-table__tbody
                tr.app-table__margin
                template(v-if="num_rows > 0")
                    tr.app-table__tr(
                        v-for="(row, idx) in visible_rows"
                        :key="`table-row-${idx}`"
                    )
                        td.app-table__td cb
                        td.app-table__td(
                            v-for="(col, colIdx) in headers"
                            :key="`table-col-${colIdx}`"
                        )
                            slot(
                                v-if="col.slot"
                                :name="`column:${col.prop}`"
                                :row="row"
                            )
                            span(
                                v-else
                                v-text="row[col.prop]"
                            )
                tr.app-table__tr(v-else)
                    td(
                        :colspan="num_columns + 1"
                        class="app-table__td app-table__no-data"
                    )
                        slot(name="no-data") Нет данных
</template>

<script>
export default {
    name: 'AppTable',
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        headers: {
            type: Array,
            required: true,
        },
        table_data: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            visible_rows: [],
        };
    },
    computed: {
        num_rows() {
            return this.table_data.length;
        },
        num_columns() {
            return this.headers.length;
        },
    },
    watch: {
        table_data: {
            handler(val) {
                this.visible_rows = [...val];
            },
            immediate: true,
        },
    },
};
</script>

<style lang="sass" scoped>
.app-table
    &__table
        width: 100%;
        border-collapse: separate;

    &__thead
        background-color: #fff;
    
    &__th
        padding: 20px 5px;
        font-size: 12px;
        font-weight: normal;
        line-height: 14px;
        color: $dark-blue;
        text-align: left;
    
    &__margin
        height: 10px;
    
    &__tr
        background-color: #fff;
    
    &__td
        padding: 0px 5px;
        height: 56px;

    &__no-data
        text-align: center;
        text-transform: uppercase;
        color: $dark-blue;
    
</style>