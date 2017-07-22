<template lang="html">
    <div class="game-title">
        <img src="dist/logo.png">
    </div>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';

/**
 * @name GameTitle
 * @desc This component just shows the title of the game, srsly that's it.
 * @since Jul 18 2017
 */
@Component
export default class GameTitle extends Vue {
    // Class data
}
</script>

<style lang="scss">
@import '~scss/util/util';

// game-title
.game-title {
    flex: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-height: 250px;

    // Image
    img {
        max-width: 100%;
        padding: 16px;
        box-sizing: border-box;
    }
}
</style>
