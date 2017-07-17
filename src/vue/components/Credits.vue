<template lang="html">
    <footer class="credits">
        <p>Created By Shattered Screen members <a href="https://rocketsoft.ca">Alex Draper</a> and <a href="https://tristanchatman.shatteredscreen.xyz">Tristan Chatman</a></p>
        <p>Game Created For <a href="http://jams.gamejolt.io/SSJperformance" title="Game Jam Website">Summer Slow Jams Performance Game Jam</a></p>
        <p>Copyright 2017</p>
        <a href="https://github.com/AlmightyTritan/BadGuessClient" title="Source Code on Github">Source Code</a>
    </footer>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';

/**
 * @name Credits
 * @desc This component contains the credits for the game
 * @since Jul 17 2017
 */
@Component
export default class Credits extends Vue {

}
</script>

<style lang="scss">
@import '~scss/util/util';

// credits
.credits {
    display: flex;
    width: 100%;
    height: 180px;
    margin-top: 32px;
    flex-direction: column;
    justify-content: center;
    align-self: flex-end;
    text-align: center;
    color: $color-text-secondary;
    background: lighten($color-background, 4);

    // Paragraphs
    p {
        margin: 4px;
    }
}
</style>
