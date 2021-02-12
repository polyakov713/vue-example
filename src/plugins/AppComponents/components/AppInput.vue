<template lang="pug">
    input.app-input(
        :id="$attrs.id"
        :value="value"
        :type="$attrs.type || 'text'"
        :placeholder="$attrs.placeholder"
        :disabled="$attrs.disabled"
        @input="$emit('input', $event.target.value)"
    )
</template>

<script>
export default {
    name: 'AppInput',
    props: {
        value: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="sass" scoped>
.app-input
    display: block;
    width: 100%;
    height: 50px;
    padding: 0 16px;
    border: 1px solid $gray-icon;
    border-radius: 4px;
    font: inherit;
    font-size: 14px;
    transition: all .3s ease;

    &:hover
        border-color: $green;

    &:focus
        border-color: $green;
        outline: none;
</style>