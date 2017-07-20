<template lang="html">
    <router-view></router-view>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';

/**
 * @name Game
 * @desc This class manages the game loop
 * @since Jul 15 2017
 */
@Component
export default class Game extends Vue {
    // Class data
    lastRender = 0;

    // Created
    created() {
        // Prime loop
        window.requestAnimationFrame(this.gameLoop);

        // Set event listeners
        this.$on('setClientRole', this.setRole);
    }

    // GameUpdated
    gameUpdated(deltaTime) {

    }

    // GameLoop
    gameLoop(timestamp) {
        // Get the delta time
        let deltaTime = timestamp;

        // Update
        this.gameUpdated(deltaTime);

        // Change the last render and restart loop
        this.lastRender = timestamp;
        window.requestAnimationFrame(this.gameLoop);
    }
}
</script>

<style lang="scss">
@import '~scss/main';
</style>
