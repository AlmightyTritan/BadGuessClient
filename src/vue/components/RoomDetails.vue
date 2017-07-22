<template lang="html">
    <section class="room-details">
        <game-title></game-title>
        <div class="room-details__player-details">
            <h3 class="room-details__header">Ready Up</h3>
            <p>
                Get in on this game by using the Room Code at the URL below.
                Once you're in you can send a join link to anyone you want.
                The game can be started from Player 1's device when every one is ready.
            </p>
            <div class="room-details__room-code">
                {{ roomCode }}
            </div>
            <div class="room-details__site-url">
                {{ getSiteURL }}
            </div>
        </div>
    </section>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';
import config from 'config/config.js';
import GameTitle from 'vue/components/GameTitle.vue';

/**
 * @name RoomDetails
 * @desc This component will show the link for players to join the lobby
 * @since Jul 22 2017
 */
@Component({
    components: {
        GameTitle
    },
    props: {
        roomCode: {
            type: String,
            required: true,
        }
    }
})
export default class RoomDetails extends Vue {
    /**
     * @desc This method will return the site url from the config in
     *      a human readable format
     * @since Jul 22 2017
     */
    get getSiteURL() {
        return (config.siteURL).replace(/(https:\/\/|http:\/\/)/, '').replace(/\/+$/, '');
    }

    /**
     * @desc This method will return the spectator url in a human readable format
     * @since Jul 22 2017
     */
    get getSpectatorURL() {
        return (config.siteURL + '#/lobby/' + this.roomCode).replace(/(https:\/\/|http:\/\/)/, '').replace(/\/+$/, '');
    }
}
</script>

<style lang="scss">
@import '~scss/util/util';

// room-details
.room-details {
    display: flex;
    flex: 0 0 50%;
    padding: 0 64px;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    // room-details__player-details
    @include element('player-details') {
        position: relative;
        width: 100%;
        max-width: 400px;
        padding-bottom: 16px;
        border-radius: 4px;
        background: lighten($color-background, 2);
        @include box-shadow(4);

        // Paragraph
        p {
            margin: 0;
            color: $color-text-secondary;
            padding: 16px;
        }
    }

    // room-details__header
    @include element('header') {
        padding: 32px 16px 16px 16px;
        margin: 0;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        background: $color-accent;
    }

    // room-details__room-code
    @include element('room-code') {
        position: absolute;
        display: block;
        left: 50%;
        bottom: 0;
        padding: 0 24px;
        border-top: 32px solid $color-complement;
        font-family: 'Inconsolata', monospace;
        font-size: 52px;
        font-weight: bolder;
        text-align: center;
        text-transform: uppercase;
        color: #000000;
        background: #FFFFFF;
        border-radius: 4px;
        box-sizing: border-box;
        transform: translate(-20%, 160%) rotate(3deg);
        z-index: 1;
        @include box-shadow(4);

        // Room Code Header
        &::after {
            content: 'Room Code';
            position: absolute;
            top: -24px;
            left: 50%;
            color: #FFFFFF;
            font-family: sans-serif;
            font-size: 16px;
            z-index: 2;
            transform: translate(-50%);
        }
    }

    // room-details__site-url
    @include element('site-url') {
        position: absolute;
        display: block;
        left: 50%;
        bottom: 0;
        min-width: 424px;
        padding: 12px 24px;
        font-size: 52px;
        text-align: center;
        color: #000000;
        background: #FFFFFF;
        border-radius: 4px;
        box-sizing: border-box;
        transform: translate(-50%, 86%) rotate(-2deg);
        @include box-shadow(4);
    }
}
</style>
