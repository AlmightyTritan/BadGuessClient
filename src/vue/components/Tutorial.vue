<template lang="html">
    <section class="tutorial">
        <h3 class="tutorial__header">How to Play</h3>
        <div class="tutorial__content">
            <p>
                Hey if it's your first time playing Vandrawlism and none of
                the people you're playing with decided to explain how to play or
                you need a refresher, then I've got you covered. We are gonna
                go over the basics of the game, there is probably some meta
                game shit going on but that's not important.
            </p>
            <p>
                This game runs for a number of rounds equal to the number
                of players. These rounds contain two phases:
            </p>
            <ul>
                <li>Drawing Phase</li>
                <li>Guessing Phase</li>
            </ul>
            <p>
                Each round one player is chosen to be the Guesser, and everyone
                else are the Drawers. The Drawing phase of the round starts and
                every Drawer has the ability to draw a hint to help the Guesser,
                or to throw them off.
            </p>
            <p>
                In the Guessing phase the Guesser is presented with all the
                hints that were drawn for them, face down. They can then pay
                some of their hard earned points to reveal a hint. At the end of
                the round the Drawers of that round are paid their fees from the
                Guesser.
            </p>
            <p>
                So basically, be an asshole or play it nice to earn mad dosh.
            </p>
        </div>
        <div class="tutorial__actions">
            <a class="button">Got It</a>
        </div>
    </section>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';

/**
 * @name Tutorial
 * @desc This component will display a breif tutorial for players
 */
@Component
export default class Tutorial extends Vue {
}
</script>

<style lang="scss">
@import '~scss/util/util';

// tutorial
.tutorial {
    width: calc(100% - 32px);
    height: 100%;
    max-width: 400px;
    max-height: 400px;
    margin: 16px;
    box-sizing: border-box;
    border-radius: 4px;
    background: lighten($color-background, 2);
    @include box-shadow(4);

    // tutorial__header
    @include element('header') {
        padding: 32px 16px 16px 16px;
        margin: 0;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        background: #B071E2;
    }

    // tutorial__content
    @include element('content') {
        height: calc(100% - 147px);
        padding: 0 16px;
        color: $color-text-secondary;
        overflow-y: auto;
    }

    // tutorial__actions
    @include element('actions') {
        display: flex;
        flex-direction: row-reverse;

        // Buttons
        a {
            margin: 16px;
        }
    }
}
</style>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
