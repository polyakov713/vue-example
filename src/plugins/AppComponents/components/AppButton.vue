<template lang="pug">
    button.app-button(
        :disabled="$attrs.disabled"
        :class="computed_classes"
        @click="$emit('click', $event)"
    )
        slot
</template>

<script>
export default {
    name: 'AppButton',
    props: {
        color: {
            type: String,
            default: 'green',
            validator(color) {
                return ['green', 'black'].includes(color);
            },
        },
        size: {
            type: String,
            default: 'normal',
            validator(size) {
                return ['small', 'normal', 'big'].includes(size);
            },
        },
    },
    computed: {
        computed_classes() {
            const result = [];

            result.push(`app-button_color_${this.color}`);
            result.push(`app-button_size_${this.size}`);

            return result;
        },
    },
};
</script>

<style lang="sass" scoped>
.app-button
    display: block;
    font: inherit;
    color: #fff;
    border: none;
    cursor: pointer;
    transition: all .3s ease;

    &_color
        &_green
            background-color: $green;
            &:hover
                background-color: darken($green, 8%);

        &_black
            background-color: $black;
            &:hover
                background-color: lighten($black, 8%);
    
    &_size
        &_small
            padding: 6px 8px;
            border-radius: 2px;
            font-size: 10px;
            line-height: 12px;
        
        &_normal
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 14px;
            line-height: 16px;
            letter-spacing: 1px;
            font-weight: 500;
            text-transform: uppercase;
        
        &_big
            width: 100%;
            padding: 12px 12px;
            border-radius: 4px;
            font-size: 14px;
            line-height: 16px;
            letter-spacing: 1px;
            font-weight: 500;
            text-transform: uppercase;
    
    &:disabled
        cursor: not-allowed;

    &:focus
        outline: none;
</style>