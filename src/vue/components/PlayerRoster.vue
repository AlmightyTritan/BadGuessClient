<template lang="html">
    <ul class="player-roster">
        <player-avatar :player="{ username: 'Player 1' }" :index="0"></player-avatar>
        <player-avatar :player="{ username: 'Player 2' }" :index="1"></player-avatar>
        <player-avatar :player="{ username: 'Player 3' }" :index="2"></player-avatar>
        <player-avatar :player="{ username: 'Player 4' }" :index="3"></player-avatar>
        <player-avatar :player="{ username: 'Player 5' }" :index="4"></player-avatar>
        <player-avatar :player="{ username: 'Player 6' }" :index="5"></player-avatar>
        <player-avatar :player="{ username: 'Player 7' }" :index="6"></player-avatar>
        <player-avatar :player="{ username: 'Player 8' }" :index="7"></player-avatar>
    </ul>
</template>

<script>
// Imports
import { Component, Vue } from 'vue-property-decorator';
import PlayerAvatar from 'vue/components/PlayerAvatar.vue';

/**
 * @name PlayerRoster
 * @desc this component will show a list of each player's avatar and their name
 * @since Jul 17 2017
 */
@Component({
    components: {
        PlayerAvatar,
    },
    props: ['players']
})
export default class PlayerRoster extends Vue {
}
</script>

<style lang="scss">
@import '~scss/util/util';

// player-roster
.player-roster {
    position: relative;
    list-style: none;
    margin: 0;
    padding: 64px;
    flex: 0 0 50%;
}
</style>
