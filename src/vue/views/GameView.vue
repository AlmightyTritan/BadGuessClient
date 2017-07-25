<template lang="html">
    <main class="view--game">
        <!-- Spectator Part -->
        <template v-if="clientType == 'spectator'">
        </template>

        <!-- Player Part -->
        <template v-else>
            <!-- Guesser Part -->
            <template>
            </template>

            <!-- Drawer Part -->
            <template>
                <player-details></player-details>
                <drawing-canvas hint="Duck"></drawing-canvas>
            </template>
        </template>
    </main>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';
import DrawingCanvas from 'vue/components/DrawingCanvas.vue';
import PlayerDetails from 'vue/components/PlayerDetails.vue';

/**
 * @name GameView
 * @desc This class handles the view that all game inputs and details will
 *      appear on
 * @since Jul 16 2016
 */
@Component({
    components: {
        DrawingCanvas,
        PlayerDetails
    }
})
export default class GameView extends Vue {
    // Class data
    roomCode = null;
    clientType = 'spectator';

    // Mounted
    mounted() {
        // Set the room code
        this.roomCode = this.$route.params.roomCode

        // Get the current client type
        this.clientType = this.$cookie.get('sessionRole');
    }
}
</script>

<style lang="scss">
@import '~scss/util/util';
@import '~scss/partial/components/view';

// view--game
.view--game {
    @extend .view;
    display: flex;
    padding-top: 64px;
    flex-direction: column;
    align-items: center;
}
</style>
