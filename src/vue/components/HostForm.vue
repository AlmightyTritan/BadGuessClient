<template lang="html">
    <div class="host-form">
        <h3 class="host-form__header">Host Game</h3>
        <p class="host-form__details">
            Sabotage or help your friends in Vandrawlism, the worlds best jackbox wannabe!
        </p>
        <section class="host-form__requirements">
            <h4>All You Need To Start Is</h4>
            <div class="host-form__requirement">
                <i class="material-icons">phonelink</i>
                <span>Browser</span>
            </div>
            <div class="host-form__requirement">
                <i class="material-icons">network_wifi</i>
                <span>Internet</span>
            </div>
            <div class="host-form__requirement">
                <i class="material-icons">people</i>
                <span>Friends</span>
            </div>
        </section>
        <button @click.prevent="hostGame" class="button--round host-form__button"><i class="material-icons">play_arrow</i></button>
    </div>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';

/**
 * @name HostForm
 * @desc This component will request a new room be created and will move to
 *      the rooms lobby once it has been requested successfully
 * @since Jul 17 2017
 */
@Component
export default class HostForm extends Vue {
    /**
     * @desc This method will request a new game room to be created
     * @since Jul 17 2017
     */
    hostGame() {
        // Make an attempt to create the game room
        this.$router.push({ path: 'lobby/' });
    }
}
</script>

<style lang="scss">
@import '~scss/util/util';

// host-form
.host-form {
    position: relative;
    display: flex;
    max-width: 400px;
    width: 100%;
    padding-bottom: 32px;
    margin: 32px 16px;
    flex-direction: column;
    align-self: flex-start;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: lighten($color-background, 2);
    @include box-shadow(4);

    // host-form__header
    @include element('header') {
        padding: 32px 16px 16px 16px;
        margin: 0;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        background: $color-complement;
    }

    // host-form__details
    @include element('details') {
        margin: 0;
        padding: 16px;
        color: $color-text-secondary;
    }

    // host-form__requirements
    @include element('requirements') {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        // Header
        h4 {
            position: relative;
            margin: 0;
            padding: 16px;
            flex: 100%;
            text-align: center;
            font-size: 20px;
            font-weight: 400;

            // Divider
            &:after {
                content: '';
                position: absolute;
                bottom: 8px;
                left: 50%;
                width: 60%;
                height: 2px;
                background: $color-complement;
                transform: translateX(-50%);
            }
        }
    }

    // host-form__requirement
    @include element('requirement') {
        display: flex;
        flex: 0 0 20%;
        margin: 16px;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        // Icon
        i {
            display: block;
            height: 24px;
            width: 24px;
            margin-bottom: 8px;
            padding: 24px;
            border-radius: 50%;
            background: $color-text-disable;
        }

        // Label
        span {
            color: $color-text-secondary;
        }
    }

    // host-form__button
    @include element('button') {
        position: absolute;
        bottom: 0;
        left: 50%;
        background: $color-complement;
        transform: translate(-50%, 50%);
        @include box-shadow(4);

        // Focus
        &:focus {
            background: darken($color-complement, 2);
        }

        // Active
        &:active {
            background: darken($color-complement, 4);
        }
    }
}
</style>
