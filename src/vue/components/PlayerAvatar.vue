<template lang="html">
    <li :class="'player-avatar--' + index">
        <div :class="'player-avatar__picture--' + index">
            <img src="~assets/img/player-0.png" v-if="index == 0">
            <img src="~assets/img/player-1.png" v-if="index == 1">
            <img src="~assets/img/player-2.png" v-if="index == 2">
            <img src="~assets/img/player-3.png" v-if="index == 3">
            <img src="~assets/img/player-4.png" v-if="index == 4">
            <img src="~assets/img/player-5.png" v-if="index == 5">
            <img src="~assets/img/player-6.png" v-if="index == 6">
            <img src="~assets/img/player-7.png" v-if="index == 7">
        </div>
        <div :class="'player-avatar__nametag--' + index">
            {{ player.username }}
        </div>
    </li>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';

/**
 * @name PlayerAvatar
 * @desc This component is the visual representation of the player
 * @since Jul 17 2017
 */
@Component({
    props: {
        player: {
            type: Object,
            default: {
                username: '',
            },
            required: true,
        },
        index: {
            type: Number,
            required: true,
        }
    },
})
export default class PlayerAvatar extends Vue {

}
</script>

<style lang="scss">
@import '~scss/util/util';

// player-avatar
.player-avatar {
    position: absolute;
    display: flex;
    top: 44%;
    left: 50%;
    flex-direction: column;
    align-items: center;

    // Player 1
    @include modifier(0) {
        transform: translate(-50%, -50%) translate(-360px, -100px);
    }

    // Player 2
    @include modifier(1) {
        transform: translate(-50%, -50%) translate(-130px, -180px);
    }

    // Player 3
    @include modifier(2) {
        transform: translate(-50%, -50%) translate(130px, -180px);
    }

    // Player 4
    @include modifier(3) {
        transform: translate(-50%, -50%) translate(360px, -100px);
    }

    // Player 5
    @include modifier(4) {
        transform: translate(-50%, -50%) translate(360px, 200px);
    }

    // Player 6
    @include modifier(5) {
        transform: translate(-50%, -50%) translate(130px, 280px);
    }

    // Player 7
    @include modifier(6) {
        transform: translate(-50%, -50%) translate(-130px, 280px);
    }

    // Player 8
    @include modifier(7) {
        transform: translate(-50%, -50%) translate(-360px, 200px);
    }

    // player-avatar__picture
    @include element('picture') {
        display: flex;
        height: 128px;
        width: 128px;
        margin: 16px;
        border-radius: 50%;
        background: #FFFFFF;
        align-items: center;
        justify-content: center;
        z-index: 1;
        @include box-shadow(4);

        // Image
        img {
            display: block;
            height: 70%;
            //filter: invert(100%);
        }

        // Player X
        @each $player, $bgcolor in $colors-players {
            @include modifier($player) {
                border: 6px solid $bgcolor;
            }
        }
    }

    // player-avatar__nametag
    @include element('nametag') {
        display: inline-block;
        color: #000000;
        background: #FFFFFF;
        padding: 4px 16px;
        font-size: 28px;
        font-family: 'Permanent Marker', cursive;
        border-radius: 4px;
        @include box-shadow(4);

        // Player 1
        @include modifier(0) {
            border-top: 24px solid map-get($colors-players, 0);
            border-bottom: 6px solid map-get($colors-players, 0);
            transform: rotate(4deg) translateY(-32px);
        }

        // Player 2
        @include modifier(1) {
            border-top: 24px solid map-get($colors-players, 1);
            border-bottom: 6px solid map-get($colors-players, 1);
            transform: rotate(-3.6deg) translateY(-32px);
        }

        // Player 3
        @include modifier(2) {
            border-top: 24px solid map-get($colors-players, 2);
            border-bottom: 6px solid map-get($colors-players, 2);
            transform: rotate(8deg) translateY(-32px);
        }

        // Player 4
        @include modifier(3) {
            border-top: 24px solid map-get($colors-players, 3);
            border-bottom: 6px solid map-get($colors-players, 3);
            transform: rotate(2.75deg) translateY(-32px);
        }

        // Player 5
        @include modifier(4) {
            border-top: 24px solid map-get($colors-players, 4);
            border-bottom: 6px solid map-get($colors-players, 4);
            transform: rotate(-3.89deg) translateY(-32px);
        }

        // Player 6
        @include modifier(5) {
            border-top: 24px solid map-get($colors-players, 5);
            border-bottom: 6px solid map-get($colors-players, 5);
            transform: rotate(4.2deg) translateY(-32px);
        }

        // Player 7
        @include modifier(6) {
            border-top: 24px solid map-get($colors-players, 6);
            border-bottom: 6px solid map-get($colors-players, 6);
            transform: rotate(-5.4deg) translateY(-32px);
        }

        // Player 8
        @include modifier(7) {
            border-top: 24px solid map-get($colors-players, 7);
            border-bottom: 6px solid map-get($colors-players, 7);
            transform: rotate(-1deg) translateY(-32px);
        }
    }
}
</style>
