<template lang="html">
    <div :class="getPlayerDetailsType">
        <div class="player-details__content">
            <div class="player-details__avatar">
                <img src="dist/player-0.png" v-if="playerIndex == 0">
                <img src="dist/player-1.png" v-if="playerIndex == 1">
                <img src="dist/player-2.png" v-if="playerIndex == 2">
                <img src="dist/player-3.png" v-if="playerIndex == 3">
                <img src="dist/player-4.png" v-if="playerIndex == 4">
                <img src="dist/player-5.png" v-if="playerIndex == 5">
                <img src="dist/player-6.png" v-if="playerIndex == 6">
                <img src="dist/player-7.png" v-if="playerIndex == 7">
            </div>
            <div class="player-details__score">
                ${{ score }}
            </div>
        </div>
    </div>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';
import config from 'config/config.js';

/**
 * @name PlayerDetails
 * @desc This component will display the score value for the current player
 * @since Jul 24 2017
 */
@Component({
    props: {
        propsId: {
            default: null,
        },
        propsIndex: {
            default: null,
        },
    },
})
export default class PlayerDetails extends Vue {
    playerId = null;
    playerIndex = 0;
    score = 0;
    classModifier = null;

    // Mounted
    mounted() {
        // Get the non dynamic values of the player
        this.playerId = this.propsId ? this.propsId : this.$cookie.get('sessionId');
        this.playerIndex = this.propsIndex ? this.propsIndex : this.$cookie.get('sessionPlayerIndex');

        // If there are props
        if (this.propsId && this.propsIndex) {
            this.classModifier = 'spectator';
        }

        // Add event listeners
        this.$root.$on('playersChanged', this.updatePlayer);
    }

    /**
     * @desc This method will update the current players details
     * @since Jul 24 2017
     * @param {array} players
     */
    updatePlayer(players) {

    }

    /**
     * @desc This method will return the appropriate class for the Component
     * @since Jul 24 2017
     * @returns {string}
     */
    get getPlayerDetailsType() {
        // Base class
        let baseClass = 'player-details--' + this.playerIndex;
        return baseClass + (this.classModifier ? ' player-details--' + this.classModifier : '');
    }
}
</script>

<style lang="scss">
@import '~scss/util/util';

// player-details
.player-details {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    height: 64px;
    width: 100%;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    z-index: 100;
    @include box-shadow(2);

    // player-details__content
    @include element('content') {
        display: flex;
        height: 100%;
        width: 100%;
        max-width: 400px;
        justify-content: space-between;
        align-items: center;
    }

    // player-details__avatar
    @include element('avatar') {
        position: relative;
        height: 64px;
        width: 64px;

        // Image
        img {
            height: 100%;
            padding: 8px;
            box-sizing: border-box;
        }

        // Background cirlce
        &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            height: 64px;
            width: 64px;
            border-radius: 50%;
            background: #FFFFFF;
            transform: scale(2) translate(-25%, -25%);
            z-index: -1;
        }
    }

    // player-details__score
    @include element('score') {
        padding: 16px;
        font-size: 32px;
        font-family: 'Permanent Marker', cursive;
    }

    // Player X
    @each $player, $bgcolor in $colors-players {
        @include modifier($player) {
            background: $bgcolor;
        }
    }
}
</style>
